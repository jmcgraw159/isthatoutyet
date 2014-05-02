<?php

class Users extends Eloquent {

	protected $table = "users";

	protected $fillable = array('email', 'confirmed');
}
