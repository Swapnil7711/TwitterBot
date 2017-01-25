console.log("bot is starting");

var Twit = require('twit');

var config = require('./config.js');
// console.log(config);
var T = new Twit(config);


// Get Tweets

// var param = { q: 'trump', count: 50 }

// T.get('search/tweets',param , gotData);

// function gotData(err, data, response) {
//   var x = data.statuses;
//   for(var i=0;i< x.length;i++){
//   console.log(x[i].text);
// }
// }

// Post Tweets whoever follow me

 var stream = T.stream('user')

stream.on('follow',followed);

console.log("config is completed");

function followed(event) {
	console.log("started");
 	var name = event.source.name;
 	var screenName= event.source.screen_name;
 	console.log(screenName);
	tweetToTwitter('@'+screenName+" Hey "+name+" Thank you for following me.!!!");
}

// Bot that replies

stream.on('tweet',replyTweet);

function replyTweet(event) {
		
		// var fs = require('fs');
		// var json = JSON.stringify(event,null,2);
		// fs.writeFile("tweet.json",json);

	var replyTo = event.in_reply_to_screen_name;
	console.log(replyTo);
	var from    = event.user.screen_name;				
	var fName   =event.user.name;
	if(replyTo==="swapnil0400"){
	tweetToTwitter('@'+from+" Hey "+fName+" Thank you for tweeting");
	}
}

function tweetToTwitter(text){		

console.log(text);						
var statusToPost = {

	status: text
}

T.post('statuses/update',statusToPost, postTweet);				//post

function postTweet(err, data, response) {						// call back function
 	if(err){
 		console.log("something is not working");
 	} else{
  		console.log("Posted to twitter");
		}
	}
}	

