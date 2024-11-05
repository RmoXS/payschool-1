import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddClassOriginTable1729669446916 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            CREATE TABLE \`class_origins\`(
                \`class_origin_id\` int,
                \`grade\` int,
                \`major\` varchar(255),
                \`sub_class\` int,
                PRIMARY KEY(\`class_origin_id\`)
            );
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE class_origins;`);
  }
}
