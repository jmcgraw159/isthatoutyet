<?php

class UpdateQueue{

    public function fire($job, $data){

    	// Select games
    	$getContent = UsersGames::select('*')
								->get();

		// echo $getContent;

		foreach ($getContent as $game) {

			$request = Request::create('get-game/' . $game->game_id, 'GET', array());
			$response = Route::dispatch($request);
			$content = $response->getContent();
			$results = json_decode($content, true);

			$formatedMonth = strval($results['results']['expected_release_month']);
			echo $formatedYear;
			$formatedDay = strval($results['results']['expected_release_day']);
			$formatedYear = strval($results['results']['expected_release_year']);

			if(!$formatedMonth) {

				$formatedMonth = 'null';
			}

			if(!$formatedDay) {

				$formatedDay = 'null';
			}

			if(!$formatedYear) {

				$formatedYear = 'null';
			}

			echo $formatedYear;


			if($game->month === $formatedMonth && $game->day === $formatedDay && $game->year === $formatedYear) {

				echo 'True: ' . $game->title;

			}else {

				echo 'False: ' . $game->title;

			}

		}

        $job->delete();
    }
}