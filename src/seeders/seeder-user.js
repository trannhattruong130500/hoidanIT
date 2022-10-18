'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'truongtran130500@gmail.com',
      password: '123456',
      firstName: 'tran',
      lastName: 'truong',
      address: 'HCM',
      phoneNumber: '01512181215',
      gender: '1',
      image: null,
      roleId: 'R1',
      positionId: 'doctor',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
