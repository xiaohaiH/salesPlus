<?php

  header("Access-Control-Allow-Origin: *");
  $post = $_POST;
  $header = $post['header'];
  $token = $post['token'];
  $permission = $post['permission'];
  // $header = false;
  // $token = 123;
  // $permission = 'common';
  if($header === 'true'){
    $result = array((object) array('title' => '姓名', 'dataIndex' => 'name' ), (object) array('title' => '年龄', 'dataIndex' => 'age'), (object) array('title' => '地址', 'dataIndex' => 'address'), (object) array('title' => '操作'));
    // $titleName = (object) array();
    // $titleAge = (object) array();
    // $titleAddress = (object) array();
    //   $titleName->name = '姓名';
    //   $titleAge->age = '年龄';
    //   $titleAddress->address = '地址';
    // array_push($result, $titleName, $titleAge, $titleAddress);
  }else{
    $result = array();
    $one = (object) array();
    $two = (object) array();
    $three = (object) array();
    $four = (object) array();
    $five = (object) array();
    if($permission === 'common'){
      $one->name = (object) array('value' => '普通权限', 'editable' => false);
      $one->age = (object) array('value' => '普通权限', 'editable' => false);
      $one->address = (object) array('value' => '普通权限');
      $two->name = (object) array('value' => 'aa', 'editable' => false);
      $two->age = (object) array('value' => '18', 'editable' => false);
      $two->address = (object) array('value' => '北京', 'editable' => false);
      $three->name = (object) array('value' => 'bb', 'editable' => false);
      $three->age = (object) array('value' => '321', 'editable' => false);
      $three->address = (object) array('value' => '上海', 'editable' => false);
      $four->name = (object) array('value' => 'cc', 'editable' => false);
      $four->age = (object) array('value' => '15');
      $four->address = (object) array('value' => '广州', 'editable' => false);
      $five->name = (object) array('value' => 'dd', 'editable' => false);
      $five->age = (object) array('value' => '66', 'editable' => false);
      $five->address = (object) array('value' => '深圳', 'editable' => false);
      array_push($result, $one, $two , $three, $four, $five);
    }else{
      $one->name = (object) array('value' => '高级权限', 'editable' => false);
      $one->age = (object) array('value' => '高级权限', 'editable' => false);
      $one->address = (object) array('value' => '高级权限', 'editable' => false);
      $two->name = (object) array('value' => 'ee', 'editable' => false);
      $two->age = (object) array('value' => '33');
      $two->address = (object) array('value' => '长沙', 'editable' => false);
      $three->name = (object) array('value' => 'ff', 'editable' => false);
      $three->age = (object) array('value' => '56', 'editable' => false);
      $three->address = (object) array('value' => '娄底', 'editable' => false);
      $four->name = (object) array('value' => 'gg', 'editable' => false);
      $four->age = (object) array('value' => '33');
      $four->address = (object) array('value' => '湘潭', 'editable' => false);
      $five->name = (object) array('value' => 'hh', 'editable' => false);
      $five->age = (object) array('value' => '51', 'editable' => false);
      $five->address = (object) array('value' => '邵阳', 'editable' => false);
      array_push($result, $one, $two , $three, $four, $five);
    };
  };
  // print_r($result);
  // exit;
  $result = json_encode($result);
  echo $result;