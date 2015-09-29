Makes a "bing!" sound when you run it.

An alternative to `process.stdout.write('\x07')` (the [bell](//en.wikipedia.org/wiki/Bell_character)); *machine-that-goes-bing* uses regular speakers.

Use it to notify users that something has gone wrong if they might not be paying attention.


## Install

	npm install --save dum-build/machine-that-goes-bing

This uses [node-speaker](https://github.com/TooTallNate/node-speaker#installation), so see that if you have trouble installing.


## Run

	require('machine-that-goes-bing')()
	// If your speakers are turned on, you should hear a "bing!"