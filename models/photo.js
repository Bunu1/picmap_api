module.exports = function (sequelize, DataTypes) {
    const Photo = sequelize.define('Photo', {
        id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true
		},
        description: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        link: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        coordinate_x: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        coordinate_y: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        id_user: {
			type: DataTypes.BIGINT,
            allowNull: false,
            foreignKey: true
		},
    }, {
        paranoid: false,
        underscored: true,
        freezeTableName: true,
        timestamps: false
    });

    Photo.associate = _associate;
    return Photo;
}

// INTERNAL
function _associate(models) {
    models.Photo.belongsTo(models.User, { foreignKey: 'id_user', targetKey: 'id' });
}