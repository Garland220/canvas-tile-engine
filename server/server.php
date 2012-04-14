<?php
ob_implicit_flush(true);

function r($location){ require_once($location); }
function i($location){ include($location); }

function array_push_assoc($array, $key, $value){
	$array[$key] = $value;
	return $array;
}

r('networking/websocket.class.php');

abstract class Core{
	static $address = "zodiackingdom.com";
	static $port = 2593;

	static $socket;
	static $active = false;
	static $crashed = false;
	static $debug = true;
	static $profiling = false;

	static $sockets = array();
	static $maps = array();
	static $clients = array();
	static $mobiles = array();
	static $items = array();

	static $shutdown = false;

	final private function __construct(){ }
	final private function __clone(){ }

	public static function getMobiles(){ return self::$mobiles; }
	public static function getMobileById($mobile){ return self::$mobiles[$mobile]; }
	public static function addMobile($mobile){ self::$mobiles[] = $mobile; }

	public static function getMaps(){ return self::$maps; }
	public static function getMapById($map){ return self::$maps[$map]; }
	public static function addMap($map){ self::$maps[] = $map; }

	public static function getClients(){ return self::$clients; }
	public static function getClientById($client){ return self::$clients[$client]; }
	public static function addClient($client){ self::$clients[] = $client; }

	public static function say($msg=""){ echo $msg."\n"; }
	public static function log($msg=""){ if(self::$debug){ echo $msg."\n"; } }
	public static function wrap($msg=""){ return chr(0).$msg.chr(255); }
	public static function unwrap($msg=""){ return substr($msg,1,strlen($msg)-2); }

	public static function calcKey($key1,$key2,$l8b){
		//Get the numbers
		preg_match_all('/([\d]+)/', $key1, $key1_num);
		preg_match_all('/([\d]+)/', $key2, $key2_num);

		//Number crunching [/bad pun]
		self::log("Key1: " . $key1_num = implode($key1_num[0]));
		self::log("Key2: " . $key2_num = implode($key2_num[0]));

		//Count spaces
		preg_match_all('/([ ]+)/', $key1, $key1_spc);
		preg_match_all('/([ ]+)/', $key2, $key2_spc);

		//How many spaces did it find?
		self::log("Key1 Spaces: " . $key1_spc = strlen(implode($key1_spc[0])));
		self::log("Key2 Spaces: " . $key2_spc = strlen(implode($key2_spc[0])));

		if($key1_spc==0|$key2_spc==0){
			self::log("Invalid key");
			return;
		}

		//Some math
		$key1_sec = pack("N",$key1_num / $key1_spc); //Get the 32bit secret key, minus the other thing
		$key2_sec = pack("N",$key2_num / $key2_spc);

		//This needs checking, I'm not completely sure it should be a binary string
		return md5($key1_sec.$key2_sec.$l8b,1); //The result, I think
	}

	public static function process($client,$msg){
		/* Extend and modify this method to suit your needs */
		/* Basic usage is to echo incoming messages back to client */
		self::send($client->socket,$msg);
	}

	public static function send($client,$msg){ 
		self::say("> ".$msg);
		$msg = self::wrap($msg);
		socket_write($client,$msg,strlen($msg));
		self::say("! ".strlen($msg));
	} 

	public static function connect($socket){
		$client = new User();
		$client->id = uniqid();
		$client->socket = $socket;
		self::addClient($client);

		self::log($socket." CONNECTED!");
		self::log(date("d/n/Y ")."at ".date("H:i:s T"));
	}

	public static function disconnect($socket){
		$found = null;

		$n = count(self::$clients);
		for($i=0;$i<$n;$i++){
			if(self::$clients[$i]->socket == $socket){
				$found = $i;
				break;
			}
		}

		if(!is_null($found)){
			array_splice(self::$clients,$found,1);
		}

		$index = array_search($socket,self::$sockets);
		socket_close($socket);
		self::log($socket." DISCONNECTED!");

		if($index >= 0){
			//array_splice(self::$sockets,$index,1);
		}
	}

