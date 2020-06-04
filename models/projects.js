'use strict';
module.exports = (sequelize, DataTypes) => {
  const projects = sequelize.define('projects', {
    name: DataTypes.STRING
  }, {});
  projects.associate = function(models) {
    // associations can be defined here
  };
  return projects;
};