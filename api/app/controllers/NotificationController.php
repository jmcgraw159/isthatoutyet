<?php

header('Access-Control-Allow-Origin: *');

class NotificationController extends BaseController {

	public static function sendNotification()
	{
		// Get current date
		$date = date('mdY');

		echo $date;

		$count = UsersGames::where(UsersGames::raw('concat(month,day,year)'), '=', $date)
								->count();

		echo $count;
	}
}