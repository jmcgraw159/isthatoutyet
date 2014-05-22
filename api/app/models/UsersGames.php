<?php

class UsersGames extends Eloquent {

	protected $table = "users_games";

	protected $fillable = array('user_id', 'title', 'month', 'day', 'year', 'game_id', 'selected_date', 'game_cover');
}