<?php
include 'oop.php';
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Headers: content-type, Authorization, X-Requested-With");
require('vendor/autoload.php');

$authorize = getallheaders()['Authorization'];

// echo 'jbdajldbaubcaujdb';

$auth = json_decode(file_get_contents('php://input'));
$tmpLocation = $_FILES['myFile']['tmp_name'];
$filename = basename($_FILES['myFile']['name']);
$ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
$currentTime = time();
$arrr = ['jpg', 'png', 'jpeg'];
$oop = new oop;
$oop->uploadPics($tmpLocation, $filename, $ext, $currentTime, $arrr, $authorize);


?>