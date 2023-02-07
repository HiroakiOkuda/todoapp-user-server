import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewMigrations1675104045839 implements MigrationInterface {
  name = 'NewMigrations1675104045839';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`userId\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(50) NOT NULL, \`email\` varchar(127) NOT NULL, \`password\` varchar(50) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`userId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`todos\` (\`todoId\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(50) NOT NULL, \`description\` varchar(10000) NOT NULL, \`status\` int UNSIGNED NOT NULL, \`due\` datetime NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userUserId\` int NULL, PRIMARY KEY (\`todoId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`todos\` ADD CONSTRAINT \`FK_7123277117c4fe4268f3642656f\` FOREIGN KEY (\`userUserId\`) REFERENCES \`users\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`todos\` DROP FOREIGN KEY \`FK_7123277117c4fe4268f3642656f\``,
    );
    await queryRunner.query(`DROP TABLE \`todos\``);
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}
