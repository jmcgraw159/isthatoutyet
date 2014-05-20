<?php

class UpdateController extends BaseController {

	public static function updateGames()
	{
		Queue::push('UpdateQueue', array());
	}
}