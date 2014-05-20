<?php

class UpdateQueue{

    public function fire($job, $data){

    	echo 'Test';

        $job->delete();
    }
}