	public static function doHandshake($client,$buffer){
		self::log("\nRequesting handshake...");
		self::log($buffer);
		list($resource,$host,$origin,$key1,$key2,$l8b) = self::getHeaders($buffer);
		self::log("Handshaking...");
		//$port = explode(":",$host);
		//$port = $port[1];
		//self::log($origin."\r\n".$host);
		$upgrade = "HTTP/1.1 101 WebSocket Protocol Handshake\r\n" .
			"Upgrade: WebSocket\r\n" .
			"Connection: Upgrade\r\n" .
			//"WebSocket-Origin: " . $origin . "\r\n" .
			//"WebSocket-Location: ws://" . $host . $resource . "\r\n" .
			"Sec-WebSocket-Origin: " . $origin . "\r\n" .
			"Sec-WebSocket-Location: ws://" . $host . $resource . "\r\n" .
			//"Sec-WebSocket-Protocol: icbmgame\r\n" . //Client doesn't send this
			"\r\n" .
			self::calcKey($key1,$key2,$l8b) . "\r\n";// .
			//"\r\n";
		socket_write($user->socket,$upgrade.chr(0),strlen($upgrade.chr(0)));
		$client->handshake=true;
		self::log($upgrade);
		self::log("Done handshaking...");
		return true;
	}

	public static function getHeaders($req){
		$r=$h=$o=null;

		if(preg_match("/GET (.*) HTTP/"               ,$req,$match)){ $r=$match[1]; }
		if(preg_match("/Host: (.*)\r\n/"              ,$req,$match)){ $h=$match[1]; }
		if(preg_match("/Origin: (.*)\r\n/"            ,$req,$match)){ $o=$match[1]; }
		if(preg_match("/Sec-WebSocket-Key1: (.*)\r\n/",$req,$match)){ self::log("Sec Key1: ".$sk1=$match[1]); }
		if(preg_match("/Sec-WebSocket-Key2: (.*)\r\n/",$req,$match)){ self::log("Sec Key2: ".$sk2=$match[1]); }

		if($match = substr($req,-8)){
			self::log("Last 8 bytes: ".$l8b=$match);	
		}

		return array($r,$h,$o,$sk1,$sk2,$l8b);
	}

	public static function getClientFromSocket($socket){
		$found = null;
		foreach(self::$clients as $client){
			if($client->socket == $socket){ $found = $client; break; }
		}

		return $found;
	}

	public static function init(){
		if (self::$active){
			return;
		}

		if (self::$debug){
			ini_set('display_errors', 1);
			error_reporting(E_ALL);
		}

		self::$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP) or die("socket_create() failed\n");
		socket_set_option(self::$socket, SOL_SOCKET, SO_REUSEADDR, 1) or die("socket_option() failed\n");
		socket_bind(self::$socket, self::$address, self::$port) or die("socket_bind() failed\n");
		socket_listen(self::$socket,20) or die("socket_listen() failed\n");

		self::$sockets[] = self::$socket;
		self::say("Server Started : ".date('Y-m-d H:i:s'));
		self::say("Listening on   : ".self::$address." port ".self::$port);
		self::say("Master socket  : ".self::$socket."\n");
		self::$active = true;
	
		while(self::$active){
			$changed = self::$sockets;
			socket_select($changed, $write = null, $except = null, null);
			foreach($changed as $socket){
				if($socket == self::$socket){
					$client = socket_accept(self::$socket);
					if($client < 0){
						self::log("socket_accept() failed");
						continue;
					}
					else{
						self::connect($client);
					}
				}
				else{
					$bytes = @socket_recv($socket, $buffer, 2048, 0);
					if($bytes==0){
						self::disconnect($socket);
					}
					else{
						$client = self::getClientFromSocket($socket);
						if(!$client->handshake){
							self::doHandshake($client,$buffer);
						}
						else{
							self::process($client,self::unwrap($buffer));
						}
					}
				}
			}

			if (self::$shutdown === true){
				self::$active = false;
			}
			self::$active = false;
		}
	}
}

class Client{
	protected $id;
	protected $ip;
	protected $socket;
	protected $handshake;
	protected $browser;
	protected $mobile;

	public function getMobile(){ return $this->mobile; }
	public function setMobile($mobile){ $this->mobile = $mobile; }

	public function getSocket(){ return $this->socket; }
	public function setSocket($socket){ $this->socket = $socket; }

	public function __construct() {
		
	}
}

$map = array(
	array(0,1,2,0,19,133,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19),
	array(18,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19),
	array(19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19),
	array(19,19,19,19,133,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19),
	array(19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19),
	array(19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19),
	array(19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19),
	array(19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19),
	array(19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19),
	array(19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19),
	array(19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19),
	array(19,19,32,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19),
	array(19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19),
	array(19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19),
	array(19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19),
	array(19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19),
	array(19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19),
	array(19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19),
	array(19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19),
	array(19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19),
	array(19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19),
	array(19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19),
	array(19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19),
	array(19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19),
	array(19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19),
	array(19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19),
);

Core::addMap($map);
Core::init();
?>