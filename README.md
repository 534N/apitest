apitest
=======

Exploring project that combines Meteor authentication customization and CRUD collection api

The end goal is to be able to create/change Meteor user account upon RESTful request. 

This is particularly useful for people who runs a solution on multiple platforms, i.e. Meteor + RoR, Meteor + Laravel, etc... 

Use the following sample request to log a user in, if the user does not exist, it'll create one.

<code>
curl -H "X-Auth-Token: 97f0ad9e24ca5e0408a269748d7fe0a0" -d "{\"username\": \"test\", \"password\": \"test\"}" http://localhost:3000/collectionapi/users
</code>
