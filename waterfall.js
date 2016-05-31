var http = require('http'),
	async = require('async'),
	fs = require('fs');

async.waterfall([
	function toReadFile(toGetUrl){
		var content = '';

		//read the file provided at the command line
		fs.readFile(process.argv[2], 'utf8', function(err, data){

			//if things go wrong
			if (err) {
				
				return toGetUrl(err);
			}
			// if everything is okay call the next function with the data gotten from the file
			toGetUrl(null, data);

		});

	},
	function toGetUrl(url, toDisplay){
		var body = '';

		//use the data passed on as a url
		http.get(url, function(res){

			//while content is loading
			res.on('data', function(data){
			
				body += data.toString();

			});
			//when the content stops loading call the next function
			res.on('end', function(){
				toDisplay(null, body);
				
			});

		}).on('error', function(err){
			toDisplay(err);
		});
	},

	function toDisplay(err, content){
		//if there is an error
		if(err){
			return console.log(err);
		}
		//print out the contents at the url.
		console.log(content);
	}
	]);
