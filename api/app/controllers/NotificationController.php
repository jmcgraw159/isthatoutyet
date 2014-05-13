<?php

header('Access-Control-Allow-Origin: *');

class NotificationController extends BaseController {

	public static function sendNotification()
	{

		// Set timezone
		date_default_timezone_set('EST');

		// Get current date
		$month = date('n');
		$day = date('j');
		$year = date('Y');

		// echo $month . $day . $year;

		// Select games that match the current date
		$getContent = UsersGames::where(DB::raw('day + selected_date'), '=', $day, 'and', 'month', '=', $month, 'and', 'year', '=', $year)
								->join('users', 'user_id', '=', 'users.id')
								->get();

		// If date is = current date
		foreach($getContent as $game) {

			echo $game->selected_date;

			if($game->selected_date === 0) {
				$selected = 'on the day';
				echo $selected_date;
			}else {
				echo 'Nope';
			}



			//else if($game->selected_date === 1) {
			// 	$selected = '1 day before';
			// 	echo $selected_date;
			// }else if($game->selected_date === 2) {
			// 	$selected === '2 days before';
			// 	echo $selected_date;
			// }else  {
			// 	$selected === '3 days before';
			// 	echo $selected_date;
			// }


			// $data = array('email' => $game.email, 'title' => $game.title, 'selected' => $selected);

			// // Send mail
			// Mail::send('email.notification', $data, function($message) use($data)
			// {
			//     $message
			//     ->to($data['email'])
			//     ->subject('Game Notification');
			// });
		}

	}
}