import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakePaymentDescriptionNullable1696676116691
  implements MigrationInterface
{
  name = 'make_payment_description_nullable1696676116691';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`payments\` CHANGE \`description\` \`description\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`payments\` CHANGE \`description\` \`description\` varchar(255) NOT NULL`,
    );
  }
}
