<?php

header('Access-Control-Allow-Origin: *');

class NotificationController extends BaseController {

	public static function sendNotification()
	{
		// Get current date
		$date = date('mdY');

		echo $date;

		$count = UsersGames::where('contact(month,day,year', '=', $date)
								->count();
	}
}