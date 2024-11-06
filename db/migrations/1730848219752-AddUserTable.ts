import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserTable1730848219752 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`users\` (
        \`user_id\` INT NOT NULL AUTO_INCREMENT,
        \`role\` CHAR(5) NOT NULL,
        \`name\` VARCHAR(32) NOT NULL,
        \`nis\` VARCHAR(16) NOT NULL,
        \`email\` VARCHAR(32) NOT NULL,
        \`class_origin\` VARCHAR(8) NOT NULL,
        \`password\` VARCHAR(255) NOT NULL,
        PRIMARY KEY (\`user_id\`),
        UNIQUE KEY \`UQ_users_nis\` (\`nis\`),
        UNIQUE KEY \`UQ_users_email\` (\`email\`)
      ) ENGINE=InnoDB;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`users\`;`);
  }
}
