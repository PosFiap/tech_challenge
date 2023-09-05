-- AlterTable
ALTER TABLE "Pedido" ADD COLUMN     "data_atualizacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Fatura" (
    "codigo" TEXT NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,
    "situacao" INTEGER NOT NULL,
    "pedido_codigo" INTEGER NOT NULL,

    CONSTRAINT "Fatura_pkey" PRIMARY KEY ("codigo")
);

-- AddForeignKey
ALTER TABLE "Fatura" ADD CONSTRAINT "Fatura_pedido_codigo_fkey" FOREIGN KEY ("pedido_codigo") REFERENCES "Pedido"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;
