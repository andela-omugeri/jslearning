var http = require('http'),
	async = require('async');
	var thearray = [];
	

	async.map([process.argv[2], process.argv[3]], function(url, done){
		var body = '';
		//use the url in the array
		http.get(url, function(res){

			//while content is loading append it to the variable body
			res.on('data', function(chunk){
				body += chunk.toString();

				
			});

			res.on('end', function(){
				
				 done(null,body);
				 //	console.log(thearray);
			});
			
		 })
		 }, function(err, result){
		 	if (err){
		 		console.log(err);//display the error
		 	}
		 	console.log(result);

		}); 