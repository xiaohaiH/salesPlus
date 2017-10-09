<?php
	header("Access-Control-Allow-Origin: *");

 /* 这个是接收 fetch 请求参数的代码 */
	$post = json_decode(file_get_contents("php://input"));
  $name = $post->userName;
  $password = $post->password;

  /* 这个是接收 POST 请求参数的代码 */
  // $post = $_POST;
  // $name = $post['userName'];
  // $password = $post['password'];
	// $name = 'a';
	// $password = 'a';
  if($name === 'a'&& $password === 'a'){
  	/* 两种写法,建议第一种 --> 第一种 */
    $result = array('code' => 'success', 'data' => array('userLoginStatus' => true, 'userInfo' => array('name' => $name, 'token' => 1, 'permission' => 'advanced')));
  }else if($name === 'b'&& $password === 'b'){
  	/* 两种写法,建议第一种 --> 第二种 */
  	$data = new stdClass();
  	$data->userLoginStatus = true;
  	$data->userInfo = new stdClass();
		$data->userInfo->name = $name;
		$data->userInfo->token = 2;
		$data->userInfo->permission = 'common';
    $result = array('code' => 'success', 'data' => $data);
  }else{
    $result = array('code' => 'fail', 'data' => array('userLoginStatus' => false, 'userInfo' => array('name' => $name, 'token' => '', 'permission' => ''), 'hint' => '密码错误'));
  };
  $result = json_encode($result);
  echo $result;