-- CreateTable
CREATE TABLE "Cliente" (
    "codigo" SERIAL NOT NULL,
    "cpf" TEXT,
    "email" TEXT,
    "nome" TEXT,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("codigo")
);

-- CreateTable
CREATE TABLE "Produto" (
    "codigo" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "categoria_codigo" INTEGER NOT NULL,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("codigo")
);

-- CreateTable
CREATE TABLE "Pedido" (
    "codigo" SERIAL NOT NULL,
    "cpf_cliente" TEXT NOT NULL,
    "status" INTEGER NOT NULL,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("codigo")
);

-- CreateTable
CREATE TABLE "ProdutoPedido" (
    "codigo" SERIAL NOT NULL,
    "quantidade_produto" INTEGER NOT NULL,
    "produto_codigo" INTEGER NOT NULL,
    "pedido_codigo" INTEGER NOT NULL,

    CONSTRAINT "ProdutoPedido_pkey" PRIMARY KEY ("codigo")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_cpf_key" ON "Cliente"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Produto_nome_key" ON "Produto"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Pedido_cpf_cliente_key" ON "Pedido"("cpf_cliente");

-- CreateIndex
CREATE UNIQUE INDEX "ProdutoPedido_produto_codigo_key" ON "ProdutoPedido"("produto_codigo");

-- CreateIndex
CREATE UNIQUE INDEX "ProdutoPedido_pedido_codigo_key" ON "ProdutoPedido"("pedido_codigo");

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_cpf_cliente_fkey" FOREIGN KEY ("cpf_cliente") REFERENCES "Cliente"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProdutoPedido" ADD CONSTRAINT "ProdutoPedido_produto_codigo_fkey" FOREIGN KEY ("produto_codigo") REFERENCES "Produto"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProdutoPedido" ADD CONSTRAINT "ProdutoPedido_pedido_codigo_fkey" FOREIGN KEY ("pedido_codigo") REFERENCES "Pedido"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;
