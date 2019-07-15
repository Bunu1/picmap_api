const ModelIndex = require('../models');
const User = ModelIndex.User;
const Photo = ModelIndex.Photo;
const Friends = ModelIndex.Friends;
const Op = ModelIndex.Sequelize.Op;

const UserController = function() { };

UserController.checkUsername = function(username) {
	return User.findOne({
		where: {
			username: username
		}
	})
}

UserController.createUser = function(firstname, lastname, username, email, password, admin) {
  return User.create({
		firstname: firstname,
		lastname: lastname,
    username: username,
    email: email,
    password: password,
    adimn: admin
  });
}

UserController.getFriendlist = function(id) {
    const where = {};
    const options = {};
    if(id !== undefined){
        where.id = id;
    }
    options.where = where;
    options.include = [
        {
            model: Friends,
            include: [User]
        }
    ];

    options.attributes = []
    return User.findOne(options);
}

UserController.findOne = function(id, firstname, lastname, username, email, date_insc, admin, active, enabled) {
    const where = {};
    const options = {};

    if(id !== undefined){
        where.id = id;
    }
    if(firstname !== undefined){
        where.firstname = firstname;
    }
		if(lastname !== undefined){
        where.lastname = lastname;
    }
		if(username !== undefined){
        where.username = username;
    }
    if(email !== undefined){
        where.email = email;
    }
    if(date_insc !== undefined){
        where.date_insc = date_insc;
    }
    if(admin !== undefined){
        where.admin = admin;
    }
    if(active !== undefined){
        where.active = active;
    }
    if(enabled !== undefined){
        where.enabled = enabled;
    }
    options.where = where;
    options.include = [{
        model: Photo,
        where: { "deleted": 0 },
        required: false
    }];
    return User.findOne(options);
}

UserController.findAll = function(id, firstname, lastname, username, email, date_insc, admin, active, enabled) {
  const where = {};
  const options = {};

    if(id !== undefined){
        where.id = id;
    }
    if(firstname !== undefined){
        where.firstname = firstname;
    }
		if(lastname !== undefined){
        where.lastname = lastname;
    }
		if(username !== undefined){
        where.username = username;
    }
    if(email !== undefined){
        where.email = email;
    }
    if(date_insc !== undefined){
        where.date_insc = date_insc;
    }
    if(admin !== undefined){
        where.admin = admin;
    }
    if(active !== undefined){
        where.active = active;
    }
    if(enabled !== undefined){
        where.enabled = enabled;
    }
    options.where = where;
    return User.findAll(options);
};

UserController.update = function(id, firstname, lastname, username, email, password, admin, active, enabled) {
    return User.update({
			firstname: firstname,
			lastname: lastname,
      username: username,
      email: email,
      admin: admin,
      active: active,
      enabled: enabled,
    }, {
        where: { id: id }
    });
}

module.exports = UserController
