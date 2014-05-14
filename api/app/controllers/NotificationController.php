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
		$getContent = DB::select('select * from users_games where month = ? and day + selected_date = ? and year = ?'), array($month, $day, $year);

		// If date is = current date
		foreach($getContent as $game) {

			echo $game;

			if($game->selected_date === '0') {

				$selected = 'on the day';

			}elseif($game->selected_date === '1') {

				$selected = '1 day before';

			}elseif($game->selected_date === '2') {

				$selected === '2 days before';

			}else  {

				$selected === '3 days before';

			}

			$data = array('email' => $game->email, 'title' => $game->title, 'selected' => $selected, 'id' => $game->user_id);

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