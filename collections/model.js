alerts	= new Meteor.Collection('alerts');

alerts.allow({
	insert: function(username, password) {
		return false;
	},
	update: function(userId, username, password) {
		return true;
	},
	remove: function(userId) {
		return true;
	}
});

clearRecord =  function(id) {
	return alerts.remove({_id: id});
}

getAllAlerts = function() {
	var updates = [];
	var alertRecords = alerts.find();
	alertRecords.forEach(function(rec) {
		updates.push(rec);
		clearRecord(rec._id);
	})
	
	return updates;
}