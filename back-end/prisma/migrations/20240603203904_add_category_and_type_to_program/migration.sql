-- Add new columns with default values
ALTER TABLE "Program" ADD COLUMN "category" TEXT DEFAULT 'Uncategorized';
ALTER TABLE "Program" ADD COLUMN "type" TEXT DEFAULT 'Undefined';

-- Update the existing rows to use the new default values
UPDATE "Program" SET "category" = 'Uncategorized' WHERE "category" IS NULL;
UPDATE "Program" SET "type" = 'Undefined' WHERE "type" IS NULL;

-- Alter the columns to remove the default values if desired
ALTER TABLE "Program" ALTER COLUMN "category" DROP DEFAULT;
ALTER TABLE "Program" ALTER COLUMN "type" DROP DEFAULT;
