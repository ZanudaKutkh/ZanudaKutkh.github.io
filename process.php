<?php

$ch = curl_init('http://new.topline.gq/n8n/webhook/promo_orders');
curl_setopt_array($ch, array(
    CURLOPT_POST => TRUE,
    CURLOPT_RETURNTRANSFER => TRUE,
    CURLOPT_HTTPHEADER => array(
        'Content-Type: application/json'
    ),
    CURLOPT_POSTFIELDS => file_get_contents('php://input')
));

$response = curl_exec($ch);

if($response === FALSE){
    die(curl_error($ch));
}

$responseData = json_decode($response, TRUE);

curl_close($ch);

echo file_get_contents('php://input');
