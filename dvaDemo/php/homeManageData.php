<?php

  header('Access-Control-Allow-Origin: *');
  $post = $_POST;
  $type = $post['type'];
  $id = $post['id'];
  /* 
    中间一段逻辑处理完成后;
  */
  if($type === 'delete'){
    $result = array('code' => true);
    echo json_encode($result);
  };