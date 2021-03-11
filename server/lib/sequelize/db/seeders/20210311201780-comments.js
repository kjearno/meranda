module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "comments",
      [
        {
          text: "Wow!",
          user_id: 1,
          post_id: 11,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          text: "Awesome!",
          user_id: 1,
          post_id: 11,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          text: "Very interesting, thanks for posting!",
          user_id: 1,
          post_id: 9,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          text: "Amazing!",
          user_id: 1,
          post_id: 9,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          text: "I completely agree with everything written in the article.",
          user_id: 1,
          post_id: 9,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("comments", null, {});
  },
};
