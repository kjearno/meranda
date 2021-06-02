module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          email: "admin@mail.com",
          password:
            "$2a$12$B78b4Ri9Gm2qLOH6nDqiJ.lEtiLQwe8qAgMbH0eo4LaQjesWw4sju",
          username: "admin",
          photo: "/uploads/users/photos/1604951248680.jpg",
          is_active: true,
          role_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
