module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          email: 'asd23@mail.com',
          password:
            '$2a$12$qSrNtNu.DDH6ieXolQdBDOcECUypFzWWSN12WpdbzTqzRLBagqVBO',
          username: 'asd23',
          photo:
            'https://secure-retreat-39463.herokuapp.com/uploads/users/photos/1602375378354.jpg',
          is_active: true,
          is_admin: true,
          role_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          email: 'test@mail.com',
          password:
            '$2a$12$7umJkT9OxnO8QnG6nbESSuuY.obREkLuDAQE6.l3.25ehDCaJu1Ca',
          username: 'test',
          photo:
            'https://secure-retreat-39463.herokuapp.com/uploads/users/photos/1604951248680.jpg',
          is_active: true,
          is_admin: true,
          role_id: 2,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
