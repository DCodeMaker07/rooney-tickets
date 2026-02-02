/*
  Warnings:

  - The `status` column on the `Payment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[externalId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `amount` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `externalId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `provider` on the `Payment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PaymentProvider" AS ENUM ('STRIPE', 'PAYPAL');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'REQUIRES_ACTION', 'PROCESSING', 'SUCCEEDED', 'FAILED', 'CANCELLED', 'REFUNDED', 'PARTIALLY_REFUNDED');

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_orderId_fkey";

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "amount" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'USD',
ADD COLUMN     "externalId" TEXT NOT NULL,
ADD COLUMN     "failureReason" TEXT,
ADD COLUMN     "last4" TEXT,
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "paymentMethod" TEXT,
ADD COLUMN     "receiptUrl" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "provider",
ADD COLUMN     "provider" "PaymentProvider" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING';

-- CreateIndex
CREATE UNIQUE INDEX "Payment_externalId_key" ON "Payment"("externalId");

-- CreateIndex
CREATE INDEX "Payment_externalId_idx" ON "Payment"("externalId");

-- CreateIndex
CREATE INDEX "Payment_status_idx" ON "Payment"("status");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
