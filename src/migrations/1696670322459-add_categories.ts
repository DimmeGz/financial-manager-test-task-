import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCategories1696670322459 implements MigrationInterface {
  name = 'add_categories_1696670322459';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`created_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_aa79448dc3e959720ab4c13651\` (\`title\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_aa79448dc3e959720ab4c13651\` ON \`categories\``,
    );
    await queryRunner.query(`DROP TABLE \`categories\``);
  }
}
