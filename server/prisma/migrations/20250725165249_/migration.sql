/*
  Warnings:

  - You are about to drop the column `userId` on the `pizzas` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `pizzas` DROP FOREIGN KEY `pizzas_userId_fkey`;

-- DropIndex
DROP INDEX `pizzas_userId_fkey` ON `pizzas`;

-- AlterTable
ALTER TABLE `pizzas` DROP COLUMN `userId`;
