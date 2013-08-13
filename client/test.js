Template.test.events ({
	'click .toggle': function(e, tempalte) {
		Meteor.call('test', function(error, result) {
			console.log(result);
		});
	}
})