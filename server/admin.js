// Users = new Meteor.Collection('players');
Users = Meteor.users;


Meteor.startup(function () {

  collectionApi = new CollectionAPI({ authToken: '97f0ad9e24ca5e0408a269748d7fe0a0' });
  collectionApi.addCollection(Users, 'users');
  collectionApi.start();

});

Accounts.registerLoginHandler(function(loginRequest) {
  if(!loginRequest.admin) {
    return undefined;
  }

  if(loginRequest.password != 'admin-password') {
    return null;
  }
  
  var userId = null;
  var user = Meteor.users.findOne({username: 'admin'});
  if(!user) {
    userId = Meteor.users.insert({username: 'admin'});
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