var http = require("http");
var GithubActivity = require('gh-activity');
var TwitterActivity = require('twitter-activity');

var config_github = require('../test/config.github');
var config_twitter = require('../test/config.twitter');

github = new GithubActivity(config_github);
twitter = new TwitterActivity(config_twitter);

var server = http.createServer(function (req, resp) {
    var route = req.url.replace(/^[\/]+|[\/]+$/g, '');

    function respond(code, body) {
        resp.writeHead(code, { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*"});
        resp.end(body);
    }
    function callback (err, data) {
        /* istanbul ignore else */
        if (!err) {
            respond(200, data);
        } else {
            respond(500, err)
        }
    }

    //var callback_tw = linkedCallback(al_twitter);

    if (route == 'github') {
        github.getActivity('jpcano', process.env.npm_package_config_ghCount, callback);
    }
    else if (route == 'twitter') {
        twitter.getActivity('RockingML', process.env.npm_package_config_twCount, callback);
    } else {
        respond(404, JSON.stringify({message:"Route not found"}));
    }
});

server.listen(process.env.npm_package_config_port);

// for testing
module.exports = server