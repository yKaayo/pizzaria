/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `pizzas` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `pizzas_name_key` ON `pizzas`(`name`);
