/*
  Warnings:

  - The primary key for the `ProdutoPedido` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `codigo` on the `ProdutoPedido` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProdutoPedido" DROP CONSTRAINT "ProdutoPedido_pkey",
DROP COLUMN "codigo";
