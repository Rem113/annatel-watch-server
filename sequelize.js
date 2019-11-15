const Sequelize = require("sequelize");
const ActionModel = require("./models/Action");

const sequelize = new Sequelize(
  "mysql://root:gabhil@88.218.220.20:3306/Annatel"
);

const Action = ActionModel(sequelize, Sequelize);

sequelize.sync({ force: true }).then(() => console.log("Database created"));
