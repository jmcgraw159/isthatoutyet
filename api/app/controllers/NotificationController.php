<?php

header('Access-Control-Allow-Origin: *');

class NotificationController extends BaseController {

	public static function sendNotification()
	{
		// Get current date
		$month = date('mm');
		$day = date('d');
		$year = date('Y');

		echo $month;

		$count = UsersGames::where('month', '=', $month, 'and', 'day', '=', $day, 'and', 'year', '=', $year)
								->count();

		echo 'Count is ' . $count;
	}
}