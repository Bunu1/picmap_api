module.exports = function (sequelize, DataTypes) {
    const Friends = sequelize.define('Friends', {
        id: {
            type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true
		},
        id_user: {
            type: DataTypes.BIGINT,
            allowNull: false,
            foreignKey: true
        },
        id_friend: {
          type: DataTypes.BIGINT,
          allowNull: false
        },
        accepted: {
            type: DataTypes.BIGINT,
            defaultValue: 0,
            foreignKey: true
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