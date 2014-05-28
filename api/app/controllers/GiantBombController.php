<?php

header('Access-Control-Allow-Origin: *');

class GiantBombController extends BaseController {

	public function getRecent($date)
	{
		$key = 'cdb456f4a15c4052a419f97b568218a2b50634c9';

		$format = 'json';

		$call = file_get_contents('http://www.giantbomb.com/api/games/?api_key=' . $key . '&format=' . $format .'&limit=20&field_list=name,image,id&sort=original_release_date%3Adesc&filter=platforms:86,145,18,19,35,88,116,146,52,117,138,36,87,139,94,17,original_release_date:1700-01-01|' . $date);

		$response = json_decode($call);

		header('Access-Control-Allow-Origin: *');
		return Response::json($response);

	}

	public function getGame($title)
	{
		$count = Games::where('title', '=', $title)
								->count();

		if($count === 0) {
			$key = 'cdb456f4a15c4052a419f97b568218a2b50634c9';

			$format = 'json';

			$call = file_get_contents('http://www.giantbomb.com/api/search/?api_key=' . $key . '&format='. $format .'&resources=game&limit=10&field_list=image,name,deck,platforms,id,expected_release_month,expected_release_day,expected_release_year,original_release_date&query=' . $title);

			$response = json_decode($call);

			header('Access-Control-Allow-Origin: *');
			return Response::json($response);
		}else  {

			$getGame = Games::select('title', 'LIKE', '%'.$title.'%')

			return $getGame;

			// $selectGame = $getGame->first();

			// $gameTitle = $selectGame->title;
			// $gameId = $selectGame->game_id;
			// $gameImage = $selectGame->image;

			// return array('count' => $count, 'title' => $gameTitle, 'id' => $gameId, 'image' => $gameImage);
		}

	}

	public function updateGame($id)
	{

		$key = 'cdb456f4a15c4052a419f97b568218a2b50634c9';

		$format = 'json';

		$call = file_get_contents('http://www.giantbomb.com/api/game/' . $id . '?api_key=' . $key . '&format='. $format . '&field_list=expected_release_day,expected_release_month,expected_release_year');

		$response = json_decode($call);

		header('Access-Control-Allow-Origin: *');
		return Response::json($response);
	}

}