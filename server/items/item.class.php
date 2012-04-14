<?php

abstract class Material
{
	public static function none(){ return array("name"=> "", "value" => 0, "type" => "", "hardness" => 0, "maxAgil" => 0, "checkPenalty" => 0, "weightMod" => 0, "rusts" => false, "flammable" => false); }

	// Metal
	public static function iron(){ return array("name"=> "Iron", "value" => 0, "type" => "metal", "hardness" => 0, "maxAgil" => 0, "checkPenalty" => 0, "weightMod" => 0, "rusts" => true, "flammable" => false); }
	public static function steel(){ return array("name"=> "Steel", "value" => 0, "type" => "metal", "hardness" => 0, "maxAgil" => 0, "checkPenalty" => 0, "weightMod" => 0, "rusts" => false, "flammable" => false); }
	public static function silver(){ return array("name"=> "Silver", "value" => 0, "type" => "metal", "hardness" => 0, "maxAgil" => 0, "checkPenalty" => 0, "weightMod" => 0, "rusts" => false, "flammable" => false); }
	public static function gold(){ return array("name"=> "Gold", "value" => 0, "type" => "metal", "hardness" => 0, "maxAgil" => 0, "checkPenalty" => 0, "weightMod" => 0, "rusts" => false, "flammable" => false); }

	// Wood
	public static function wood(){ return array("name"=> "Wood", "value" => 0, "type" => "wood", "hardness" => 0, "maxAgil" => 0, "checkPenalty" => 0, "weightMod" => 0, "rusts" => false, "flammable" => true); }
	public static function cloth(){ return array("name"=> "Cloth", "value" => 0, "type" => "cloth", "hardness" => 0, "maxAgil" => 0, "checkPenalty" => 0, "weightMod" => 0, "rusts" => false, "flammable" => true); }
	public static function leather(){ return array("name"=> "Leather", "value" => 0, "type" => "leather", "hardness" => 0, "maxAgil" => 0, "checkPenalty" => 0, "weightMod" => 0, "rusts" => false, "flammable" => true); }
}

abstract class Quality
{
	public static function low() { return array("maxAgil" => -1, "checkPenalty" => 1, "toHit" => -1); }
	public static function normal() { return array("maxAgil" => 0, "checkPenalty" => 0, "toHit" => 0); }
	public static function masterwork() { return array("maxAgil" => 1, "checkPenalty" => -1, "toHit" => 1); }
}

class Item extends Entity
{
	protected $value = 0;
	protected $space = 0;

	protected $hardness = 0;

	protected $amount = 0;
	protected $enchantment = 0;
	protected $material;
	protected $quality;

	protected $stackable = true;
	protected $identified = false;
	protected $cursed = false;

	protected $parent;

	public function __construct($name, $graphic = "A_Clothing01", $amount = 1)
	{
		parent::__construct($name, $graphic);
		$this->quality = Quality::normal();
		$this->material = Material::none();
		$this->amount = $amount;
	}

	public function save()
	{
		
	}

	public function load()
	{
		
	}
}