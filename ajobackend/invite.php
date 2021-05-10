<?php
include 'oop.php';
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
$details = json_decode(file_get_contents('php://input'));
function trimInputs($val){
return trim($val);
} 
$email = trimInputs($details->email);
$userid = trimInputs($details->userid);
$ajoid = trimInputs($details->ajoid);

// echo json_decode($ajoid);
$oop = new oop;
$oop->invite($email, $userid, $ajoid);


?>