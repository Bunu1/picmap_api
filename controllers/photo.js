const ModelIndex = require('../models');
const Photo = ModelIndex.Photo;
const Op = ModelIndex.Sequelize.Op;

const PhotoController = function() { };

PhotoController.add = function(description, link, coordinate_x, coordinate_y, id_user) {
  return Photo.create({
    description: description,
    link: link,
    coordinate_x: coordinate_x,
    coordinate_y: coordinate_y,
    id_user: id_user
  });
}

PhotoController.findAll = function(id, description, link, coordinate_x, coordinate_y, id_user, limit, offset) {
    const where = {};
	const options = {};
  
	if(id !== undefined){
		where.id = id;
	}
	if(description !== undefined){
		where.description = description;
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

PhotoController.remove = function(id) {
  return Photo.destroy({
    where: { 
      id: id
    }
  });
}

PhotoController.update = function(id, description, link, coordinate_x, coordinate_y) {
    return Photo.findOne({
        where: {
            id: id
        }
    })
    .then((photo) => {
        if(photo) {
            if(description === undefined) sudescriptionbject = photo.description;
            if(link === undefined) link = photo.link;
            if(coordinate_x === undefined) coordinate_x = photo.coordinate_x;
            if(coordinate_y === undefined) coordinate_y = photo.coordinate_y;
            return photo.update({
                description: description,
                link: link,
                coordinate_x: coordinate_x,
                coordinate_y: coordinate_y
            });
        }
    })
}

module.exports = PhotoController;