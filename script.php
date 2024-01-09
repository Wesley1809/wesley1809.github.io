<?php
if($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    $to = 'westley.petersen@umuzi.org';
    $subject = 'Message from Portfolio Site';

    $body = "From: $name\n E-Mail: $email\n Message:\n $message";

    if(mail($to, $subject, $body)) {
        echo 'Your message has been sent successfully!';
    } else {
        echo 'Sorry, there was an error sending your message. Please try again later.';
    }
}
?>
