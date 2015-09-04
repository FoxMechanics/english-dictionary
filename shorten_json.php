#!/usr/bin/env php
<?php
$files = scandir(__DIR__.'/files');

foreach ($files as $file) {
	
	if ($file == '..' || $file == '.') {
		continue;
	}

	$new_data = [];
	$path = __DIR__."/files/$file";
	$data = json_decode(file_get_contents($path), true);

	foreach ($data as $word) {

		$new_data[] = [
			'word' => $word['word'],
			'type' => $word['type'],
			'descr' => $word['descr'],
		];
	}

	file_put_contents($path, json_encode($new_data));
}