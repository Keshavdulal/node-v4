/*
  Warnings:

  - Added the required column `body` to the `Update` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Update" ADD COLUMN     "body" TEXT NOT NULL;
