const ModelIndex = require('../models');
const Photo = ModelIndex.Photo;
const Op = ModelIndex.Sequelize.Op;

const PhotoController = function() { };

PhotoController.count = function() {
  return Photo.count();
}

PhotoController.findAll = function(id, description, link, coordinate_x, coordinate_y, id_user, id_event, deleted, limit, offset) {
    const where = {};
	const options = {};

	if(id !== undefined){
		where.id = id;
	}
	if(description !== undefined){
		where.description = {
			[Op.like]: "%"+description+"%"
		};
	}
	if(link !== undefined){
		where.link = link;
	}
	if(coordinate_x !== undefined){
		where.coordinate_x = coordinate_x;
	}
	if(coordinate_y !== undefined){
		where.coordinate_y = coordinate_y;
	}
    if(id_user !== undefined){
		where.id_user = id_user;
	}
    if(id_event !== undefined){
		where.id_event = id_event;
	}
    if(deleted !== undefined){
		where.deleted = deleted;
	}

	options.where = where;
	if(limit !== undefined){
		options.limit = limit;
	}
	if(offset !== undefined){
		options.offset = offset;
	}

    options.include = ['User']
  return Photo.findAll(options);
}

PhotoController.add = function(description, link, coordinate_x, coordinate_y, id_user, id_event, deleted) {
  return Photo.create({
    description: description,
    link: link,
    coordinate_x: coordinate_x,
    coordinate_y: coordinate_y,
    id_user: id_user,
    id_event: id_event,
    deleted: deleted
  });
}

PhotoController.delete = function(id) {
  return Photo.destroy({
    where: {
      id: id
    }
  });
}

PhotoController.update = function(id, description, link, coordinate_x, coordinate_y, id_user, id_event, deleted) {
    return Photo.update({
        description: description,
        link: link,
        coordinate_x: coordinate_x,
        coordinate_y: coordinate_y,
        id_user: id_user,
        id_event: id_event,
        deleted: deleted
    }, {
        where: { id: id }
    });
}

module.exports = PhotoController;
