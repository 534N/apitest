

Meteor.loginAsAdmin = function(password, callback) {
  
  var loginRequest = {admin: true, password: password};

  Accounts.callLoginMethod({
    methodArguments: [loginRequest],
    userCallback: callback
  });
};

Meteor.startup(function() {
	Deps.autorun(function() {
		Meteor.subscribe('alerts');

		console.log('update detected');
		var alerts = getAllAlerts();
		for(index in alerts) {
			Accounts.callLoginMethod({
				methodArguments: [alerts[index]]
			});
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