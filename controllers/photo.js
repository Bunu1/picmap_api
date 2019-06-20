const ModelIndex = require('../models');
const Photo = ModelIndex.Photo;
const Op = ModelIndex.Sequelize.Op;

const PhotoController = function() { };

PhotoController.add = function(description, link, coordinate_x, coordinate_y) {
  return Photo.create({
    description: description,
    link: link,
    coordinate_x: coordinate_x,
    coordinate_y: coordinate_y
  });
}

PhotoController.findAll = function(id, description, link, coordinate_x, coordinate_y, limit, offset) {
  const where = {};
	const options = {};
  
	if(id !== undefined){
		where.id = {
			[Op.like]: `${id}%`
		}
	}
	if(description !== undefined){
		where.description = {
			[Op.like]: `${description}%`
		}
	}
	if(link !== undefined){
		where.link = {
			[Op.like]: `${link}%`
		}
	}
	if(coordinate_x !== undefined){
		where.coordinate_x = {
			[Op.like]: `${coordinate_x}%`
		}
	}
	if(coordinate_y !== undefined){
		where.coordinate_y = {
			[Op.like]: `${coordinate_y}%`
		}
	}
    
	options.where = where;
	if(limit !== undefined){
		options.limit = limit;
	}
	if(offset !== undefined){
		options.offset = offset;
	}
  
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