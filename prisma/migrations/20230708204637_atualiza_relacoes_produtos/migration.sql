/*
  Warnings:

  - Changed the type of `valor_produto` on the `ProdutoPedido` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Pedido" ALTER COLUMN "status" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "ProdutoPedido" ALTER COLUMN "observacoes" DROP NOT NULL,
DROP COLUMN "valor_produto",
ADD COLUMN     "valor_produto" DOUBLE PRECISION NOT NULL;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_cpf_cliente_fkey" FOREIGN KEY ("cpf_cliente") REFERENCES "Cliente"("cpf") ON DELETE SET NULL ON UPDATE CASCADE;
