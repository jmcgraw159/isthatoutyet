<?php

class NotificationController extends BaseController {

	public static function sendNotification()
	{
		Queue::push('NotificationQueue', array());
	}
}