module.exports = function (sequelize, DataTypes) {
    const Photo = sequelize.define('Photo', {
        id: {
			type: DataTypes.INTEGER,
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
      			type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true
    		},
        id_event: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true
        },
        deleted: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
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
    models.Photo.belongsTo(models.Event, { foreignKey: 'id_event', targetKey: 'id' });
}
