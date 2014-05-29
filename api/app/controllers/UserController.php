<?php

header('Access-Control-Allow-Origin: *');

class UserController extends BaseController {

	// Used to check to see if email exists
	public function getUser($email, $title, $month, $day, $year, $game_id, $selected_date)
	{

		// If 'on the day' was selected
		if($selected_date === 'undefined') {
			$selected_date = 0;
		}

		$count = Users::where('email', '=', $email)
								->count();

		// If email exists in database
		if($count === 0) {

			$insertUser = Users::insert(array(
				'email' => $email));

			$getUser = Users::where('email', '=', $email)
								->get();

			$userId = $getUser[0]->id;
			$confirmed = $getUser[0]->confirmed;

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
			return Response::json($confirmed);

		}else {

			// If the user doesn't exist in database
			$getUser = Users::where('email', '=', $email)
								->get();

			$userId = $getUser[0]->id;
			$confirmed = $getUser[0]->confirmed;

			// If user enters their email again after unsubscribing
			if($getUser[0]->confirmed === '3') {
				$data = array('email' => $email, 'id' => $userId);

				Mail::send('emails.confirm', $data, function($message) use($data)
				{
				    $message
				    ->to($data['email'])
				    ->subject('Confirm Email');
				});

				$updateUser = $getUser->first();
				$updateUser->confirmed = '4';
				$updateUser->save();
				$confirmed = '4';
			}

			$insertGames = UsersGames::insert(array(
				'user_id' => $userId,
				'title' => $title,
				'month' => $month,
				'day' => $day,
				'year' => $year,
				'game_id' => $game_id,
				'selected_date' => $selected_date));

			header('Access-Control-Allow-Origin: *');
			return Response::json($confirmed);
		}
	}

	// Confirm the email in the database
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

	// Unconfirm the email in the database
	public function unconfirmUser($email, $id) {

		$count = Users::where('email', '=', $email)
								->count();

		if($count === 0) {

			echo $count;

		}else {

			$getUser = Users::where('email', '=', $email, 'and', 'id', '=', $id)
									->get();

			$updateUser = $getUser->first();

			$updateUser->confirmed = '3';
			$updateUser->save();

			return Response::json($getUser);

		}

	}

}