import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserEntity1696664962274 implements MigrationInterface {
  name = 'create_user_entity_1696664962274';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`mail\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`firstName\` varchar(255) NULL, \`lastName\` varchar(255) NULL, \`created_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_2e5b50f4b7c081eceea476ad12\` (\`mail\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_2e5b50f4b7c081eceea476ad12\` ON \`users\``,
    );
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}
