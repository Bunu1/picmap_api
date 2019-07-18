module.exports = function (sequelize, DataTypes) {
    const Hashtag = sequelize.define('Hashtag', {
      id: {
        type: DataTypes.INTEGER,
      	primaryKey: true,
      	autoIncrement: true
      },
      hashtag: {
          type: DataTypes.STRING,
          allowNull: false
      },
      first_use: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
      }
    }, {
        paranoid: false,
        underscored: true,
        freezeTableName: true,
        timestamps: false
    });

    Hashtag.associate = _associate;
    return Hashtag;
}

// INTERNAL
function _associate(models) {

}
