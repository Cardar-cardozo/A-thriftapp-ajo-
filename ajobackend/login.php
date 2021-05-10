<?php
include 'oop.php';
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Headers: content-type");


$login = json_decode(file_get_contents('php://input'));
function trimit($trimi){
    return trim($trimi);
}

$Email = trimit($login->email);
$Password = trimit($login->password);
// $mylogic = new logic;
// $mylogic->login($Email, $Password);

$oop = new oop;
$res = $oop->login( $Email, $Password );

// echo json_encode($log);



?>