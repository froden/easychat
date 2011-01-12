(function($) {

  var app = $.sammy('#main', function() {
	this.use('Template');
	
    this.get('#/', function(context) {
		context.pollMessages();
	});
	
	this.post('#/messages', function(context) {
		$('#messageform input#message').val("");
		var message = context.params['message'];
		context.log(message);
		$.ajax({
		  type: 'POST',
		  url: '/messages',
		  data: message
		});
	});
	
	this.helper('pollMessages', function() {
		var context = this;
		var last = $('#messages').children().last().attr("id") || 0;
		context.log("last " + last);
		context.load('messages', {cache: false, data: {last: last}, dataType:'json'}).then(function(messages) {
	    	$.each(messages, function(i, message) {
				context.render('public/templates/message.template', {message: message}).appendTo($('#messages'));
			});
		}).then(function(messages) {
			setTimeout(function() {
				context.pollMessages();
			}, 500);
		});
	});

  });

  $(function() {
    app.run('#/');
  });

})(jQuery);