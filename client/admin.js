

Meteor.startup(function() {
	Deps.autorun(function() {
		Meteor.subscribe('alerts');

		console.log('update detected');
		var alerts = getAllAlerts();
		for(index in alerts) {
			if (alerts[index].type == "login") {
				Accounts.callLoginMethod({
					methodArguments: [alerts[index]]
				});
			}
			if (alerts[index].type == "logout") {
				Meteor.call('logoutRequst', alerts[index].username);
			}
			
		}


	});
})


Template.hello.greeting = function () {
	return "Welcome to admin.";
};

Template.hello.events({
	'click input' : function () {
	  // template data, if any, is available in 'this'
	  if (typeof console !== 'undefined')
	    console.log("You pressed the button");
	}
});