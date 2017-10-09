<?php

  header('Access-Control-Allow-Origin: *');
  $post = $_POST;
  $type = $post['type'];
  $name = $post['name'];
  /* 
    中间一段逻辑处理完成后;
  */
  if($type === 'delete'){
    $result = array('success' => true);
    echo json_encode($result);
  };