/*
  Warnings:

  - Added the required column `image` to the `Banner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Banner" ADD COLUMN     "image" TEXT NOT NULL;
