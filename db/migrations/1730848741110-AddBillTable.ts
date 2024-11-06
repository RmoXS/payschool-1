import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBillTable1730848741110 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`bills\` (
        \`bill_id\` INT NOT NULL AUTO_INCREMENT,
        \`name\` VARCHAR(32) NOT NULL,
        \`amount\` INT NOT NULL,
        \`target\` VARCHAR(16) NOT NULL,
        \`deadline\` DATE NOT NULL,
        PRIMARY KEY (\`bill_id\`)
      ) ENGINE=InnoDB;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`bills\`;`);
  }
}
