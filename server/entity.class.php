<?php

abstract class Size
{
	public static function fine(){ return array("sizeMod" => 8, "miscMod" => 16, "name" => "Fine", "code" => "F"); }
	public static function diminutive(){ return array("sizeMod" => 4, "miscMod" => 12, "name" => "Diminutive", "code" => "D"); }
	public static function tiny(){ return array("sizeMod" => 2, "miscMod" => 8, "name" => "Tiny", "code" => "T"); }
	public static function small(){ return array("sizeMod" => 1, "miscMod" => 4, "name" => "Small", "code" => "S"); }
	public static function medium(){ return array("sizeMod" => 0, "miscMod" => 0, "name" => "Medium", "code" => "M"); }
	public static function large(){ return array("sizeMod" => -1, "miscMod" => -4, "name" => "Large", "code" => "L"); }
	public static function huge(){ return array("sizeMod" => -2, "miscMod" => -8, "name" => "Huge", "code" => "H"); }
	public static function gargantuan(){ return array("sizeMod" => -4, "miscMod" => -12, "name" => "Gargantuan", "code" => "G"); }
	public static function colossal(){ return array("sizeMod" => -8, "miscMod" => -16, "name" => "Colossal", "code" => "C"); }
}

class Entity
{
	protected $serial;
	protected $name = "";
	protected $description = "";

	protected $radius;

	protected $height = 0.0;
	protected $weight = 0.0;

	protected $size;
	protected $graphic;

	protected $hp = 0;

	protected $visible = true;

	protected $x = 0;
	protected $y = 0;
	protected $z = 0;

	protected $map = 0;

	public function getLocation(){ return array("x"=>$x,"y"=>$y,"z"=>$z); }
	public function setLocation($location)
	{
		if (is_array($locaiton))
		{
			$this->x = $location['x'];
			$this->y = $location['y'];
			$this->z = $location['z'];
		}
	}

	public function getSerial(){ return $this->serial; }

	public function getName(){ return $this->name; }
	public function setName($name){ $this->name = $name; }

	public function getDescription(){ return $this->description; }
	public function setDescription($description){ $this->description = $description; }

	public function getSize(){ return $this->size; }
	public function setSize($size){ $this->size = $size; }

	public function getMap(){ return $this->map; }
	public function setMap($map){ $this->map = $map; }

	public function getGraphic(){ return $this->graphic.".png"; }
	public function setGraphic($graphic){ $this->graphic = $graphic; }

	public function getVisible(){ return $this->visible; }
	public function setVisible($visible){ $this->visible = $visible; }

	public function getHP(){ return $this->hp; }
	public function setHP($hp){ $this->hp = $hp; }

	public function getWeight(){ return $this->weight; }
	public function setWeight($weight){ $this->weight = $weight; }

	public function __construct($name,$graphic)
	{
		$this->name = $name;
		$this->graphic = $graphic;
		$this->size = Size::medium();
		//$this->serial = Serial::newSerial();
	}

	public function damage($damage)
	{
		$hp = $this->getHP() - $damage;
		$this->setHP($hp);
	}

	public function examine()
	{
		return $description;
	}

	public function tableName()
	{
		return "entities";
	}

	public function save()
	{
		$q = mysql_query("INSERT INTO ".$this->tableName()." 
			(name,description,graphic,visible,x,y,z,mapId)
			VALUES(
				'".$this->getName()."',
				'".$this->getDescription()."',
				'".$this->getGraphic()."',
				'".(int)$this->getVisible()."',
				".$this->x.",
				".$this->y.",
				".$this->z.",
				0
			)
			ON DUPLICATE KEY UPDATE
				name='".$this->name."',
				description='".$this->getDescription()."',
				visible=".(int)$this->getVisible().",
				graphic='".$this->getGraphic()."',
				x=".$this->x.",
				y=".$this->y.",
				z=".$this->z.",
				mapId=".$this->getMap()."
			
		") or die(mysql_error());
		if (empty($q))
		{
			die(mysql_error());
			errorLog(mysql_error());
			return false;
		}
		return true;
	}

	public function load($id)
	{
		$q = mysql_query("SELECT * FROM $this->tableName() WHERE entityId=$id LIMIT 1");
		return mysql_fetch_object($q);
	}
}