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

			$formatedMonth = strval($month);
			$formatedDay = strval($day);
			$formatedYear = strval($year);

			if(!$month) {

				$formatedMonth = 'null';
			}

			if(!$day) {

				$formatedDay = 'null';
			}

			if(!$year) {

				$formatedYear = 'null';
			}

			if($game->month === $formatedMonth && $game->day === $formatedDay && $game->year === $formatedYear) {

				// echo 'Same: ' . $game->title;

			}else {

				echo 'Need to update: ' . $game->title;

				// $updateGame = UsersGames::where('title', '=', $game->title)
				// 						->update(array(
				// 						'user_id' => $game->user_id,
				// 						'title' => $game->title,
				// 						'month' => $formatedMonth,
				// 						'day' => $formatedDay,
				// 						'year' => $formatedYear,
				// 						'game_id' => $game->game_id,
				// 						'selected_date' => $game->selected_date));

			}

		}

        $job->delete();
    }
}