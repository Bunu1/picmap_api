const ModelIndex = require('../models');
const Hashtag = ModelIndex.Hashtag;
const Op = ModelIndex.Sequelize.Op;

const HashtagController = function() { };

HashtagController.findAll = function(id, hashtag, first_use, count, limit, offset) {
  const where = {};
	const options = {};

	if(id !== undefined){
		where.id = id;
	}
	if(hashtag !== undefined){
		where.hashtag = hashtag;
	}
	if(first_use !== undefined){
		where.first_use = first_use;
	}
	if(count !== undefined){
		where.count = count;
  }
	if(limit !== undefined){
		options.limit = limit;
	}
	if(offset !== undefined){
		options.offset = offset;
	}

  options.where = where;
  return Hashtag.findAll(options);
}

HashtagController.findOne = function(id, hashtag, first_use, count, limit, offset) {
  const where = {};
	const options = {};

	if(id !== undefined){
		where.id = id;
	}
	if(hashtag !== undefined){
		where.hashtag = hashtag;
	}
	if(first_use !== undefined){
		where.first_use = first_use;
	}
	if(count !== undefined){
		where.count = count;
  }
	if(limit !== undefined){
		options.limit = limit;
	}
	if(offset !== undefined){
		options.offset = offset;
	}

  options.where = where;
  return Hashtag.findOne(options);
}

HashtagController.add = function(hashtag, first_use, count) {
  return Hashtag.create({
    hashtag: hashtag,
    first_use: first_use,
    count: count
  });
}

HashtagController.update = function(id, hashtag, first_use, count) {
  return Hashtag.update({
    hashtag: hashtag,
    first_use: first_use,
    count: count
  }, {
    where: { id: id }
  });
}

HashtagController.delete = function(id) {
  return Hashtag.destroy({
    where: {
      id: id
    }
  });
}
module.exports = HashtagController;
