import { MigrationInterface, QueryRunner } from 'typeorm';

export class Currency1637668755510 implements MigrationInterface {
  name = 'Currency1637668755510';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`trip\` (\`id\` int NOT NULL AUTO_INCREMENT, \`busLicenceNumber\` varchar(255) NOT NULL, \`origin\` varchar(255) NOT NULL, \`destination\` varchar(255) NOT NULL, \`date\` timestamp NOT NULL, \`fare\` double NOT NULL, \`capacity\` int NOT NULL, \`bookedSeats\` text NOT NULL, \`image\` varchar(255) NOT NULL, \`images\` text NOT NULL, \`createdOn\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedOn\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NOT NULL, \`currencyId\` int NOT NULL, UNIQUE INDEX \`IDX_e77f0d7dab6a015cdcf8a05b12\` (\`busLicenceNumber\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`booking\` (\`id\` int NOT NULL AUTO_INCREMENT, \`seatNumber\` int NOT NULL, \`createdOn\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedOn\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NOT NULL, \`tripId\` int NOT NULL, UNIQUE INDEX \`IDX_2e55730fe22f26fed560063320\` (\`seatNumber\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS \`payment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdOn\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedOn\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NOT NULL, \`tripId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS \`trip\` ADD CONSTRAINT \`FK_f89812be41bd7d29f98d43445ee\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS \`trip\` ADD CONSTRAINT \`FK_65e9c595329c0a3a1b9f75eb926\` FOREIGN KEY (\`currencyId\`) REFERENCES \`currency\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS \`booking\` ADD CONSTRAINT \`FK_336b3f4a235460dc93645fbf222\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS \`booking\` ADD CONSTRAINT \`FK_0b077a08d53cfe075a04ea31d7a\` FOREIGN KEY (\`tripId\`) REFERENCES \`trip\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS \`payment\` ADD CONSTRAINT \`FK_b046318e0b341a7f72110b75857\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE IF EXISTS \`payment\` ADD CONSTRAINT \`FK_ce672d31850809f6ba7da26451f\` FOREIGN KEY (\`tripId\`) REFERENCES \`trip\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE IF EXISTS \`payment\` DROP FOREIGN KEY \`FK_ce672d31850809f6ba7da26451f\``);
    await queryRunner.query(`ALTER TABLE IF EXISTS \`payment\` DROP FOREIGN KEY \`FK_b046318e0b341a7f72110b75857\``);
    await queryRunner.query(`ALTER TABLE IF EXISTS \`booking\` DROP FOREIGN KEY \`FK_0b077a08d53cfe075a04ea31d7a\``);
    await queryRunner.query(`ALTER TABLE IF EXISTS \`booking\` DROP FOREIGN KEY \`FK_336b3f4a235460dc93645fbf222\``);
    await queryRunner.query(`ALTER TABLE IF EXISTS \`trip\` DROP FOREIGN KEY \`FK_65e9c595329c0a3a1b9f75eb926\``);
    await queryRunner.query(`ALTER TABLE IF EXISTS \`trip\` DROP FOREIGN KEY \`FK_f89812be41bd7d29f98d43445ee\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`payment\``);
    await queryRunner.query(`DROP INDEX IF EXISTS \`IDX_2e55730fe22f26fed560063320\` ON \`booking\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`booking\``);
    await queryRunner.query(`DROP INDEX IF EXISTS \`IDX_e77f0d7dab6a015cdcf8a05b12\` ON \`trip\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`trip\``);
  }
}
