<?php

header('Access-Control-Allow-Origin: *');

class MandrillController extends BaseController {

	public static function newUser($email, $userId)
	{

		// $call = file_get_contents('https://mandrillapp.com/api/1.0/messages/send.json',  {
  //             key: '8Xt3wMbH1HzqFQJQFdjGBg',
  //             message:  {
  //               html: '<h1>Almost there...</h1><p>We need to verfiy your email address before we can start sending you notifications. Don\'t worry, you only need to verify your email once!</p><a href="http://localhost:9000/#/subscribe?email=' . $userId . '">Verify Email Address</a>',
  //               text: 'Confirm Email',
  //               subject: 'Confirm Email',
  //               from_email: 'confirm@isthatoutyet.com',
  //               from_name: 'Is That Out Yet?',
  //               to: [ {
  //                   email: $scope.email.inputEmail
  //                 }
  //               ]
  //             }
  //       });

      $response = json_decode($call);

    header('Access-Control-Allow-Origin: *');
    return Response::json($response);
	}
}