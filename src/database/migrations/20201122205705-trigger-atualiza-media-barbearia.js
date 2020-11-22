'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query("CREATE OR REPLACE FUNCTION atualizar_review() RETURNS TRIGGER AS \
      $$ \
      BEGIN \
        UPDATE public.\"Barbearia\" \
          SET media = (SELECT AVG(nota) FROM \"Avaliacao\" WHERE \"idBarbearia\" = new.\"idBarbearia\") \
          WHERE id = new.\"idBarbearia\";	\
          RETURN NEW; \
      END; \
      $$ LANGUAGE plpgsql;"
    );
    await queryInterface.sequelize.query("CREATE TRIGGER atualiza_media \
      AFTER INSERT OR UPDATE OF nota ON \"Avaliacao\" \
      FOR EACH ROW \
      EXECUTE PROCEDURE atualizar_review();"
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query("DROP TRIGGER atualiza_media ON \"Avaliacao\"");
    await queryInterface.sequelize.query("DROP FUNCTION IF EXISTS atualizar_review();");
  }
};
