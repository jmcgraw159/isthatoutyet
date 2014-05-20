<?php

class UpdateQueue{

    public function fire($job, $data){

    	// Select games
    	$getContent = UsersGames::select('*')
								->get();

		echo $getContent;

		$key = 'cdb456f4a15c4052a419f97b568218a2b50634c9';

		$format = 'json';

		foreach ($getContent as $game) {

			echo $game->game_id;

			$call = file_get_contents('http://www.giantbomb.com/api/game/' . $game->game_id . '/?api_key=' . $key . '&format='. $format);

			$response = json_decode($call);

			header('Access-Control-Allow-Origin: *');
			echo Response::json($response);

		}

        $job->delete();
    }
}