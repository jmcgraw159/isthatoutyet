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

		echo $month . $day . $year;

		// Select games that match the current date
		$getContent = UsersGames::where('month', '=', $month, 'and', DB::raw('day + selected_date'), '=', $day, 'and', 'year', '=', $year)
								->get();

		foreach($getContent as $game) {

			echo $game->title;

		}

	}
}