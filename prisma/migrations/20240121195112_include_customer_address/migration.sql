/*
  Warnings:

  - Added the required column `address` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Made the column `phone` on table `customers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "address" TEXT NOT NULL,
ALTER COLUMN "phone" SET NOT NULL;
