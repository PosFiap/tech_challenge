/*
  Warnings:

  - Made the column `email` on table `Cliente` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nome` on table `Cliente` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Cliente" ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "nome" SET NOT NULL;
