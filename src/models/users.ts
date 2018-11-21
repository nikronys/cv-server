export default (sequelize, DataTypes) => {
const User = sequelize.define('user', {
  firstName: {
    type: DataTypes.STRING
  },
  lastName: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
});
return User;
// force: true will drop the table if it already exists
/*User.sync({ force: true }).then(() => {
  // Table created
  return User.create({
    firstName: 'John',
    lastName: 'Hancock',
    email: '1213@tut.by'
  });
});*/
};