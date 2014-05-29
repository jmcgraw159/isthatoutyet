<?php

class UpdateQueue{

    public function fire($job, $data){

    	// Get the games the users have selected
    	$getContent = UsersGames::select('*')
								->get();

		foreach ($getContent as $game) {

			// Call function from another controller
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

			// Check to see if value exists
			// If it doesn't, set it to null
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

				// Do nothing

			}else {

				// Update game info
				$updateGame = DB::table('users_games')
										->where('title', $game->title)
										->update(array(
										'month' => $formatedMonth,
										'day' => $formatedDay,
										'year' => $formatedYear));

			}

		}

        $job->delete();
    }
}