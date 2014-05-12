<?php

header('Access-Control-Allow-Origin: *');

class NotificationController extends BaseController {

	public static function sendNotification()
	{
		// Get current date
		$month = date('n');
		$day = date('j');
		$year = date('Y');

		echo $month . $day . $year;

		$getContent = UsersGames::where('month', '=', $month, 'and', 'day', '+', 'selected_date', '=', $day, 'and', 'year', '=', $year)
								->get();

		foreach($getContent as $test) {
			echo $test->title;
		}

	}
}