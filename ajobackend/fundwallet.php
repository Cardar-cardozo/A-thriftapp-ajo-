<?php
include 'oop.php';
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Content-Type: application/x-www-form-urlencoded");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
$fund = file_get_contents('php://input');
$upadtefund = json_decode($fund);
$userid = $upadtefund->user;
function trimInputs($val){
return trim($val);
} 
$amount = trimInputs($upadtefund->amount);
$oop = new oop;
$oop->fundwallet($userid, $amount);
?>