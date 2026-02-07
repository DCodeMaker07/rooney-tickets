/*
  Warnings:

  - Added the required column `price` to the `Seat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Seat` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SeatType" AS ENUM ('VIP', 'GENERAL', 'PLATEA');

-- AlterTable
ALTER TABLE "Seat" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "type" "SeatType" NOT NULL;
