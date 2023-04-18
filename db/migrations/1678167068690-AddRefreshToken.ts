import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRefreshToken1678167068690 implements MigrationInterface {
  name = 'AddRefreshToken1678167068690';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`hashedRefreshToken\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP COLUMN \`hashedRefreshToken\``,
    );
  }
}
