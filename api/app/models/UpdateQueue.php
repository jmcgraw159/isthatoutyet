<?php

class UpdateQueue{

    public function fire($job, $data){

    	// Select games
    	$getContent = UsersGames::select('*')
								->get();

		// echo $getContent;

		foreach ($getContent as $game) {

			echo $game->game_id;

			$request = Request::create('get-game/45577', 'GET', array());
			$response = Route::dispatch($request);
			$content = $response->getContent();
			$results = json_decode($content);

			echo $results;

		}

        $job->delete();
    }
}