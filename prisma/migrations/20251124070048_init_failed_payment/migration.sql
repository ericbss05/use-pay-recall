-- CreateTable
CREATE TABLE "failed_payments" (
    "id" TEXT NOT NULL,
    "account_id" TEXT NOT NULL,
    "invoice_id" TEXT,
    "subscription_id" TEXT,
    "email" TEXT,
    "name" TEXT,
    "amount_due" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "failed_payments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "failed_payments" ADD CONSTRAINT "failed_payments_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
