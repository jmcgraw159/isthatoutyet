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
		$getContent = DB::select(DB::raw('select * from users_games where day + selected_date = :date and month = :month and year = :year'), array(
											'date' => $day,
											'month' => $month,
											'year' => $year));
		echo $getContent;
		// If date is = current date
		// foreach($getContent as $game) {

		// 	echo $game;

		// 	if($game->selected_date === '0') {

		// 		$selected = 'on the day';

		// 	}elseif($game->selected_date === '1') {

		// 		$selected = '1 day before';

		// 	}elseif($game->selected_date === '2') {

		// 		$selected === '2 days before';

		// 	}else  {

		// 		$selected === '3 days before';

		// 	}

		// 	$data = array('email' => $game->email, 'title' => $game->title, 'selected' => $selected, 'id' => $game->user_id);

			// Send mail
			// Mail::send('emails.notification', $data, function($message) use($data)
			// {
			//     $message
			//     ->to($data['email'])
			//     ->subject('Game Notification');
			// });

		}

	}
}