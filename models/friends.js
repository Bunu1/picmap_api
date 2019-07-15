module.exports = function (sequelize, DataTypes) {
    const Friends = sequelize.define('Friends', {
        id: {
            type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true
        },
        id_friend: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        accepted: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        paranoid: false,
        underscored: true,
        freezeTableName: true,
        timestamps: false
    });

    Friends.associate = _associate;
    return Friends;
}

// INTERNAL
function _associate(models) {
	models.Friends.belongsTo(models.User, {foreignKey: 'id_user', targetKey: 'id'});
	models.Friends.belongsTo(models.User, {foreignKey: 'id_friend', targetKey: 'id'});
}