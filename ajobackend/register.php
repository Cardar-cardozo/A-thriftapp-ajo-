

<?php 

include 'oop.php';
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Headers: content-type");
$user = json_decode(file_get_contents('php://input'));
function trimit($trimi){
   return trim($trimi);
}
$firstName = trimit($user->firstname);
$lastName = trimit($user->lastname);
$Email = trimit($user->email);
$Password = trimit($user->password);
$passwordharsh = password_hash($Password, PASSWORD_DEFAULT);
$oop = new oop;
$res = $oop->register($firstName, $lastName, $Email, $passwordharsh);

// $arrayName = array('data' => $firstName,'lastname'=>$lastName, 'password'=>$passwordharsh);

echo json_encode($res);







// $data = array('resp'=>'tuuuuu');



// echo json_encode($data);
 ?>