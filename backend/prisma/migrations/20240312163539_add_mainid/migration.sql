-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "mainId" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Banner" (
    "id" SERIAL NOT NULL,
    "mainId" INTEGER NOT NULL,
    "bannerId" INTEGER NOT NULL,

    CONSTRAINT "Banner_pkey" PRIMARY KEY ("id")
);
