var http = require('http'),
	async = require('async');
	

	async.map([process.argv[2], process.argv[3]], function(url, toDisplay){
		var body = '';
		console.log("I've gotten this " + url);
		//use the url in the array
		http.get(url, function(res){

			//while content is loading append it to the variable body
			res.on('data', function(chunk){
				body += chunk.toString();
				console.log("and the body is " + body);

			});

			res.on('end', function(){
				toDisplay(null, body);
			});

		}).on('error', function(err){//check if there is an error
			toDisplay(err);// pass the error to the display function
		});

		function toDisplay(err, result){
			if (err){
				return console.log(err);//display the error
			}
			console.log(result);
			
		}
	});
