<?php

header('Access-Control-Allow-Origin: *');

class NotificationController extends BaseController {

	public static function sendNotification()
	{
		$date = date('m/d/y');

		echo $date;
	}
}