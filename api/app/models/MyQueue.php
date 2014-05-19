<?php

class MyQueue{

    public function fire($job, $data){

    	// Set timezone
		date_default_timezone_set('EST');

		// Get current date
		$month = date('n');
		$day = date('j');
		$year = date('Y');

		// echo $month . $day . $year;

		// Select games that match the current date
		$getContent = UsersGames::where('month', '=', $month)
								->where(DB::raw('day - selected_date'), '=', $day)
								->where('year', '=', $year)
								->join('users', 'user_id', '=', 'users.id')
								->get();

		// If date is = current date
		foreach($getContent as $game) {

			if($game->selected_date === '1') {

				$selected = '1 day before';
				echo $selected;

			}elseif($game->selected_date === '2') {

				$selected = '2 days before';
				echo $selected;

			}elseif($game->selected_date === '3')  {

				$selected = '3 days before';
				echo 3;

			}else {

				$selected = 'on the day'
				echo $selected;

			}





			// if($game->selected_date === 0) {

			// 	$selected = 'on the day';
			// 	echo $selected

			// }elseif($game->selected_date === 1) {

			// 	$selected = '1 day before';
			// 	echo $selected;

			// }else  {

			// 	$selected === '3 days before';
			// 	echo $selected;
			// }

			// If the email has been confirmed
			if($game->confirmed === '1') {

				// echo $game;

				// Info to send to Mandrill API
				// $data = array('email' => $game->email, 'title' => $game->title, 'selected' => $selected, 'id' => $game->user_id);

				// Send mail
				// Mail::send('emails.notification', $data, function($message) use($data)
				// {
				//     $message
				//     ->to($data['email'])
				//     ->subject('Game Notification');
				// });
			}
		}

        $job->delete();
    }
}