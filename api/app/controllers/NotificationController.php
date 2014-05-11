<?php

header('Access-Control-Allow-Origin: *');

class NotificationController extends BaseController {

	public static function sendNotification()
	{
		// Get current date
		$month = date('m');
		$day = date('d');
		$year = date('Y');

		echo $month . $day . $year;

		$count = UsersGames::where('month', '=', $month, 'and', 'day', '=', $day, 'and', 'year', '=', $year)
								->count();

		echo $count;
	}
}