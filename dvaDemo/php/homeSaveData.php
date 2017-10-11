<?php

header('Access-Control-Allow-Origin: *');
$post = $_POST;
// $token = $post['token'];
$userName = $post['name'];
$age = $post['age'];
$address = $post['address'];

/* 
  中间一长段逻辑
*/

echo json_encode(array('code' => 'success'));