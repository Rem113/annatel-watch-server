module.exports = (sequelize, Sequelize) =>
  sequelize.define(
    "Actions",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      watchId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      payload: {
        type: Sequelize.STRING,
        defaultValue: JSON.stringify({})
      }
    },
    {
      sequelize
    }
  );
