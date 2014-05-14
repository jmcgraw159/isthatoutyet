<?php

header('Access-Control-Allow-Origin: *');

class NotificationController extends BaseController {

	public static function sendNotification()
	{

		Mail::send('emails.notification', array(), function($message)
		{
		    $message
		    ->to('jmcgraw159@gmail.com')
		    ->subject('Game Notification');
		});

		// Set timezone
		date_default_timezone_set('EST');

		// Get current date
		$month = date('n');
		$day = date('j');
		$year = date('Y');

		echo $month . $day . $year;

		// Select games that match the current date
		$getContent = UsersGames::where(DB::raw('day + selected_date'), '=', $day, 'and', 'month', '=', $month, 'and', 'year', '=', $year)
								->join('users', 'user_id', '=', 'users.id')
								->get();

		// If date is = current date
		foreach($getContent as $game) {

			if($game->selected_date === '0') {

				$selected = 'on the day';

			}elseif($game->selected_date === '1') {

				$selected = '1 day before';

			}elseif($game->selected_date === '2') {

				$selected === '2 days before';

			}else  {

				$selected === '3 days before';

			}

			$data = array('email' => $game->email, 'title' => $game->title, 'selected' => $selected);

			echo $data['email'];
			echo $data['title'];
			echo $data['selected'];

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