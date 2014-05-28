<?php

header('Access-Control-Allow-Origin: *');

class GiantBombController extends BaseController {

	public function getRecent($date)
	{
		$key = 'cdb456f4a15c4052a419f97b568218a2b50634c9';

		$format = 'json';

		$call = file_get_contents('http://www.giantbomb.com/api/games/?api_key=' . $key . '&format=' . $format .'&limit=20&field_list=name,image,id&sort=original_release_date%3Adesc&filter=original_release_date:1700-01-01|' . $date);

		$response = json_decode($call);

		header('Access-Control-Allow-Origin: *');
		return Response::json($response);

	}

	public function getGames($title)
	{
		$count = Games::where('title', 'LIKE', '%' . $title . '%')
								->count();

		if($count === 0) {
			$key = 'cdb456f4a15c4052a419f97b568218a2b50634c9';

			$format = 'json';

			$call = file_get_contents('http://www.giantbomb.com/api/search/?api_key=' . $key . '&format='. $format .'&resources=game&limit=10&field_list=image,name,deck,platforms,id,expected_release_month,expected_release_day,expected_release_year,original_release_date&query=' . $title);

			$response = json_decode($call, true);

			foreach ($response->results as $item) {
				echo $item;
			}

			// $insertGame = Games::insert(array(
			// 	'game_id' => $game_id,
			// 	'title' => $game_title,
			// 	'image' => $game_image));

			// header('Access-Control-Allow-Origin: *');
			// return Response::json($response);
		}else  {

			$getGame = Games::where('title', 'LIKE', '%' . $title . '%')
								->get();

			return $getGame;
		}
	}

	public function getGame($id)
	{

		$key = 'cdb456f4a15c4052a419f97b568218a2b50634c9';

		$format = 'json';

		$call = file_get_contents('http://www.giantbomb.com/api/game/' . $id . '?api_key=' . $key . '&format='. $format . '&field_list=image,name,deck,platforms,id,expected_release_month,expected_release_day,expected_release_year,original_release_date');

		$response = json_decode($call);

		header('Access-Control-Allow-Origin: *');
		return Response::json($response);
	}

}