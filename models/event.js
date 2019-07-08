module.exports = function (sequelize, DataTypes) {
    const Photo = sequelize.define('Event', {
        id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        end_date: {
            type: DataTypes.DATE,
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
        range: {
            type: DataTypes.INTEGER,
            allowNull: false
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
    models.Event.hasMany(models.Photo, { foreignKey: "id_event", targetKey: "id" });
}