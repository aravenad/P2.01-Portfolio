<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $lastName = strip_tags(trim($_POST["last_name"]));
    $firstName = strip_tags(trim($_POST["first_name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = strip_tags(trim($_POST["subject"]));
    $message = strip_tags(trim($_POST["message"]));

    // Destination de l'email
    $recipient = "damien.aravena@gmail.com";

    // Sujet de l'email
    $subject = "Nouveau message de $firstName $lastName";

    // Construire le contenu de l'email
    $email_content = "Nom: $lastName\n";
    $email_content .= "Prénom: $firstName\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Sujet: $subject\n";
    $email_content .= "Message:\n$message\n";

    // Construire les headers de l'email
    $email_headers = "From: $lastName $firstName <$email>";

    // Envoi de l'email
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        // Rediriger vers une page de remerciement ou afficher un message de succès
        echo "Merci pour votre message. Nous vous contacterons bientôt.";
    } else {
        // Afficher un message d'erreur
        echo "Oops! Quelque chose a mal tourné et nous n'avons pas pu envoyer votre message.";
    }
} else {
    // Rediriger vers le formulaire si la méthode n'est pas POST
    header("Location: contact.html");
    exit;
}
?>
