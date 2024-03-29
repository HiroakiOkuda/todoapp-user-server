import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialMigrations1711694554003 implements MigrationInterface {
  name = 'initialMigrations1711694554003';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`todos\` (\`todoId\` int NOT NULL, \`title\` varchar(50) NOT NULL, \`description\` varchar(10000) NOT NULL, \`status\` int UNSIGNED NOT NULL, \`due\` datetime NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`user_id\` int NULL, PRIMARY KEY (\`todoId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`userId\` int NOT NULL, \`username\` varchar(50) NOT NULL, \`email\` varchar(127) NOT NULL, \`password\` varchar(50) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`hashedRefreshToken\` varchar(255) NOT NULL, PRIMARY KEY (\`userId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`todos\` ADD CONSTRAINT \`FK_53511787e1f412d746c4bf223ff\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`todos\` DROP FOREIGN KEY \`FK_53511787e1f412d746c4bf223ff\``,
    );
    await queryRunner.query(`DROP TABLE \`users\``);
    await queryRunner.query(`DROP TABLE \`todos\``);
  }
}
