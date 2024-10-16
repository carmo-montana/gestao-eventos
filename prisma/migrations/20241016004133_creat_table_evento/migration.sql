-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evento" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "evento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "local" (
    "id" SERIAL NOT NULL,
    "rua" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "referencia" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "local_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "local_evento" (
    "eventoId" INTEGER NOT NULL,
    "localId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "local_evento_pkey" PRIMARY KEY ("eventoId","localId")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "local_cep_key" ON "local"("cep");

-- AddForeignKey
ALTER TABLE "local_evento" ADD CONSTRAINT "local_evento_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "evento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "local_evento" ADD CONSTRAINT "local_evento_localId_fkey" FOREIGN KEY ("localId") REFERENCES "local"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
