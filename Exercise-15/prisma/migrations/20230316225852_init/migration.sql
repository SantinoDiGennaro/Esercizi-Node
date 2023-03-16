-- CreateTable
CREATE TABLE "Database" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "mail" VARCHAR(255) NOT NULL,

    CONSTRAINT "Database_pkey" PRIMARY KEY ("id")
);
