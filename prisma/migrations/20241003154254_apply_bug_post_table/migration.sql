/*
  Warnings:

  - You are about to alter the column `subtitle` on the `blog_posts` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE `blog_posts` MODIFY `subtitle` VARCHAR(100) NULL;
