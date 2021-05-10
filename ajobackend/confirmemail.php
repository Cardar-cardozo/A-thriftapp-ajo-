<?php
include 'oop.php';
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Headers: content-type");


$Email = json_decode(file_get_contents('php://input'));
function trimit($trimi){
    return trim($trimi);
}

$code = $Email->ver;

$oop = new oop;
$res = $oop->send( $code );







?>