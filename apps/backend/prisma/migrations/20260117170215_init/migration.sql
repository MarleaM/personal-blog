-- CreateTable
CREATE TABLE "Blog" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "author" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "tags" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "backgroundPicUrl" TEXT,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);
