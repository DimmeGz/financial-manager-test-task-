import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPayments1696673886699 implements MigrationInterface {
  name = 'add_payments1696673886699';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`payments\` ADD \`userId\` int NULL`);
    await queryRunner.query(
      `ALTER TABLE \`payments\` ADD CONSTRAINT \`FK_d35cb3c13a18e1ea1705b2817b1\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`payments\` DROP FOREIGN KEY \`FK_d35cb3c13a18e1ea1705b2817b1\``,
    );
    await queryRunner.query(`ALTER TABLE \`payments\` DROP COLUMN \`userId\``);
  }
}
