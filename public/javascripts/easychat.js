(function($) {

  var app = $.sammy('#main', function() {
	this.use('Template');
	
    this.get('#/', function(context) {
		this.load('messages', {dataType:'json'}).then(function(messages) {
	    	$.each(messages, function(i, message) {
				context.render('public/templates/message.template', {message: message}).appendTo($('#messages'));
			});
		});
	});
	
	this.post('#/messages', function(context) {
		var message = context.params['message'];
		context.log(message);
		var text = context.render('public/templates/message.template', {message: {body: message}}).then(function(html) {
			$(html).hide().fadeIn('slow').appendTo('#messages');
		});
	});

  });

  $(function() {
    app.run('#/');
  });

})(jQuery);