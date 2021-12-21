import { MigrationInterface, QueryRunner } from "typeorm";

export class createUser1640127785147 implements MigrationInterface {
  name = 'createUser1640127785147'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."users_pronouns_enum" AS ENUM('0', '1', '2', '3', '4', '5', '6')`);
    await queryRunner.query(`CREATE TYPE "public"."users_gender_enum" AS ENUM('0', '1', '2')`);
    await queryRunner.query(`CREATE TABLE "users" ("id" character varying NOT NULL, "name" character varying NOT NULL, "surname" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "profile_img" character varying NOT NULL, "byography" character varying(150) NOT NULL, "pronouns" "public"."users_pronouns_enum" NOT NULL, "site" character varying NOT NULL, "gender" "public"."users_gender_enum" NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_gender_enum"`);
    await queryRunner.query(`DROP TYPE "public"."users_pronouns_enum"`);
  }

}
