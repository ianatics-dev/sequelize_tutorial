'use strict';
const {
  Model, UUID
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post }) {
      // define association here
      this.hasMany(Post, {foreignKey: 'userId', as: 'posts'})
    }
    toJSON(){
      return { ...this.get(), id: undefined}
    }
  };
  user.init({
    uuid:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate:{
        notNull: {msg: "bawal null ang name"},
        notEmpty: {msg: "bawal empty ang name"},
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate:{
        notNull: true,
        notEmpty: true,
        isEmail: {msg: "taronga ang email"}
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate:{
        notNull: true,
        notEmpty: true,
      }
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};