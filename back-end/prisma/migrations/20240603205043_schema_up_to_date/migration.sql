/*
  Warnings:

  - Made the column `category` on table `Program` required. This step will fail if there are existing NULL values in that column.
  - Made the column `type` on table `Program` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Program" ALTER COLUMN "category" SET NOT NULL,
ALTER COLUMN "type" SET NOT NULL;
