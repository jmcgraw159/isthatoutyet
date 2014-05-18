<?php

class NotificationController extends BaseController {

	public static function sendNotification()
	{
		Queue::push('Myapp\Queue\MyQueue', array());
	}
}