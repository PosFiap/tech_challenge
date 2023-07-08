/*
  Warnings:

  - The primary key for the `Cliente` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `codigo` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `cpf_cliente` on the `Pedido` table. All the data in the column will be lost.
  - You are about to drop the column `quantidade_produto` on the `ProdutoPedido` table. All the data in the column will be lost.
  - Made the column `cpf` on table `Cliente` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `observacoes` to the `ProdutoPedido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor_produto` to the `ProdutoPedido` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pedido" DROP CONSTRAINT "Pedido_cpf_cliente_fkey";

-- DropIndex
DROP INDEX "Pedido_cpf_cliente_key";

-- AlterTable
ALTER TABLE "Cliente" DROP CONSTRAINT "Cliente_pkey",
DROP COLUMN "codigo",
ALTER COLUMN "cpf" SET NOT NULL,
ADD CONSTRAINT "Cliente_pkey" PRIMARY KEY ("cpf");

-- AlterTable
ALTER TABLE "Pedido" DROP COLUMN "cpf_cliente";

-- AlterTable
ALTER TABLE "ProdutoPedido" DROP COLUMN "quantidade_produto",
ADD COLUMN     "codigo" SERIAL NOT NULL,
ADD COLUMN     "observacoes" TEXT NOT NULL,
ADD COLUMN     "valor_produto" TEXT NOT NULL,
ADD CONSTRAINT "ProdutoPedido_pkey" PRIMARY KEY ("codigo");

-- CreateTable
CREATE TABLE "Categoria" (
    "codigo" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("codigo")
);
