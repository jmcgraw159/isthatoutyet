<?php

header('Access-Control-Allow-Origin: *');

class MandrillController extends BaseController {

	public static function newUser($email, $userId)
	{



    header('Access-Control-Allow-Origin: *');
    return Response::json($response);
	}
}