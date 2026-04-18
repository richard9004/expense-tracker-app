-- CreateTable
CREATE TABLE "customers" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);
