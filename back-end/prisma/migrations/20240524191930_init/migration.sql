/*
  Warnings:

  - Added the required column `duration` to the `Program` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Channel" ALTER COLUMN "hidden" SET DEFAULT true,
ALTER COLUMN "status" SET DEFAULT true;

-- AlterTable
ALTER TABLE "Program" ADD COLUMN     "duration" TEXT NOT NULL,
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;
