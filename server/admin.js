// Users = new Meteor.Collection('players');
// Users = Meteor.users;
// Alerts = new Meteor.Collection('alerts');
Meteor.publish('alerts', function() {
  return alerts.find({
    _id: this._id
  });
});


Meteor.startup(function () {

  collectionApi = new CollectionAPI({ authToken: '97f0ad9e24ca5e0408a269748d7fe0a0' });
  collectionApi.addCollection(alerts, 'users');
  collectionApi.start();

});


Meteor.methods({
  test: function(options) {
    return Meteor.http.get('http://sandbox.nearest.com/rest/login/admin/tigris');
    // , function(error, result) {
      // readCookie('95428f8462d2476c71093e231557e77b');
      // console.log(result)
    // });
  },
  logoutRequst: function(username) {
    console.log(username)
    return Meteor.users.update(
      {username: username}, 
      {$set: {"services.resume.loginTokens": []}}
    )
  }
});



// ====================================================================== 
// ACCOUNTING HANDLER
// ====================================================================== 

Accounts.registerLoginHandler(function(loginRequest) {
  var userId    = null;
  var username  = loginRequest.username;
  // WILL NEED TO PERFORM MORE MD5 HASHING HERE
  var password  = loginRequest.password;

  var user = Meteor.users.findOne({
    $and: [
      {username: username},
      {password: password} 
    ]
  });
  if(!user) {
    userId = Meteor.users.insert({username: username, password: password});
  } else {
    userId = user._id;
  }

  //creating the token and adding to the user
  var stampedToken = Accounts._generateStampedLoginToken();
  Meteor.users.update(userId, 
    {$push: {'services.resume.loginTokens': stampedToken}}
  );

  //sending token along with the userId
  return {
    id: userId,
    token: stampedToken.token
  }
});