var http = require('http');
var async = require('async');
async.series({	
	requestOne: function(toDisplay){
		var body = '';

		//use the url passed on as the first argument
		http.get(process.argv[2], function(res){

			//while content is loading
			res.on('data', function(data){
			
				body += data.toString();

			});
			
			res.on('end', function(){
				//pass it to the callback function
				toDisplay(null, body);
				
			});

		}).on('error', function(err){
			toDisplay(err);
		});
	},
	requestTwo: function(toDisplay){
		var body = '';

		//use the url passed on as the second argument
		http.get(process.argv[3], function(res){

			//while content is loading
			res.on('data', function(data){
			
				body += data.toString();

			});
			res.on('end', function(){
				//pass it to the callback function
				toDisplay(null, body);
				
			});

		}).on('error', function(err){
			toDisplay(err);
		});
	}
	}, function toDisplay(err, results){
		console.log(results);
	})