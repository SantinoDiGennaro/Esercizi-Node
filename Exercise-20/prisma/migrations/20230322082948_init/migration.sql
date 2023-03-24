-- CreateTable
CREATE TABLE "database" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,

    CONSTRAINT "database_pkey" PRIMARY KEY ("id")
);
