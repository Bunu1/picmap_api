const ModelIndex = require('../models');
const Friends = ModelIndex.Friends;
const User = ModelIndex.User;
const Op = ModelIndex.Sequelize.Op;

const FriendsController = function() { };

FriendsController.createFriends = function(id_user, id_friend) {
  return Friends.create({
      id_user: id_user,
      id_friend: id_friend
  });
}

FriendsController.findAll = function(id, id_user, id_friend, accepted) {
  const where = {};
  const options = {};

    if(id !== undefined){
        where.id = id
    }
    if(id_user !== undefined){
        where.id_user = id_user
    }
    if(id_friend !== undefined){
        where.id_friend = id_friend
    }
    if(accepted !== undefined){
        where.accepted = accepted
    }

    options.where = where;
    options.include = ['User']
    return Friends.findAll(options);
};

FriendsController.getFriendlist = function(id_user) {
    const options = {}

    const where = {
        [Op.or]: [
            {
                id_user: id_user
            },
            {
                id_friend: id_user
            }
        ],
        accepted: 1
    };

    options.where = where;
    return Friends.findAll(options);
}

FriendsController.getRequests = function(id_user) {
    const options = {}

    const where = {
        id_friend: id_user,
        accepted: 0
    };

    options.where = where;
    options.include = ['User']
    return Friends.findAll(options);
}

FriendsController.getStatus = function(id_user, id_friend) {
    const options = {}

    const where = {
        [Op.or]: [
            {
                id_user: id_user,
                id_friend: id_friend
            },
            {
                id_user: id_friend,
                id_friend: id_user
            }
        ],


    };

    options.where = where;
    return Friends.findOne(options);
}

FriendsController.findOne = function(id, id_user, id_friend, accepted) {
  const where = {};
  const options = {};

    if(id !== undefined){
        where.id = id
    }
    if(id_user !== undefined){
        where.id_user = id_user
    }
    if(id_friend !== undefined){
        where.id_friend = id_friend
    }
    if(accepted !== undefined){
        where.accepted = accepted
    }

    options.where = where;
    options.include = ['User']
    return Friends.findOne(options);
};

FriendsController.createFriend = function(id_user, id_friend) {
    return Friends.create({
        id_user: id_user,
        id_friend: id_friend
    });
}

FriendsController.update = function(id, id_user, id_friend, accepted) {
    return Friends.update({
        id_user: id_user,
        id_friend: id_friend,
        accepted: accepted
    }, {
        where: { id: id }
    });
}

FriendsController.remove = function(id) {
  return Friends.destroy({
    where: {
      id: id
    }
  });
}

module.exports = FriendsController
