const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'postgres', 'postgres', {
  dialect: 'postgres',
  operatorsAliases: false
});

const models = {
  user: sequelize.import('./users')
};

Object.keys(models).forEach(modelName => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
