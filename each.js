var http = require('http'),
	async = require('async');
	

	async.each([process.argv[2], process.argv[3]], function(url, toDisplay){
		var body = '';

		//use the url passed on as the second argument
		http.get(url, function(res){

			//while content is loading append it to the variable body
			res.on('data', function(data){
			
				body += data.toString();

			});
			res.on('end', function(){
				//do nothing
				
			});

		}).on('error', function(err){//check if there is an error
			toDisplay(err);// pass the error to the display function
		});

		function toDisplay(err){
			console.log(err);//display the error
		}
	});
