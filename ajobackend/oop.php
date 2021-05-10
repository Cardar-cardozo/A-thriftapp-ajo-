<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
require ('vendor/autoload.php');
use \Firebase\JWT\JWT;
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

    class oop{
        public $arr  = array('Empty' =>'', 'Auth'=>'', 'Upload'=>'', 'Notupload'=>'', 'Large'=>'', 'firstname'=>'', 'amount'=>'', 'email'=>'');

        public function __construct(){
            $servername =$_ENV['SERVERNAME'];
            $root = $_ENV['USERNAME'];
            $pword =$_ENV['PASSWORD'];
            $dbname =$_ENV['DBNAME'];
            $secret = $_ENV['SECRET'];
            $this->conn = new mysqli($servername, $root, $pword, $dbname);
            if (!$this->conn) {
                die();
            }else{
               
            }
            
        }
        public function register($firstName, $lastName, $Email, $passwordharsh){
            $existed= "SELECT * FROM users WHERE email = '$Email'";
            $check = $this->conn->query($existed);

            if($check->num_rows>0){
                // $arr['exists'] = 'email existed';
                $response = array('fail'=>'exited');
            } else {
                $this->conn->query("INSERT INTO users(firstname, lastname, password, email) VALUES ('$firstName','$lastName', '$passwordharsh', '$Email')");
                $response = array('sucess'=>' exist');
            }
            return $response;
		}


        public function login($Email, $Password){
            $user = "SELECT * FROM users WHERE email = '$Email'";
            $checkemail = $this->conn->query($user);
            if ($checkemail->num_rows>0) {
                $fetchuser = $checkemail->fetch_assoc();
                $fetchpass = $fetchuser['password'];
                $fetchuserid = $fetchuser['user_id'];
                $verify = password_verify($Password, $fetchpass);
                if ($verify) {
                    $data = [
                        'iss'=>'localhost/4200',
                        'iat'=>time(),
                        'exp'=>time()* 3600,
                        'user'=>$fetchuserid
                    ];
                    $auth = JWT::encode($data, $_ENV['SECRET']);
                    $arr['Auth'] = json_encode($auth);

                    echo json_encode($arr);
                }
            }
        }



        public function uploadPics($tmpLocation, $filename, $ext, $currentTime, $arrr, $authorize){
            $codeSql = "SELECT * FROM users WHERE user_id = '$authorize'";
            $check = $this->conn->query($codeSql);
            if($check->num_rows > 0){ 
            if($_FILES['myFile']['size']>6242880){
            $arr['Large'] = 'large';
            }else{
            if(in_array($ext, $arrr)){
            $realFilename = $authorize."ajopay".$currentTime.".".$ext;
            $finalLocation = "uploads/". $realFilename;
            $checkUpload = move_uploaded_file($tmpLocation, $finalLocation);
            if($checkUpload){
            $updateSql = "UPDATE users SET image = '$realFilename' WHERE user_id = $authorize";
            $update = $this->conn->query($updateSql);
            if($update){
            $arr['Upload'] = 'good';
            }else{
            $arr['Notupload'] = 'bad';
            }      
            }
            }} }
            echo json_encode($arr);
            }

            public function ajoPost($userid, $title, $describe, $amount, $duration, $type, 
$member){
$postAjo = $this->conn->query("INSERT INTO ajo_tb(user_id, title, description, type, amount, duration,  status)VALUES ('$userid', '$title', '$describe','$type', '$amount','$duration', 'pending')");
if($postAjo){
    $arr['Postgood'] = 'good';
}
// echo json_encode($arr);
}





public function getmythrifts($userId){
    $x = [];
    $checkSql3 = "SELECT * FROM ajo_tb WHERE user_id = '$userId'";
    $check3 = $this->conn->query($checkSql3);
    if($check3->num_rows > 0){
    while($row = $check3->fetch_array()){
    $x[] = $row; 
    foreach($x as $p);
    $arr['Ajopost'] = $x;
    
    }
    } 
    echo json_encode($arr);
    }





    public function invite($email, $userid, $ajoid){
        $checkSql = "SELECT * FROM users WHERE email = '$email'";

        $check = $this->conn->query($checkSql);
        

        if($check->num_rows > 0){
                    $myFetchedDetails = $check->fetch_assoc();
                    $myFetchedinvitee = $myFetchedDetails['lastname'];
                    $myFetchedid = $myFetchedDetails['user_id'];
                    $checkSendername = "SELECT * FROM users WHERE user_id = '$userid'";
                    $checkname = $this->conn->query($checkSendername);

                    
                    


                    if($checkname->num_rows > 0){
                                            $myFetcheduser = $checkname->fetch_assoc();
                                            $fetchedname = $myFetcheduser['lastname'];
                                            $fetchedemail = $myFetcheduser['email'];

                                            if($email == $fetchedemail){
                                                   $arr['Notinvite'] = 'bad';
                                                   echo json_encode($arr);
                                               } else{
                                                   $checkAlreadyInvited = $this->conn->query("SELECT * FROM participate_tb WHERE invittee_id = '$myFetchedid' and ajo_id = '$ajoid'");
                            
                                                 if($checkAlreadyInvited->num_rows > 0){
                                                            //   $arr['AlreadyInvited'] = 'bad';
                                                              $respons = array(["Alreadey" => "bad"]);
                                                              echo json_encode($respons);
                                                        } else {
                                                               $check = $this->conn->query("INSERT INTO participate_tb( user_id,ajo_id, participate_name, invittee_id,   inviter_name, status)VALUES ($userid, '$ajoid',  '$myFetchedinvitee',   '$myFetchedid', '$fetchedname',  'Pending')");
                                            if ($check) {
                                                $response = array(["success" => "true"]);
                                                echo json_encode($response);
                                            }
                                                                  }
                                                                        }


                    }   else {
                        $res = array(["notexist" => "false"]);
                        //     echo json_encode($response);

                            echo json_encode($res);
                        }                     

                    }
                

                    


        }

        public function getInvites($userId){
            $x = [];
            $checkId = "SELECT * FROM participate_tb WHERE invittee_id = '$userId'";
            $check = $this->conn->query($checkId);
            if($check->num_rows > 0){
                    while($row = $check->fetch_array()){
                    $x[] = $row;
                    $arr['Allinvites'] = $x;
                    }
            
            echo json_encode($arr);
            }

        }


        public function pay($userid, $ajoid){
            $check = $this->conn->query("SELECT * FROM participate_tb WHERE ajo_id = '$ajoid' and invittee_id = '$userid'");
            $myFetcheddata = $check->fetch_assoc();
            $paymentstatus = $myFetcheddata['payment'];
            if($paymentstatus=='pending'){
            $credit = $this->conn->query("SELECT * FROM ajo_tb WHERE ajo_id = '$ajoid'");
            $myFetcheddata = $credit->fetch_assoc();
            $balance = $myFetcheddata['ajowallet'];
            if($balance == 0){
            $arr['Walletempty'] = 'walletempty';
            }else{
            $userwallet = $this->conn->query("SELECT * FROM users WHERE user_id = '$userid'");
            $myFetchedwallet = $userwallet->fetch_assoc();
            $wallet = $myFetchedwallet['balance'];
            $add = $wallet + $balance;
            $updateuser = $this->conn->query("UPDATE users SET balance = '$add' WHERE user_id = '$userid'");
            if($updateuser){
            $updateajowallet = $this->conn->query("UPDATE ajo_tb SET ajowallet = 0 WHERE ajo_id = '$ajoid'");
            $updateinvite = $this->conn->query("UPDATE participate_tb SET payment = 'paid' WHERE ajo_id = '$ajoid' and invittee_id = '$userid'");
            $arr['Paid'] = 'paid';
            }
            }
            }else {
            $arr['AlreadyPaid'] = 'alreadypaid';
            }
            echo json_encode($arr);
            }


        



        public function payuser($userid, $ajoid){
            $check = $this->conn->query("SELECT * FROM ajo_tb WHERE ajo_id = '$ajoid' and user_id = '$userid'");
            $myFetcheddata = $check->fetch_assoc();
            $paymentstatus = $myFetcheddata['payment'];
            $balance = $myFetcheddata['ajowallet'];
            if($paymentstatus=='pending'){
            if($balance == 0){
            $arr['Walletempty'] = 'walletempty';
            }else{
                    $userwallet = $this->conn->query("SELECT * FROM users WHERE user_id = '$userid'");
                    $myFetchedwallet = $userwallet->fetch_assoc();
                    $wallet = $myFetchedwallet['balance'];
                    $add = $wallet + $balance;
                    $updateuser = $this->conn->query("UPDATE users SET balance = '$add' WHERE user_id = '$userid'");
                    if($updateuser){
                    $updateajowallet = $this->conn->query("UPDATE ajo_tb SET ajowallet = 0, payment = 'paid' WHERE ajo_id = '$ajoid'");
                    $arr['Paid'] = 'paid';
                    }
                    
                    else {
                    $arr['AlreadyPaid'] = 'alreadypaid';
                        // echo json_encode($arr);
                }
            }
            echo json_encode($arr);
        }
            
            
            
            

        }


        public function myInvites($userId){
            $x = [];
            $checkId = "SELECT * FROM participate_tb WHERE user_id = '$userId'";
            $check = $this->conn->query($checkId);
            if($check->num_rows > 0){
            while($row = $check->fetch_array()){
            $x[] = $row;
            $arr['Allinvites'] = $x;
            }
            
            echo json_encode($arr);
            }
            
            }


            



            public function acceptreq($inviteeid, $ajoId, $duration){
                $checkDuration = $this->conn->query("SELECT * FROM ajo_tb WHERE ajo_id = '$ajoId'");
                if($checkDuration->num_rows > 0){
                $myFetcheddata = $checkDuration->fetch_assoc();
                $duration =  $myFetcheddata['duration'];
                $noofPart =  $myFetcheddata['invite'];
                if($noofPart == $duration){
                $arr['Filledup'] = 'filledup';
                }else{
                $checkStatus = $this->conn->query("SELECT * FROM participate_tb WHERE ajo_id = '$ajoId' and invittee_id = '$inviteeid'");
                if($checkStatus ->num_rows > 0){
                $myFetcheddata = $checkStatus->fetch_assoc();
                $status =  $myFetcheddata['status'];
                if($status == 'Pending'){
                $checkId = $this->conn->query("UPDATE participate_tb SET status = 'Accepted' WHERE ajo_id = '$ajoId' and invittee_id = '$inviteeid'");
                if($checkId){
                $arr['Accepted'] = 'accepted';
                $codeSql = $this->conn->query("SELECT * FROM ajo_tb WHERE ajo_id = '$ajoId'");
                if($codeSql->num_rows > 0){
                $myFetcheddata = $codeSql->fetch_assoc();
                $noofpart =  $myFetcheddata['invite'];
                $newnumber = $noofpart + 1;
                $noofParts = $this->conn->query("UPDATE ajo_tb SET invite = '$newnumber' WHERE ajo_id = $ajoId");
                }
                }
                }
                elseif($status == 'Accepted'){
                $arr['AlreadyAccepted'] = 'already';
                }elseif($status == 'Rejected'){
                $arr['AlreadyRejected'] = 'rejected';
                }
                
                
                }  
            }
            echo json_encode($arr);
                }
                
                
                }


                public function rejectreq($inviteeid, $ajoId){
                    $checkStatus = $this->conn->query("SELECT * FROM participate_tb WHERE ajo_id = '$ajoId' and invittee_id = '$inviteeid'");
                    if($checkStatus ->num_rows > 0){
                    $myFetcheddata = $checkStatus->fetch_assoc();
                    $status =  $myFetcheddata['status'];
                    if($status == 'Pending'){
                    $checkId = $this->conn->query("UPDATE participate_tb SET status = 'Rejected' WHERE ajo_id = '$ajoId' and invittee_id = '$inviteeid'");
                    if($checkId){
                    $arr['Rejected'] = 'rejected';
                    }
                    }
                    elseif($status == 'Accepted'){
                    $arr['AlreadyAccepted'] = 'already';
                    }elseif($status == 'Rejected'){
                    $arr['AlreadyRejected'] = 'rejected';
                    }
                    
                    
                    }  
                    echo json_encode($arr);   
                    }



                    public function getaccepted($ajoId){
                        $x=[];
                        $check = $this->conn->query("SELECT * FROM participate_tb WHERE ajo_id = '$ajoId' and status = 'Accepted'");
                        if($check ->num_rows > 0){
                        while($row = $check->fetch_array()){
                        $x[] = $row;
                        $arr['Getaccepted'] = $x; 
                        }
                        echo json_encode($arr);
                        }}


            public function ajodetails($ajoId){
                $checkId = $this->conn->query("SELECT * FROM ajo_tb WHERE ajo_id = '$ajoId'");
                if($checkId ->num_rows > 0){
                $myFetcheddata = $checkId->fetch_assoc();
                $title =  $myFetcheddata['title'];
                $describ = $myFetcheddata['description'];
                $type = $myFetcheddata['type'];
                $amount = $myFetcheddata['amount'];
                $duration = $myFetcheddata['duration'];
                $ajodetails = array('title'=>$title, 'describ'=>$describ, 'type'=>$type, 'amount'=>$amount, 'duration'=>$duration);
                $arr['Ajodetails'] = $ajodetails;
                echo json_encode($arr);
                }
                }





                public function startajo($ajoId){
                    $checkInviter = $this->conn->query("SELECT * FROM ajo_tb WHERE ajo_id = '$ajoId'");
                    if($checkInviter->num_rows > 0){
                    $myFetcheddata = $checkInviter->fetch_assoc();
                    $status =  $myFetcheddata['status'];
                    $userid =  $myFetcheddata['user_id']; 
                    $amount =  $myFetcheddata['amount'];
                    if($status == "pending"){
                    $debitInviter = $this->conn->query("SELECT * FROM users WHERE user_id = '$userid'"); 
                    if($debitInviter->num_rows > 0){
                    $myFetchedInviter = $debitInviter->fetch_assoc();
                    $balanceuser = $myFetchedInviter['balance'];
                    if($amount > $balanceuser){
                    $arr['Insufficient'] = 'insufficient';
                    }else{
                    $check = $this->conn->query("SELECT * FROM participate_tb JOIN users ON participate_tb.invittee_id = users.user_id WHERE ajo_id = '$ajoId' and status = 'Accepted'");
                    if($check ->num_rows > 0){
                    $counter = 0;
                    while($row = $check->fetch_array()){
                    $balance = $row['balance'];
                    $inviteeid = $row['invittee_id'];
                    $lastname = $row['lastname'];
                    $counter++;
                    if($amount > $balance){
                    $arr['InsufficientInvitee'] = 'insufficient';
                    }else{
                    $deduct = $balance - $amount;
                    $updateWallet = $this->conn->query("UPDATE users SET balance = '$deduct' WHERE user_id = '$inviteeid'");
                    $deductUser = $balanceuser - $amount;
                    $updateInviterWallet = $this->conn->query("UPDATE users SET balance = '$deductUser' WHERE user_id = '$userid'");
                    $updatetAll = $counter+1; 
                    $updater = $updatetAll*$amount;
                    $updateThriftWallet = $this->conn->query("UPDATE ajo_tb SET ajowallet = '$updater', status = 'Ongoing' WHERE ajo_id = '$ajoId'");
                    if($updateThriftWallet){
                    $arr['Started'] = 'started';
                    }
                    }
                    }
                    }
                    }
                    }
                    
                    }else{
                    $arr['Startedalready'] = 'alreadystarted';
                    }
                    
                    }
                    
                    echo json_encode($arr);
                    }


            

            public function profile($auth){

                
                $decoded = JWT::decode($auth, $_ENV['SECRET'], array('HS256'));
                //  echo json_encode($decoded);
                $userId = $decoded->user;
                $codeSql = "SELECT * FROM users WHERE user_id = '$userId'";
                $check = $this->conn->query($codeSql);
                if($check->num_rows > 0){
                $myFetcheduser = $check->fetch_assoc();
                
                $profile = $myFetcheduser['image'];
                $first = $myFetcheduser['firstname'];
                $amount =  $myFetcheduser['balance'];
                $emai =  $myFetcheduser['email'];
                $lastname = $myFetcheduser['lastname'];

                
                $arr['image'] = $profile;
                $arr['firstname'] = $first;
                $arr['amount'] = $amount;
                $arr['email'] = $emai;
                $arr['lastname'] = $lastname;

                echo json_encode($arr);
                }
             }

            //  public function send($code){

            //     echo json_encode($code);
            // }

            public function sendcode($uth){

                
                $decoded1 = JWT::decode($uth, $_ENV['SECRET'], array('HS256'));
                $userId1 = $decoded1->user;
                // $emai = $decoded1->user;
                $codeSql = "SELECT * FROM users WHERE user_id = '$userId1'";
                $check1 = $this->conn->query($codeSql);
                
                if($check1->num_rows > 0){
                    $myFetcheduser1 = $check1->fetch_assoc();
                    $emai =  $myFetcheduser1['email'];
                    $name =  $myFetcheduser1['firstname'];
                    // echo json_encode($emai);
                    $mail = new PHPMailer(true);
try {
//Server settings
$mail->SMTPDebug = SMTP::DEBUG_SERVER;                     
$mail->isSMTP();                                           
$mail->Host       = 'smtp.gmail.com';                     
$mail->SMTPAuth   = true;                               
$mail->Username   = 'ajopay@gmail.com';                    
$mail->Password   = 'Toluwanimiowoade2001$';                              
$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;         
$mail->Port       = 465;                                   
$mail->SMTPOptions = array(
'ssl' => array(
'verify_peer' => false,
'verify_peer_name' => false,
'allow_self_signed' => true
)
);
$mail->SMTPDebug = 0;
//Recipients
$mail->setFrom('ajopay@gmail.com', 'ajopay');
$mail->addAddress($emai, $name);    
$mail->addAddress($emai);             

$mail->isHTML(true);                                  
$mail->Subject = 'Confirmation code';
$mail->Body    = 'Your verification code is'.' '.'jjjjjjjj';
$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

$mail->send();
$arr['Code'] = 'codesent';
} catch (Exception $e) {
$arr['Codefail'] = 'Code error';
}


echo json_encode($arr);
}
            

                

                

                
                
             }

             public function fundwallet($userid, $amount){
                $checkSql = "SELECT * FROM users WHERE user_id = '$userid'";
                $check = $this->conn->query($checkSql);
                if($check->num_rows > 0){
                $myFetcheduser = $check->fetch_assoc();
                $fetchedamount = $myFetcheduser['balance'];
                $updateAmount = $fetchedamount + $amount;
                $updateSql = "UPDATE users SET balance = '$updateAmount' WHERE user_id = $userid";
                $update = $this->conn->query($updateSql);
                if($update){
                $arr['Fundadded'] = 'good';
                echo json_encode($arr);
                }
                }
                }
        

             
    }


    

    


        
 

?>