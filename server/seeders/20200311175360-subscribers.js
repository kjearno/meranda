module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "subscribers",
      [
        {
          email: "subscriber1@mail.com",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          email: "subscriber2@mail.com",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          email: "subscriber3@mail.com",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("subscribers", null, {});
  },
};
