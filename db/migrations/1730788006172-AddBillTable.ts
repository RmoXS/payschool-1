import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBillTable1730788006172 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            CREATE TABLE \`bills\`(
                \`bill_id\` int,
                \`name\` varchar(255),
                \`amount\` int,
                \`deadline\` date,
                PRIMARY KEY(\`bill_id\`)
            );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE bills;`);
  }
}
