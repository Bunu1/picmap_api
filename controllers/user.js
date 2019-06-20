const ModelIndex = require('../models');
const User = ModelIndex.User;
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

UserController.createUser = function(username, email, password, admin) {
  return User.create({
      username: username,
      email: email,
      password: password,
      adimn: admin
  });
}

UserController.findAll = function(id, username, email, date_insc, admin, active, enabled) {
  const where = {};
  const options = {};
  
    if(id !== undefined){
        where.id = {
            [Op.like]: `${id}%`
        }
    }
    if(username !== undefined){
        where.username = {
            [Op.like]: `${username}%`
        }
    }
    if(email !== undefined){
        where.email = {
            [Op.like]: `${email}%`
        }
    }
    if(date_insc !== undefined){
        where.date_insc = {
            [Op.like]: `${date_insc}%`
        }
    }
    if(admin !== undefined){
        where.admin = {
            [Op.like]: `${admin}%`
        }
    }
    if(active !== undefined){
        where.active = {
            [Op.like]: `${active}%`
        }
    }
    if(enabled !== undefined){
        where.enabled = {
            [Op.like]: `${enabled}%`
        }
    }
    options.where = where;
    return User.findAll(options);
};

UserController.update = function(id, username, email, password, admin, active, enabled) {
  /*return User.findOne({where: {id: id}})
  .then((User) => {
    if(User) {
      if(username === undefined) username = User.username;
      if(admin === undefined) admin = User.admin;
      if(enabled === undefined) enabled = User.enabled;
      return User.updateAttributes({
        username: username,
        admin: admin,
        enabled: enabled
      });
    }
  })*/
    return User.update({
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
