-- CreateTable
CREATE TABLE `images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `path` VARCHAR(191) NOT NULL,
    `pizzaId` INTEGER NOT NULL,

    UNIQUE INDEX `images_path_key`(`path`),
    UNIQUE INDEX `images_pizzaId_key`(`pizzaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `images` ADD CONSTRAINT `images_pizzaId_fkey` FOREIGN KEY (`pizzaId`) REFERENCES `pizzas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
