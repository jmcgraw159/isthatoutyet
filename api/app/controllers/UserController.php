<?php

header('Access-Control-Allow-Origin: *');

class UserController extends BaseController {

	public function getUser($email)
	{

		$getUser = Users::where('email', '=', $email)
								->get();

		$count = Users::where('email', '=', $email)
								->count();

		if($count === '0') {

			MandrillController::newUser($email);

			UserGames::insert(array(
				'user_id' => $userId,
				'title' => $title,
				'month' => $month,
				'day' => $day,
				'year' => $year,
				'game_id' => $game_id));

		}else {
			$insertUser = Users::insert(array(
				'email' => $email));

			$getUser = Users::where('email', '=', $email)
								->get();

			$userId = $getUser[0]->id;

			UserGames::insert(array(
				'user_id' => $userId,
				'title' => $title,
				'month' => $month,
				'day' => $day,
				'year' => $year,
				'game_id' => $game_id));
		}

		header('Access-Control-Allow-Origin: *');
		return Response::json($getUser);

	}
}