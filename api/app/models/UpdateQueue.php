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
			echo $month;
			$day = $results['results']['expected_release_day'];
			echo $day;
			$year = $results['results']['expected_release_year'];
			echo $year;

			// if($month === undefined) {
			// 	echo 'undefined';
			// }elseif($month === '') {
			// 	echo 'blank';
			// }else {
			// 	echo 'none';
			// }

			if(!$month) {

				$month = 'null';
			}

			if(!$day) {

				$day = 'null';
			}

			if(!$year) {

				$year = 'null';
			}

			if($game->month === $month && $game->day === $day && $game->year === $year) {

				echo 'True';

			}else {

				echo 'False';

			}

		}

        $job->delete();
    }
}