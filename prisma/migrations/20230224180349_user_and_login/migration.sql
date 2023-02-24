-- CreateTable
CREATE TABLE "User" (
    "model" TEXT NOT NULL DEFAULT 'user',
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoginRegistry" (
    "model" TEXT NOT NULL DEFAULT 'loginRegistry',
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LoginRegistry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LoginRegistry" ADD CONSTRAINT "LoginRegistry_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
