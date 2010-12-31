(function($) {

  var app = $.sammy('#main', function() {
	this.use('Template');
	
    this.get('#/', function(context) {
		context.startPolling();
	});
	
	this.post('#/messages', function(context) {
		$('#messageform input#message').val("");
		var message = context.params['message'];
		context.log(message);
		var text = context.render('public/templates/message.template', {message: {body: message}}).then(function(html) {
			$(html).hide().fadeIn('slow').appendTo('#messages');
		});
		$.ajax({
		  type: 'POST',
		  url: '/messages',
		  data: message
		});
	});
	
	this.helper('startPolling', function() {
		var context = this;
		context.load('messages', {dataType:'json'}).then(function(messages) {
	    	$.each(messages, function(i, message) {
				context.render('public/templates/message.template', {message: message}).appendTo($('#messages'));
			});
		});
	});

  });

  $(function() {
    app.run('#/');
  });

})(jQuery);