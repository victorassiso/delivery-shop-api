/*
  Warnings:

  - You are about to drop the column `costPrice` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `retailPrice` on the `products` table. All the data in the column will be lost.
  - Added the required column `price` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "costPrice",
DROP COLUMN "retailPrice",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;
