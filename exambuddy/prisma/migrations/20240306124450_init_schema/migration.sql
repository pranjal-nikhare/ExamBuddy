-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Teacher" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Papers" (
    "id" TEXT NOT NULL,
    "teacherId" TEXT,
    "yearId" TEXT NOT NULL,
    "branchId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "examTypeId" INTEGER NOT NULL,
    "marksId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Questions" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "additional" TEXT NOT NULL,
    "paperId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Year" (
    "id" TEXT NOT NULL,
    "year" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Branch" (
    "id" SERIAL NOT NULL,
    "Branch" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" SERIAL NOT NULL,
    "SubjectName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ExamType" (
    "id" SERIAL NOT NULL
);

-- CreateTable
CREATE TABLE "Marks" (
    "id" SERIAL NOT NULL,
    "Marks" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_id_key" ON "Student"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_id_key" ON "Teacher"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_email_key" ON "Teacher"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Papers_id_key" ON "Papers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Questions_id_key" ON "Questions"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Year_id_key" ON "Year"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Branch_id_key" ON "Branch"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_id_key" ON "Subject"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ExamType_id_key" ON "ExamType"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Marks_id_key" ON "Marks"("id");

-- AddForeignKey
ALTER TABLE "Papers" ADD CONSTRAINT "Papers_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Papers" ADD CONSTRAINT "Papers_yearId_fkey" FOREIGN KEY ("yearId") REFERENCES "Year"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Papers" ADD CONSTRAINT "Papers_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Papers" ADD CONSTRAINT "Papers_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Papers" ADD CONSTRAINT "Papers_examTypeId_fkey" FOREIGN KEY ("examTypeId") REFERENCES "ExamType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Papers" ADD CONSTRAINT "Papers_marksId_fkey" FOREIGN KEY ("marksId") REFERENCES "Marks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_paperId_fkey" FOREIGN KEY ("paperId") REFERENCES "Papers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
