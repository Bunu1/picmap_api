const ModelIndex = require('../models');
const Friends = ModelIndex.Friends;
const Op = ModelIndex.Sequelize.Op;

const FriendsController = function() { };

FriendsController.createFriends = function(id_user, id_friend) {
  return Friends.create({
      id_user: id_user,
      id_friend: id_friend
  });
}

FriendsController.findAll = function(id, id_user, id_friend) {
  const where = {};
  const options = {};
  
    if(id !== undefined){
        where.id = {
            [Op.like]: `${id}%`
        }
    }
    if(id_user !== undefined){
        where.id_user = {
            [Op.like]: `${id_user}%`
        }
    }
    if(id_friend !== undefined){
        where.id_friend = {
            [Op.like]: `${id_friend}%`
        }
    }
    
    options.where = where;
    options.include = ['User'];
    return Friends.findAll(options);
};

FriendsController.update = function(id, id_user, id_friend) {
    return Friends.update({
        id_user: id_user,
        id_friend: id_friend
    }, {
        where: { id: id }
    });
}

module.exports = FriendsController
