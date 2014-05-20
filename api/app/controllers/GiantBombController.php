<?php

header('Access-Control-Allow-Origin: *');

class GiantBombController extends BaseController {

	public function getRecent($date)
	{
		$key = 'cdb456f4a15c4052a419f97b568218a2b50634c9';

		$format = 'json';

		$call = file_get_contents('http://www.giantbomb.com/api/games/?api_key=' . $key . '&format=' . $format .'&limit=5&sort=original_release_date%3Adesc&filter=original_release_date:1700-01-01|' . $date);

		$response = json_decode($call);

		header('Access-Control-Allow-Origin: *');
		return Response::json($response);

	}

	public function getGame($title)
	{

		$key = 'cdb456f4a15c4052a419f97b568218a2b50634c9';

		$format = 'json';

		$call = file_get_contents('http://www.giantbomb.com/api/search/?api_key=' . $key . '&format='. $format .'&resources=game&limit=10&query=' . $title);

		$response = json_decode($call);

		header('Access-Control-Allow-Origin: *');
		return Response::json($response);
	}

	public function updateGame($id)
	{

		$key = 'cdb456f4a15c4052a419f97b568218a2b50634c9';

		$format = 'json';

		$call = file_get_contents('http://www.giantbomb.com/api/game/' . $id . '?api_key=' . $key . '&format='. $format);

		$response = json_decode($call);

		header('Access-Control-Allow-Origin: *');
		return Response::json($response);
	}

}