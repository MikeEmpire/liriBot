var Twitter = require('twitter');
var spotify = require('spotify');
var fs = require('file-system');
var request = require('request');
var keys = require('./keys.js');
var outputTweet;


var params = {
    screen_name: 'iMikeOlie',
    count: 20
};

var liri = {
    "show-my-tweets": function() {
        var client = new Twitter(keys);
        client.get('statuses/user_timeline', params, function(error, data, response) {
            if (!error) {
                console.log(' ');
                console.log('================ My Tweets ================');
                for (i = 0; i < count.length; i++) {
                    outputTweet = ('\n' + '@' + params.screen_name + ' said ' + tweets[t].txtsCmd + ' at ' + tweets[t].created_at + '\n');
                    console.log(outputTweet);
                }
            } else {
                console.log(error);
            }
        });
    },
    "spotify-this": function(keyword) {
        spotify.search({ type: 'track', query: keyword }, function(err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }

            if (data.tracks.items.length > 0) {
                var record = data.tracks.items[0];

                console.log(' ');
                console.log('================ Song Info ================');
                console.log('Artist: ' + record.artists[0].name);
                console.log('Name: ' + record.name);
                console.log('Link: ' + record.preview_url);
                console.log('Album: ' + record.album.name);
                console.log('===========================================');
                console.log(' ');
            } else {
                console.log('No song data found.');
            }



        });

    },
    "movie-this": function(query) {
        request('http://www.omdbapi.com/?t=' + (query || 'Mr.Nobody') + '&tomatoes=true', function(error, response, info) {
            if (!error && response.statusCode == 200) {

                var movieData = JSON.parse(info);

                console.log(' ');
                console.log('================ Movie Info ================');
                console.log('Title: ' + movieData.Title);
                console.log('Year: ' + movieData.Year);
                console.log('IMDB Rating: ' + movieData.imdbRating);
                console.log('Country: ' + movieData.Country);
                console.log('Language: ' + movieData.Language);
                console.log('Plot: ' + movieData.Plot);
                console.log('Actors: ' + movieData.Actors);
                console.log('Rotten Tomatoes Rating: ' + movieData.tomatoRating);
                console.log('Rotten Tomatoes URL: ' + movieData.tomatoURL);
                console.log('===========================================');
                console.log(' ');
            }
        });
    },
    "do-this": function() {
        fs.readFile('random.txt', 'utf8', function(err, data) {
            if (err) throw err;
            console.log(data.toString());

            var txtsCmd = data.toString().split(',');

            liri[txtsCmd[0].trim()](txtsCmd[1].trim());
        });
    }
};
liri[process.argv[2]](process.argv[3]);