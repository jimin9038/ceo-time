/*
  Warnings:

  - You are about to drop the `ArticleCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ArticleCategory" DROP CONSTRAINT "ArticleCategory_articleId_fkey";

-- DropForeignKey
ALTER TABLE "ArticleCategory" DROP CONSTRAINT "ArticleCategory_categoryId_fkey";

-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "category" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "ArticleCategory";

-- DropTable
DROP TABLE "Category";
