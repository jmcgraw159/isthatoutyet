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

			$month = $results['results']['expected_release_month'];
			$day = $results['results']['expected_release_day'];
			$year = $results['results']['expected_release_year'];

			// if($month === undefined) {
			// 	echo 'undefined';
			// }elseif($month === '') {
			// 	echo 'blank';
			// }else {
			// 	echo 'none';
			// }

			$dbMonth = strval($game->month);
			// echo $dbMonth;


			if(!$month) {

				$month = 'null';
			}

			if(!$day) {

				$day = 'null';
			}

			if(!$year) {

				$year = 'null';
			}

			if($dbMonth === $month) {

				// echo $content;
				echo $month . $day . $year;

			}else {

				echo 'False';

			}

		}

        $job->delete();
    }
}