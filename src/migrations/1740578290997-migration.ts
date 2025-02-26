import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1740578290997 implements MigrationInterface {
    name = 'Migration1740578290997'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`bookings\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdBy\` json NULL, \`updatedBy\` json NULL, \`deletedBy\` json NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`booking_time\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`status\` enum ('pending', 'confirmed', 'canceled') NOT NULL DEFAULT 'pending', \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`bookings\` ADD CONSTRAINT \`FK_38a69a58a323647f2e75eb994de\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bookings\` DROP FOREIGN KEY \`FK_38a69a58a323647f2e75eb994de\``);
        await queryRunner.query(`DROP TABLE \`bookings\``);

    }

}
