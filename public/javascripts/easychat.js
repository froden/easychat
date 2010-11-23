(function($) {

  var app = $.sammy('#main', function() {
	this.use('Template');
	
    this.get('#/', function(context) {
	  this.load('messages', {dataType:'json'})
	  	.then(function(messages) {
	    	$.each(messages, function(i, message) {
				context.render('public/templates/message.template', {message: message}).appendTo(context.$element());
			});
		});
	});

  });

  $(function() {
    app.run('#/');
  });

})(jQuery);