<?php

class MyQueue{

    public function fire($job, $data){

    	echo 'Test';

        $job->delete();
    }
}