<?php

class UpdateQueue{

    public function fire($job, $data){

    	// Select games
    	$getContent = UsersGames::select('*')
								->get();

		// echo $getContent;

		foreach ($getContent as $game) {

			echo $game->game_id;

			$request = Request::create('get-game/' . $game->game_id, 'GET', array());
			$response = Route::dispatch($request);
			$content = $response->getContent();

			echo $content.expected_release_month;

			// if($game->month === $content.expected_release_month) {
			// 	echo 'Test';
			// }


		}

        $job->delete();
    }
}