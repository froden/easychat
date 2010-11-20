(function($) {

  var app = $.sammy('#main', function() {
	this.use('Template');
	
    this.get('#/', function(context) {
	  this.load('messages', {dataType:'json'})
	      .then(function(messages) {
	          $.each(messages, function(i, message) {
	            context.log(message.body);
				$("#main").append(message.body)
	          });
	      });
	});

  });

  $(function() {
    app.run('#/');
  });

})(jQuery);