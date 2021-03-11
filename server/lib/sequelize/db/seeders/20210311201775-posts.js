module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "posts",
      [
        {
          title: "Lorem ipsum dolor sit amet",
          slug: "lorem-ipsum-dolor-sit-amet",
          text:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt dolor dolorem architecto vitae tempora rem quod a, excepturi animi aperiam itaque iste quidem nulla sed laborum quia eligendi aliquam nostrum deleniti officia molestiae tenetur necessitatibus. Nobis illum, voluptate vero iure atque id maiores repellendus. Soluta nulla minus dolore autem maiores illum id, amet voluptate natus voluptates nihil nesciunt animi laudantium repellat beatae minima qui, tenetur excepturi praesentium? Non cum consequuntur, architecto dolorum earum vitae quis aspernatur odio, aliquam, libero quod quaerat tempore. Corrupti assumenda distinctio ipsam perspiciatis iure laborum voluptates fuga magni sed eius ratione deleniti a accusantium, dignissimos illo!",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt dolor dolorem architecto vitae tempora rem quod a, excepturi animi aperiam itaque iste quidem...",
          photo:
            "https://secure-retreat-39463.herokuapp.com/uploads/posts/photos/1594069171319.jpg",
          thumbnail:
            "https://secure-retreat-39463.herokuapp.com/uploads/posts/photos/1594069171319-mini.jpg",
          is_attached: true,
          user_id: 1,
          category_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: "Lorem ipsum, dolor sit amet consectetur adipisicing",
          slug: "lorem-ipsum-dolor-sit-amet-consectetur-adipisicing",
          text:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis eum pariatur ipsam accusamus. Nihil sit, provident sequi facilis pariatur ipsa, cupiditate repudiandae praesentium vitae, dolore assumenda? Sed asperiores inventore vitae. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat iusto dolor odio consequuntur necessitatibus totam culpa vitae iste rerum, quasi quas, mollitia id earum consequatur aperiam dolorem maxime et? Odio alias, quidem natus, ipsa non labore, quibusdam repellendus laudantium reiciendis nam recusandae iure sunt necessitatibus ex facilis animi dolore mollitia.",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis eum pariatur ipsam accusamus. Nihil sit, provident sequi facilis pariatur ipsa, cupiditate repudi...",
          photo:
            "https://secure-retreat-39463.herokuapp.com/uploads/posts/photos/1594069267189.jpg",
          thumbnail:
            "https://secure-retreat-39463.herokuapp.com/uploads/posts/photos/1594069267189-mini.jpg",
          is_attached: true,
          user_id: 1,
          category_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: "Lorem ipsum dolor sit amet",
          slug: "lorem-ipsum-dolor-sit-amet-1",
          text:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi reiciendis sit provident aperiam rem sequi laboriosam a aut voluptatum ut ipsa, tempora excepturi, autem illum tempore facilis consequatur cupiditate deserunt eius quis quaerat at. Explicabo eum architecto maxime quos, quas accusantium quis adipisci? Dolorem, laborum. Dolorum, nostrum fuga quasi facilis provident, sunt explicabo cum porro in adipisci totam ab quia quae doloribus. Quo, alias. Et corporis adipisci pariatur provident officiis.",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi reiciendis sit provident aperiam rem sequi laboriosam a aut voluptatum ut ipsa, tempora exceptu...",
          photo:
            "https://secure-retreat-39463.herokuapp.com/uploads/posts/photos/1594071399057.jpg",
          thumbnail:
            "https://secure-retreat-39463.herokuapp.com/uploads/posts/photos/1594071399057-mini.jpg",
          is_attached: false,
          user_id: 1,
          category_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: "Lorem ipsum dolor, sit amet consectetur adipisicing elit",
          slug: "lorem-ipsum-dolor-sit-amet-consectetur-adipisicing-elit",
          text:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis expedita laboriosam architecto nesciunt distinctio pariatur harum sapiente atque consequuntur necessitatibus vitae rem veritatis natus dicta et veniam omnis quo quisquam sed, modi optio temporibus quis porro est? Ipsa eius, officiis corrupti atque molestiae, praesentium iusto eos, totam nisi facilis rem tempore repellendus temporibus maiores inventore molestias esse quibusdam saepe! Id blanditiis pariatur facere dolores perferendis natus quo voluptates, repellendus ad quas ea quae placeat nobis, ex amet vero explicabo cumque sequi excepturi dolor praesentium. Cum ipsa vel earum exercitationem placeat.",
          description:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis expedita laboriosam architecto nesciunt distinctio pariatur harum sapiente atque consequunt...",
          photo:
            "https://secure-retreat-39463.herokuapp.com/uploads/posts/photos/1594071381211.jpg",
          thumbnail:
            "https://secure-retreat-39463.herokuapp.com/uploads/posts/photos/1594071381211-mini.jpg",
          is_attached: false,
          user_id: 1,
          category_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: "Lorem ipsum dolor sit amet consectetur",
          slug: "lorem-ipsum-dolor-sit-amet-consectetur",
          text:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus architecto mollitia deserunt eaque? Voluptatibus iure blanditiis consequuntur sed vel sapiente quos ipsum cupiditate aut laborum est eos maxime quam amet sunt repudiandae, dignissimos eligendi odio eius debitis accusamus alias. Quos sed, delectus aliquid ab, molestias corporis ratione enim adipisci mollitia corrupti veniam saepe eligendi reiciendis officiis minus deserunt. A, rem expedita. Tenetur quam officiis deserunt nemo, beatae minima provident quae.",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus architecto mollitia deserunt eaque? Voluptatibus iure blanditiis consequuntur sed vel sapien...",
          photo:
            "https://secure-retreat-39463.herokuapp.com/uploads/posts/photos/1594071013670.jpg",
          thumbnail:
            "https://secure-retreat-39463.herokuapp.com/uploads/posts/photos/1594071013670-mini.jpg",
          is_attached: false,
          user_id: 1,
          category_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: "Lorem ipsum dolor sit amet consectetur",
          slug: "lorem-ipsum-dolor-sit-amet-consectetur-1",
          text:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem et placeat necessitatibus fugiat officia ab quisquam debitis, at ipsum excepturi libero iusto illo reiciendis, ex dignissimos dolor cupiditate repudiandae laboriosam laudantium, ut odio! Blanditiis nostrum voluptatum autem aperiam laudantium ipsa, aspernatur ratione necessitatibus reprehenderit corrupti ipsum, pariatur ab rerum illum amet itaque nesciunt? Aliquam est cum vel aspernatur ipsam. Quos!",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem et placeat necessitatibus fugiat officia ab quisquam debitis, at ipsum excepturi libero...",
          photo:
            "https://secure-retreat-39463.herokuapp.com/uploads/posts/photos/1594070996666.jpg",
          thumbnail:
            "https://secure-retreat-39463.herokuapp.com/uploads/posts/photos/1594070996666-mini.jpg",
          is_attached: false,
          user_id: 1,
          category_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus, quas",
          slug:
            "lorem-ipsum-dolor-sit-amet-consectetur-adipisicing-elit-possimus-quas",
          text:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat ut distinctio est fuga maiores reprehenderit, amet facere impedit eum itaque odit possimus consequuntur veniam eaque molestias reiciendis, quod laboriosam? Nulla voluptates perspiciatis, placeat enim quam eveniet vero harum laudantium, natus sint quibusdam? Maiores nesciunt tenetur voluptas molestias odio delectus, accusamus recusandae? Et cupiditate mollitia ea explicabo sunt a pariatur totam ab magni error molestias, quas quam doloremque accusantium aliquam modi?",
          description:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat ut distinctio est fuga maiores reprehenderit, amet facere impedit eum itaque odit possimus co...",
          photo:
            "https://secure-retreat-39463.herokuapp.com/uploads/posts/photos/1594070974968.jpg",
          thumbnail:
            "https://secure-retreat-39463.herokuapp.com/uploads/posts/photos/1594070974968-mini.jpg",
          is_attached: false,
          user_id: 1,
          category_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: "Lorem ipsum dolor sit amet consectetur adipisicing",
          slug: "lorem-ipsum-dolor-sit-amet-consectetur-adipisicing-1",
          text:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur aliquam reiciendis illo nostrum fugit dolor mollitia soluta. Harum, similique obcaecati corrupti alias modi, eligendi maiores animi accusamus commodi repellendus libero saepe neque vel quidem sit. Cum, ab similique sunt facilis ratione consequatur aperiam maiores. Facilis, a. Accusantium velit deserunt quas magnam nemo et eos cupiditate voluptates at inventore quibusdam nulla assumenda aspernatur est soluta, veritatis error temporibus fugit rerum dolores facilis dolore! Nemo magnam voluptate voluptatem enim eius. Ad, omnis.",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur aliquam reiciendis illo nostrum fugit dolor mollitia soluta. Harum, similique obcaecati co...",
          photo:
            "https://secure-retreat-39463.herokuapp.com/uploads/posts/photos/1594070168788.jpg",
          thumbnail:
            "https://secure-retreat-39463.herokuapp.com/uploads/posts/photos/1594070168788-mini.jpg",
          is_attached: false,
          user_id: 1,
          category_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
          slug: "lorem-ipsum-dolor-sit-amet-consectetur-adipisicing-elit-1",
          text:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum vel rerum aperiam ad dolore excepturi et eveniet, ducimus magnam, facere blanditiis adipisci inventore iure quae? Adipisci cum repellendus corrupti excepturi veniam at, impedit quaerat reiciendis blanditiis vel, eaque pariatur distinctio explicabo quae inventore quia perferendis doloremque natus eum magni, architecto est? Veritatis nostrum facilis mollitia expedita vel amet soluta, laudantium et tempora assumenda dignissimos exercitationem ullam inventore magnam illo natus?",
          description:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum vel rerum aperiam ad dolore excepturi et eveniet, ducimus magnam, facere blanditiis adipisci inv...",
          photo:
            "https://secure-retreat-39463.herokuapp.com/uploads/posts/photos/1594071146117.jpg",
          thumbnail:
            "https://secure-retreat-39463.herokuapp.com/uploads/posts/photos/1594071146117-mini.jpg",
          is_attached: true,
          user_id: 1,
          category_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: "Lorem ipsum dolor sit amet consectetur",
          slug: "lorem-ipsum-dolor-sit-amet-consectetur-2",
          text:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur deleniti nobis quidem dicta cupiditate repellat, quaerat ab nostrum sit consequatur, ad itaque perferendis! Nemo, maxime. Provident sequi iste beatae officia enim pariatur expedita odit sapiente ea amet! Reiciendis tempore accusantium provident fugit qui consequuntur cumque quia unde, delectus laudantium possimus voluptatem obcaecati veniam non impedit perferendis aspernatur laboriosam sed? Maxime.",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur deleniti nobis quidem dicta cupiditate repellat, quaerat ab nostrum sit consequatur, ad itaque...",
          photo:
            "https://secure-retreat-39463.herokuapp.com/uploads/posts/photos/1594071168736.jpg",
          thumbnail:
            "https://secure-retreat-39463.herokuapp.com/uploads/posts/photos/1594071168736-mini.jpg",
          is_attached: false,
          user_id: 1,
          category_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: "Lorem ipsum dolor sit amet consectetur adipisicing",
          slug: "lorem-ipsum-dolor-sit-amet-consectetur-adipisicing-2",
          text:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi iusto corrupti omnis incidunt. Eum obcaecati ullam officia corporis, reiciendis mollitia atque, doloremque, harum cum ut quibusdam illo dolorem nulla amet voluptatem eveniet impedit itaque eligendi! Quibusdam fugiat dolor odio praesentium cum dignissimos expedita voluptatem id! Architecto omnis cumque, temporibus minus dolores facere quasi illum, a optio ex dignissimos libero tenetur.",
          description:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi iusto corrupti omnis incidunt. Eum obcaecati ullam officia corporis, reiciendis mollitia atque,...",
          photo:
            "https://secure-retreat-39463.herokuapp.com/uploads/posts/photos/1594071232210.jpg",
          thumbnail:
            "https://secure-retreat-39463.herokuapp.com/uploads/posts/photos/1594071232210-mini.jpg",
          is_attached: false,
          user_id: 1,
          category_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("posts", null, {});
  },
};
