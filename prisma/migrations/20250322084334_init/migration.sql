-- CreateEnum
CREATE TYPE "MatchStatus" AS ENUM ('PENDING', 'LINEUPS', 'INPROGRESS', 'FULLTIME', 'CANCELLED');

-- CreateEnum
CREATE TYPE "BookingType" AS ENUM ('ONLINE', 'OFFLINE');

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "bookingType" "BookingType" NOT NULL DEFAULT 'ONLINE';

-- AlterTable
ALTER TABLE "Court" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Matchmaking" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "courtId" INTEGER NOT NULL,
    "bookingTime" TIMESTAMP(3) NOT NULL,
    "matchCreatorId" INTEGER NOT NULL,
    "playerCount" INTEGER NOT NULL,
    "matchmakingStatus" "MatchStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Matchmaking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompletedMatchmaking" (
    "id" SERIAL NOT NULL,
    "courtId" INTEGER NOT NULL,
    "matchId" INTEGER NOT NULL,
    "matchDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompletedMatchmaking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Matchmaking" ADD CONSTRAINT "Matchmaking_courtId_fkey" FOREIGN KEY ("courtId") REFERENCES "Court"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Matchmaking" ADD CONSTRAINT "Matchmaking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompletedMatchmaking" ADD CONSTRAINT "CompletedMatchmaking_courtId_fkey" FOREIGN KEY ("courtId") REFERENCES "Court"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompletedMatchmaking" ADD CONSTRAINT "CompletedMatchmaking_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Matchmaking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
