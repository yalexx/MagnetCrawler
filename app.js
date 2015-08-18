'use strict';

// Toorent sit magnit links crawler.
var Simplecrawler = require("simplecrawler"),
	fs = require("fs"),
	_ = require('underscore'),
	settings = require('./settings.json');

// Create crawler and apply settings
var crawler = new Simplecrawler(settings.sources[0], settings.initialPath, settings.initialPort);

crawler.initialProtocol = settings.initialProtocol;
crawler.interval = 100; // 10000 Ten seconds
crawler.maxConcurrency = 1;
crawler.maxDepth = 1; // (1) Only first page is fetched / (2) First page and discovered links from it are fetched

// First, you'll need to set up an event listener to get the fetched data:
crawler.on("fetchcomplete", function (queueItem, responseBuffer, response) {
	//console.log("I just received %s (%d bytes)", queueItem.url, responseBuffer.length);
	//console.log("It was a resource of type %s", response.headers['content-type']);

	// Do something with the data in responseBuffer
});

// Log system information
function consoleInfo(settings) {
	console.log("----------------------------------------");
	console.log(settings.sources[0] + "!!!!");
	console.log("----------------------------------------");
}

crawler.start();

// Report Status
console.info(settings);