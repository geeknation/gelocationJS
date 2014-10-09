<?php
$longitude = 36.7854;
$latitude = -1.259;
$key = "AIzaSyDbimQ9nDAzirm34TsfcB7nbG8MW4CPqCs";
$url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + $latitude + "," + $longitude + "&radius=500&key=" + $key;

$aContext = array('http' => array('proxy' => 'proxy2:8080', 'request_fulluri' => true, ), );

// Get cURL resource
$curl = curl_init();
// Set some options - we are passing in a useragent too here
curl_setopt_array($curl, array(CURLOPT_RETURNTRANSFER => 1, CURLOPT_URL => $url));
// Send the request & save response to $resp
$resp = curl_exec($curl);
// Close request to clear up some resources
curl_close($curl);
echo json_decode($resp);
$httprequest=new HTTPRequest($url,HTTP_METH_GET);
// $httprequest->setPostFields(array("location"));
$httprequest->setHeaders(array("Content-Type" => "application/json"));
$httprequest->send();
echo ($httprequest->getResponseBody());

?>