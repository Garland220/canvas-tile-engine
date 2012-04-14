<?php

define("ROOT_DIR", "Server/");
$includes = array (
	ROOT_DIR.'',
	ROOT_DIR.'Items/',
	ROOT_DIR.'Mobiles/',
);

foreach($includes as $dir){
	foreach (glob($dir."*.php") as $filename){
		include_once $filename;
	}
}



function createCharacter($data){
	
}

function fetchRoomState($roomId){
	
}

function loadQueryResults(){
	$q = mysql_query("SELECT name FROM users") or die(mysql_error());
	return mysql_fetch_array($q);
}

$data = loadQueryResults();
$count = 0;
for($i = 0; $i < count($data); $i++){
	if($data[$i]['name'] == 'Francois'){
		$count += 1;
	}
}
echo $count;
