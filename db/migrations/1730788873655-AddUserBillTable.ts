import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserBillTable1730788873655 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            CREATE TABLE \`user_bills\` (
                \`user_bill_id\` varchar(36),
                \`user_id\` varchar(36),
                \`bill_id\` int,
                \`debt\` int,
                \`is_paid_off\` boolean,
                PRIMARY KEY(\`user_bill_id\`),
                FOREIGN KEY(\`user_id\`) REFERENCES \`users\` (\`user_id\`),
                FOREIGN KEY(\`bill_id\`) REFERENCES \`bills\` (\`bill_id\`),
                KEY \`FK1\` (\`user_id\`),
                KEY \`FK2\` (\`bill_id\`)
            );
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query('DROP TABLE user_bills');
  }
}
