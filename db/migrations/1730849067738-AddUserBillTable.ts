import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserBillTable1730849067738 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`user_bills\` (
        \`user_bill_id\` INT NOT NULL AUTO_INCREMENT,
        \`user_id\` INT NOT NULL,
        \`bill_id\` INT NOT NULL,
        \`debt\` INT NOT NULL,
        \`is_paid_off\` BOOLEAN NOT NULL,
        PRIMARY KEY (\`user_bill_id\`),
        CONSTRAINT \`FK_User_User_Bill\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\` (\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT \`FK_Bill_User_Bill\` FOREIGN KEY (\`bill_id\`) REFERENCES \`bills\` (\`bill_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
      ) ENGINE=InnoDB;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`user_bills\`;`);
  }
}
