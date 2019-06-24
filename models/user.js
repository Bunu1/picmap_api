module.exports = function (sequelize, DataTypes) {
	const User = sequelize.define('User', {
		id: {
            type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true
		},
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date_insc: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        admin: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 0
        },
        active: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 0
        },
        enabled: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 1
        }
    }, {
        paranoid: false,
        underscored: true,
        freezeTableName: true,
        timestamps: false
    });
    
	User.associate = _associate;
	return User;
}

// INTERNAL
function _associate(models) {
    models.User.hasMany(models.Friends, {foreignKey: 'id_user', targetKey: 'id'});
	models.User.hasMany(models.Friends, {foreignKey: 'id_friend', targetKey: 'id'});
    
    models.User.hasMany(models.Photo, {foreignKey: "id_user", targetKey: "id"});
}