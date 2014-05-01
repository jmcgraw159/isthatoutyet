<?php

header('Access-Control-Allow-Origin: *');

class GiantBombController extends BaseController {

	public function getRecent($date)
	{
		header('Access-Control-Allow-Origin: *');
		return Response::json($date);
	}

	public function getGame($title)
	{

		$key = 'cdb456f4a15c4052a419f97b568218a2b50634c9';

		$format = 'json';

		$call = file_get_contents('http://www.giantbomb.com/api/search/?api_key=' . $key . '&format='. $format .'&resources=game&limit=10&query=' . $title);

		// angular.forEach(res.data.results, function(item){
		// 	game.push({name: item.name, id: item.id, image: item.image});
		// });

		header('Access-Control-Allow-Origin: *');
		return Response::json($call);
	}

}
