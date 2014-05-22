<?php

header('Access-Control-Allow-Origin: *');

class UserController extends BaseController {

	public function getUser($email, $title, $month, $day, $year, $game_id, $selected_date)
	{

		// If 'on the day' was selected
		if($selected_date === 'undefined') {
			$selected_date = 0;
		}

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

			$data = array('email' => $email, 'id' => $userId);

			Mail::send('emails.confirm', $data, function($message) use($data)
			{
			    $message
			    ->to($data['email'])
			    ->subject('Confirm Email');
			});

			header('Access-Control-Allow-Origin: *');
			return Response::json($count);

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

			header('Access-Control-Allow-Origin: *');
			return Response::json($count);
		}
	}

	public function confirmUser($email, $id) {

		$count = Users::where('email', '=', $email)
								->count();

		if($count === 0) {

			echo $count;

		}else {

			$getUser = Users::where('email', '=', $email, 'and', 'id', '=', $id)
									->get();

			$updateUser = $getUser->first();

			$updateUser->confirmed = '1';
			$updateUser->save();

			return Response::json($getUser);

		}

	}

	public function unconfirmUser($email, $id) {

		$count = Users::where('email', '=', $email)
								->count();

		if($count === 0) {

			echo $count;

		}else {

			$getUser = Users::where('email', '=', $email, 'and', 'id', '=', $id)
									->get();

			$updateUser = $getUser->first();

			$updateUser->confirmed = '0';
			$updateUser->save();

			return Response::json($getUser);

		}

	}

}