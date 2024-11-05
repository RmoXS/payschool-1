import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserTable1729670742685 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            CREATE TABLE \`users\` (
                \`user_id\` varchar(36),
                \`role\` char(5),
                \`name\` varchar(255),
                \`email\` varchar(255),
                \`password\` varchar(255),
                \`class_origin_id\` int,
                PRIMARY KEY(\`user_id\`),
                FOREIGN KEY(\`class_origin_id\`) REFERENCES \`class_origins\` (\`class_origin_id\`),
                KEY \`FK1\` (\`class_origin_id\`)
            );
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE users;`);
  }
}
