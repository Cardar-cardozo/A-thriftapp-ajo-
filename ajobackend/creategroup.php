<?php
include 'oop.php';
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Content-Type: application/x-www-form-urlencoded");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
$ajopost = file_get_contents('php://input');
$ajo = json_decode($ajopost);
$userid = $ajo->userid;
function trimInputs($val){
return trim($val);
} 
$title = trimInputs($ajo->title);
$describe = trimInputs($ajo->describe);
$amount = trimInputs($ajo->amount);
$duration = trimInputs($ajo->duration);
$type = trimInputs($ajo->type);
$member = trimInputs($ajo->member);
$oop = new oop;
$oop->ajoPost($userid, $title, $describe, $amount, $duration, $type, 
$member);

echo  json_encode($title);
?>