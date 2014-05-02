<?php

header('Access-Control-Allow-Origin: *');

class UserController extends BaseController {

	public function getUser($email, $title, $month, $day, $year, $game_id, $selected_date)
	{

		$count = Users::where('email', '=', $email)
								->count();

		if($count === 0) {

			$insertUser = Users::insert(array(
				'email' => $email));

			$getUser = Users::where('email', '=', $email)
								->get();

			$userId = $getUser[0]->id;

			$insertGames = UsersGames::insert(array(
				'user_id' => $userId,
				'title' => $title,
				'month' => $month,
				'day' => $day,
				'year' => $year,
				'game_id' => $game_id,
				'selected_date' => $selected_date));
		}else {

			$getUser = Users::where('email', '=', $email)
								->get();

			$userId = $getUser[0]->id;

			$insertGames = UsersGames::insert(array(
				'user_id' => $userId,
				'title' => $title,
				'month' => $month,
				'day' => $day,
				'year' => $year,
				'game_id' => $game_id,
				'selected_date' => $selected_date));
		}

		header('Access-Control-Allow-Origin: *');
		return Response::json($insertGames);

	}
}