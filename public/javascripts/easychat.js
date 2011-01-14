(function($) {

  var app = $.sammy('#main', function() {
	this.use('Template');
	
    this.get('#/', function(context) {
		context.pollMessages();
	});
	
	this.post('#/messages', function(context) {
		$('#messageform input#message').val("");
		$.post('/messages', context.params.message);
	});
	
	this.helper('pollMessages', function() {
		var context = this,
		    last = $('#messages').children().last().attr("id") || 0;
		context.load('messages', {cache: false, data: {last: last}, dataType:'json'}).then(function(messages) {
	    	$.each(messages, function(i, message) {
				context.render('public/templates/message.template', {message: message}).appendTo($('#messages'));
			});
		}).then(function(messages) {
			setTimeout(function() {
				context.pollMessages();
			}, 2000);
		});
	});

  });

  $(function() {
    app.run('#/');
  });

})(jQuery);