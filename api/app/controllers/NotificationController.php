<?php

header('Access-Control-Allow-Origin: *');

class NotificationController extends BaseController {

	public static function sendNotification()
	{
		// Get current date
		$date = date('mdY');

		$count = UsersGames::where('concat(month,day,year)', '=', $date)
								->count();

		echo $count;
	}
}