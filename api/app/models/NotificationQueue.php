<?php

class NotificationQueue{

    public function fire($job, $data){

    	// Set timezone
		date_default_timezone_set('EST');

		// Get current date
		$month = date('n');
		$day = date('j');
		$year = date('Y');

		// Select games that match the current date
		$getContent = UsersGames::where('month', '=', $month)
								->where(DB::raw('day - selected_date'), '=', $day)
								->where('year', '=', $year)
								->join('users', 'user_id', '=', 'users.id')
								->get();

		// If date is = current date
		foreach($getContent as $game) {

			// Condition to update content based on day selected
			if($game->selected_date === '0') {

				$selected = 'Is out today!';

			}elseif($game->selected_date === '1') {

				$selected = 'Will be out tomorrow!';

			}elseif($game->selected_date === '2'){

				$selected = 'Will be out in 2 days!';

			}else  {

				$selected = 'Will be out in 3 days!';
			}

			// If the email has been confirmed
			if($game->confirmed === '1') {

				echo $game;

				// Info to send to Mandrill API
				$data = array('email' => $game->email, 'title' => $game->title, 'selected' => $selected, 'id' => $game->user_id);

				//Send mail
				Mail::send('emails.notification', $data, function($message) use($data)
				{
				    $message
				    ->to($data['email'])
				    ->subject('Game Notification');
				});
			}
		}

        $job->delete();
    }
}