<?php
$name = $_POST['name'];

$email = $_POST['email'];

$type = $_POST['type'];

$message = $_POST['message'];

$conn=mysqli_connect("localhost","root","","contactsubmit");

if($conn -> connect_error )
{
	die('Connection Failed:' .$conn->connect_error);
}
else{
	$stmt=$conn->prepare("insert into form1(name,email,type,message)
	values(?, ?, ?, ?) ");
	$stmt->bind_param("ssss",$name,$email,$type,$message);
	$stmt->execute();
	echo "submitted successfully";
	$stmt->close();
	$conn->close();
}
?>