Template.test.events ({
	'click .toggle': function(e, tempalte) {
		Meteor.call('test', function(error, result) {
			console.log(result);
			if (result) {

				var ss = result.content.split('"');
				console.log(ss);

				var session = ss[11];
				console.log('Received session value: ' + session);
				var cookie_info = result.headers['set-cookie'][0];
				console.log('Found cookie info: ' + cookie_info);
				var ca = cookie_info.split(';');
				var cookie_name_value_pair = ca[0].split('=');
				var cookie_name = cookie_name_value_pair[0];
				createCookie(cookie_name, session, 1);

			} else {
				console.log('ERROR: ' + error)
			}
		});
	}
})

function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}