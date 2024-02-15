<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $type = $_POST['type'];
    $message = $_POST['message'];

    $to = "vamseedharreddy1209@gmail.com, vamseedharreddy1122@gmail.com"; // List of recipient emails separated by commas
    
    $body = "Name: $name\nEmail: $email\n Type: $type\nMessage:\n$message";

    $headers = "From: $email";

    // Send email
    if (mail($to, $body, $headers)) {
        echo "Email sent successfully!";
    } else {
        echo "Failed to send email.";
    }
} else {
    echo "Error: Method not allowed.";
}
?>
