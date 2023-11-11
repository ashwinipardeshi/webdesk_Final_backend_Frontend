using AdmissionWebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace AdmissionWebAPI.Data
{
    public partial class AdmissionDevFinalDbContext : DbContext
    {
        protected readonly IConfiguration Configuration;

        public AdmissionDevFinalDbContext(DbContextOptions<AdmissionDevFinalDbContext> options, IConfiguration configuration)
            : base(options)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseSqlServer(Configuration.GetConnectionString("AdmissionWebAPICon"));
        }

        // Update below lines

        #region AdmissionData
        public virtual DbSet<BankDetail> BankDetails { get; set; }

        public virtual DbSet<CurrentAcademicDetail> CurrentAcademicDetails { get; set; }

        public virtual DbSet<DocumentList> DocumentLists { get; set; }

        public virtual DbSet<EntranceExamDetail> EntranceExamDetails { get; set; }

        public virtual DbSet<ErrorLog> ErrorLogs { get; set; }

        public virtual DbSet<HscmarkDetail> HscmarkDetails { get; set; }

        public virtual DbSet<InsuranceDetail> InsuranceDetails { get; set; }

        public virtual DbSet<OnlineBankDetail> OnlineBankDetails { get; set; }

        public virtual DbSet<OnlineDocumentList> OnlineDocumentLists { get; set; }

        public virtual DbSet<OnlineEntranceExamDetail> OnlineEntranceExamDetails { get; set; }

        public virtual DbSet<OnlineHscmarkDetail> OnlineHscmarkDetails { get; set; }

        public virtual DbSet<OnlineInsuranceDetail> OnlineInsuranceDetails { get; set; }

        public virtual DbSet<OnlineParentDetail> OnlineParentDetails { get; set; }

        public virtual DbSet<OnlinePhDdetail> OnlinePhDdetails { get; set; }

        public virtual DbSet<OnlinePreviousAcademicDetail> OnlinePreviousAcademicDetails { get; set; }

        public virtual DbSet<OnlineSscmarkDetail> OnlineSscmarkDetails { get; set; }

        public virtual DbSet<OnlineStudentAdmission> OnlineStudentAdmissions { get; set; }

        public virtual DbSet<OnlineVehicleInformation> OnlineVehicleInformations { get; set; }

        public virtual DbSet<ParentDetail> ParentDetails { get; set; }

        public virtual DbSet<PhDdetail> PhDdetails { get; set; }

        public virtual DbSet<PreviousAcademicDetail> PreviousAcademicDetails { get; set; }

        public virtual DbSet<SscmarkDetail> SscmarkDetails { get; set; }

        public virtual DbSet<StudAdmissionAcademicYearDetail> StudAdmissionAcademicYearDetails { get; set; }

        public virtual DbSet<StudentAdmission> StudentAdmissions { get; set; }

        public virtual DbSet<VehicleInformation> VehicleInformations { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BankDetail>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_BankDetails_1");

                entity.Property(e => e.AccountHolderName)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.AccountNo)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.AccountType)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.BankAddress)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.BankName)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.BranchCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.BranchName)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.CanceledChequePath)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.CreatedDate).HasColumnType("datetime");
                entity.Property(e => e.Ifsccode)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("IFSCCode");
                entity.Property(e => e.Micrcode)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("MICRCode");
                entity.Property(e => e.PersonType)
                    .HasMaxLength(10)
                    .IsUnicode(false);
                entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

                entity.HasOne(d => d.StudentAdmission).WithMany(p => p.BankDetails)
                    .HasForeignKey(d => d.StudentAdmissionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BankDetails_StudentAdmission");
            });

            modelBuilder.Entity<CurrentAcademicDetail>(entity =>
            {
                entity.Property(e => e.BacklogStatus)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.BoardUniversity)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.Class)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.CreatedDate).HasColumnType("datetime");
                entity.Property(e => e.Month)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.SeatNo)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

                entity.HasOne(d => d.StudentAdmission).WithMany(p => p.CurrentAcademicDetails)
                    .HasForeignKey(d => d.StudentAdmissionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CurrentAcademicDetails_StudentAdmission");
            });

            modelBuilder.Entity<DocumentList>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_InsuranceDetails");

                entity.ToTable("DocumentList");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");
                entity.Property(e => e.DocumentPath)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

                entity.HasOne(d => d.StudentAdmission).WithMany(p => p.DocumentLists)
                    .HasForeignKey(d => d.StudentAdmissionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DocumentList_StudentAdmission");
            });

            modelBuilder.Entity<EntranceExamDetail>(entity =>
            {
                entity.Property(e => e.CreatedDate).HasColumnType("datetime");
                entity.Property(e => e.EntranceType)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.RollNumber)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

                entity.HasOne(d => d.StudentAdmission).WithMany(p => p.EntranceExamDetails)
                    .HasForeignKey(d => d.StudentAdmissionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_EntranceExamDetails_StudentAdmission");
            });

            modelBuilder.Entity<ErrorLog>(entity =>
            {
                entity.ToTable("ErrorLog");

                entity.Property(e => e.Action)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.Controller)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.CreatedDate).HasColumnType("datetime");
                entity.Property(e => e.Message).IsUnicode(false);
                entity.Property(e => e.StackTrace).IsUnicode(false);
            });

            modelBuilder.Entity<HscmarkDetail>(entity =>
            {
                entity.ToTable("HSCMarkDetails");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");
                entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
                entity.Property(e => e.VocationSubject)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.StudentAdmission).WithMany(p => p.HscmarkDetails)
                    .HasForeignKey(d => d.StudentAdmissionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_HSCMarkDetails_StudentAdmission");
            });

            modelBuilder.Entity<InsuranceDetail>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_InsuranceDetails_1");

                entity.Property(e => e.AadharNo)
                    .HasMaxLength(12)
                    .IsUnicode(false);
                entity.Property(e => e.CreatedDate).HasColumnType("datetime");
                entity.Property(e => e.DateOfBirth).HasColumnType("date");
                entity.Property(e => e.FirstName)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.LastName)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.MiddleName)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.Relation)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.StudentParentBeneficiary)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.StudentParentBenefit)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.SumInsured)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

                entity.HasOne(d => d.StudentAdmission).WithMany(p => p.InsuranceDetails)
                    .HasForeignKey(d => d.StudentAdmissionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_InsuranceDetails_StudentAdmission");
            });

            modelBuilder.Entity<OnlineBankDetail>(entity =>
            {
                entity.Property(e => e.AccountHolderName)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.AccountNo)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.AccountType)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.BankAddress)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.BankName)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.BranchCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.BranchName)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.CanceledChequePath)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.CreatedDate).HasColumnType("datetime");
                entity.Property(e => e.Ifsccode)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("IFSCCode");
                entity.Property(e => e.Micrcode)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("MICRCode");
                entity.Property(e => e.PersonType)
                    .HasMaxLength(10)
                    .IsUnicode(false);
                entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

                entity.HasOne(d => d.OnlineStudentAdmission).WithMany(p => p.OnlineBankDetails)
                    .HasForeignKey(d => d.OnlineStudentAdmissionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BankDetailsOnline_StudentAdmissionOnline");
            });

            modelBuilder.Entity<OnlineDocumentList>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_DocumentListOnline");

                entity.ToTable("OnlineDocumentList");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");
                entity.Property(e => e.DocumentPath)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

                entity.HasOne(d => d.OnlineStudentAdmission).WithMany(p => p.OnlineDocumentLists)
                    .HasForeignKey(d => d.OnlineStudentAdmissionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DocumentListOnline_StudentAdmissionOnline");
            });

            modelBuilder.Entity<OnlineEntranceExamDetail>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_EntranceExamDetailsOnline");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");
                entity.Property(e => e.EntranceType)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.RollNumber)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

                entity.HasOne(d => d.OnlineStudentAdmission).WithMany(p => p.OnlineEntranceExamDetails)
                    .HasForeignKey(d => d.OnlineStudentAdmissionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_EntranceExamDetailsOnline_StudentAdmissionOnline");
            });

            modelBuilder.Entity<OnlineHscmarkDetail>(entity =>
            {
                entity.ToTable("OnlineHSCMarkDetails");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");
                entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
                entity.Property(e => e.VocationSubject)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.OnlineStudentAdmission).WithMany(p => p.OnlineHscmarkDetails)
                    .HasForeignKey(d => d.OnlineStudentAdmissionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_OnlineHSCMarkDetails_OnlineStudentAdmission");
            });

            modelBuilder.Entity<OnlineInsuranceDetail>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_InsuranceDetailsOnline");

                entity.Property(e => e.AadharNo)
                    .HasMaxLength(12)
                    .IsUnicode(false);
                entity.Property(e => e.CreatedDate).HasColumnType("datetime");
                entity.Property(e => e.DateOfBirth).HasColumnType("date");
                entity.Property(e => e.FirstName)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.LastName)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.MiddleName)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.Relation)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.StudentParentBeneficiary)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.StudentParentBenefit)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.SumInsured)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

                entity.HasOne(d => d.OnlineStudentAdmission).WithMany(p => p.OnlineInsuranceDetails)
                    .HasForeignKey(d => d.OnlineStudentAdmissionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_InsuranceDetailsOnline_StudentAdmissionOnline");
            });

            modelBuilder.Entity<OnlineParentDetail>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_ParentDetailsOnline");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");
                entity.Property(e => e.DateOfBirth).HasColumnType("date");
                entity.Property(e => e.Designation)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.EmployedIn)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.FirstName)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.GuaradianAddress)
                    .HasMaxLength(1000)
                    .IsUnicode(false);
                entity.Property(e => e.GuaradianRelation)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.Image)
                    .HasMaxLength(200)
                    .IsUnicode(false);
                entity.Property(e => e.Income)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.LastName)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.LivingStatus)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.MailId)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.MiddleName)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.MobileNo)
                    .HasMaxLength(10)
                    .IsUnicode(false);
                entity.Property(e => e.OrganizationName)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.Profession)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.Qualification)
                    .HasMaxLength(30)
                    .IsUnicode(false);
                entity.Property(e => e.Signature)
                    .HasMaxLength(200)
                    .IsUnicode(false);
                entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

                entity.HasOne(d => d.OnlineStudentAdmission).WithMany(p => p.OnlineParentDetails)
                    .HasForeignKey(d => d.OnlineStudentAdmissionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ParentDetailsOnline_StudentAdmissionOnline");
            });

            modelBuilder.Entity<OnlinePhDdetail>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_PhDDetailsOnline");

                entity.ToTable("OnlinePhDDetails");

                entity.Property(e => e.AddressOfApproved)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.ApprovedName)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.CoGuideName)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.CreatedDate).HasColumnType("datetime");
                entity.Property(e => e.EmploymentAddress)
                    .HasMaxLength(200)
                    .IsUnicode(false);
                entity.Property(e => e.EmploymentName)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.InstituteOfProfessionalExp)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.MphilDissertationTitle)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.PresentOccupationOrEmployment)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.ProfessionaExpPeriod)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.ProfessionalExperienceNature)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.ReasearchGuideName)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.ResearchPlace)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.ResearchTopic)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.Subject)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

                entity.HasOne(d => d.OnlineStudentAdmission).WithMany(p => p.OnlinePhDdetails)
                    .HasForeignKey(d => d.OnlineStudentAdmissionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PhDDetailsOnline_StudentAdmissionOnline");
            });

            modelBuilder.Entity<OnlinePreviousAcademicDetail>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_PerviousAcademicDetailsOnline");

                entity.Property(e => e.AcademicClass)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.BoardUniversity)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.CreatedDate).HasColumnType("datetime");
                entity.Property(e => e.Month)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.SchoolCollege)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.SeatNo)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

                entity.HasOne(d => d.OnlineStudentAdmission).WithMany(p => p.OnlinePreviousAcademicDetails)
                    .HasForeignKey(d => d.OnlineStudentAdmissionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PerviousAcademicDetailsOnline_StudentAdmissionOnline");
            });

            modelBuilder.Entity<OnlineSscmarkDetail>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_SSCMarkDetailsOnline");

                entity.ToTable("OnlineSSCMarkDetails");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");
                entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

                entity.HasOne(d => d.OnlineStudentAdmission).WithMany(p => p.OnlineSscmarkDetails)
                    .HasForeignKey(d => d.OnlineStudentAdmissionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SSCMarkDetailsOnline_StudentAdmissionOnline");
            });

            modelBuilder.Entity<OnlineStudentAdmission>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_StudentAdmissionOnline");

                entity.ToTable("OnlineStudentAdmission");

                entity.Property(e => e.AadharNo)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.AdmissionStatus)
                    .HasMaxLength(30)
                    .IsUnicode(false);
                entity.Property(e => e.AlternateMailId)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.AlternateMobileNo)
                    .HasMaxLength(10)
                    .IsUnicode(false);
                entity.Property(e => e.ApplicationFor)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.ApplicationNo)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.CorrespondenceAddressMigration)
                    .HasMaxLength(1000)
                    .IsUnicode(false);
                entity.Property(e => e.CorrespondenceBuildingName)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.CorrespondenceCity)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.CorrespondenceFlatNo)
                    .HasMaxLength(10)
                    .IsUnicode(false);
                entity.Property(e => e.CorrespondenceLandMark)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.CreatedDate).HasColumnType("datetime");
                entity.Property(e => e.DateOfBirth).HasColumnType("date");
                entity.Property(e => e.DefenceType)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.DteapplicationNo)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("DTEApplicationNo");
                entity.Property(e => e.EmergencyContactNo)
                    .HasMaxLength(10)
                    .IsUnicode(false);
                entity.Property(e => e.FirstName)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.Gender)
                    .HasMaxLength(10)
                    .IsUnicode(false);
                entity.Property(e => e.Grno)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("GRNo");
                entity.Property(e => e.HomeUniversity)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.LanguageKnown)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.LastName)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.MahaDbtApplicationNo)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.MaritalStatus)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.MiddleName)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.MobileNo)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.MotherTounge)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.NameAsMarkSheet)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.NationalMeritListNo)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.NationalMeritMarks)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.Nationality)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.PanNo)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.PassportExpiryDate).HasColumnType("date");
                entity.Property(e => e.PassportNo)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.PermanentAddressMigration)
                    .HasMaxLength(1000)
                    .IsUnicode(false);
                entity.Property(e => e.PermanentBuildingName)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.PermanentCity)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.PermanentFlatNo)
                    .HasMaxLength(10)
                    .IsUnicode(false);
                entity.Property(e => e.PermanentLandMark)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.Prnno)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("PRNNo");
                entity.Property(e => e.ReasonOfAcademicStatus)
                    .HasMaxLength(200)
                    .IsUnicode(false);
                entity.Property(e => e.Region)
                    .HasMaxLength(10)
                    .IsUnicode(false);
                entity.Property(e => e.StateMeritListNo)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.StateMeritMarks)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.StudentCode)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.StudentImage)
                    .HasMaxLength(200)
                    .IsUnicode(false);
                entity.Property(e => e.StudentMailId)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.StudentSignature)
                    .HasMaxLength(200)
                    .IsUnicode(false);
                entity.Property(e => e.TalukaOfBirth)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.Title)
                    .HasMaxLength(15)
                    .IsUnicode(false);
                entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
                entity.Property(e => e.VoterId)
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<OnlineVehicleInformation>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_VehicleInformationOnline");

                entity.ToTable("OnlineVehicleInformation");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");
                entity.Property(e => e.Puc).HasColumnName("PUC");
                entity.Property(e => e.Rc)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("RC");
                entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
                entity.Property(e => e.VehicleInsurancePolicyNo)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.VehicleType)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.OnlineStudentAdmission).WithMany(p => p.OnlineVehicleInformations)
                    .HasForeignKey(d => d.OnlineStudentAdmissionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_VehicleInformationOnline_StudentAdmissionOnline");
            });

            modelBuilder.Entity<ParentDetail>(entity =>
            {
                entity.Property(e => e.CreatedDate).HasColumnType("datetime");
                entity.Property(e => e.DateOfBirth).HasColumnType("date");
                entity.Property(e => e.Designation)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.EmployedIn)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.FirstName)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.Gender)
                    .HasMaxLength(10)
                    .IsUnicode(false);
                entity.Property(e => e.GuaradianAddress)
                    .HasMaxLength(1000)
                    .IsUnicode(false);
                entity.Property(e => e.GuaradianRelation)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.Image)
                    .HasMaxLength(200)
                    .IsUnicode(false);
                entity.Property(e => e.Income)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.LastName)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.LivingStatus)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.MailId)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.MiddleName)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.MobileNo)
                    .HasMaxLength(10)
                    .IsUnicode(false);
                entity.Property(e => e.OrganizationName)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.Profession)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.Qualification)
                    .HasMaxLength(30)
                    .IsUnicode(false);
                entity.Property(e => e.Signature)
                    .HasMaxLength(200)
                    .IsUnicode(false);
                entity.Property(e => e.Title)
                    .HasMaxLength(15)
                    .IsUnicode(false);
                entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
                entity.Property(e => e.WhatsAppMobileNo)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.HasOne(d => d.StudentAdmission).WithMany(p => p.ParentDetails)
                    .HasForeignKey(d => d.StudentAdmissionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ParentDetails_StudentAdmission");
            });

            modelBuilder.Entity<PhDdetail>(entity =>
            {
                entity.ToTable("PhDDetails");

                entity.Property(e => e.AddressOfApproved)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.ApprovedName)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.CoGuideName)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.CreatedDate).HasColumnType("datetime");
                entity.Property(e => e.EmploymentAddress)
                    .HasMaxLength(200)
                    .IsUnicode(false);
                entity.Property(e => e.EmploymentName)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.InstituteOfProfessionalExp)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.MphilDissertationTitle)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.PartOrFullTime)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.PresentOccupationOrEmployment)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.ProfessionaExpPeriod)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.ProfessionalExperienceNature)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.ReasearchGuideName)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.ResearchPlace)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.ResearchTopic)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.Subject)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

                entity.HasOne(d => d.StudentAdmission).WithMany(p => p.PhDdetails)
                    .HasForeignKey(d => d.StudentAdmissionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PhDDetails_StudentAdmission");
            });

            modelBuilder.Entity<PreviousAcademicDetail>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_AcademicDetails");

                entity.Property(e => e.AcademicClass)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.BoardUniversity)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.CreatedDate).HasColumnType("datetime");
                entity.Property(e => e.Month)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.SchoolCollege)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.SeatNo)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

                entity.HasOne(d => d.StudentAdmission).WithMany(p => p.PreviousAcademicDetails)
                    .HasForeignKey(d => d.StudentAdmissionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PreviousAcademicDetails_StudentAdmission");
            });

            modelBuilder.Entity<SscmarkDetail>(entity =>
            {
                entity.ToTable("SSCMarkDetails");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");
                entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

                entity.HasOne(d => d.StudentAdmission).WithMany(p => p.SscmarkDetails)
                    .HasForeignKey(d => d.StudentAdmissionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SSCMarkDetails_StudentAdmission");
            });

            modelBuilder.Entity<StudAdmissionAcademicYearDetail>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_StudentAdmissionAYDetail");

                entity.ToTable("StudAdmissionAcademicYearDetail");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");
                entity.Property(e => e.ReasonOfAcademicStatus)
                    .HasMaxLength(200)
                    .IsUnicode(false);
                entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

                entity.HasOne(d => d.StudentAdmission).WithMany(p => p.StudAdmissionAcademicYearDetails)
                    .HasForeignKey(d => d.StudentAdmissionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_StudAdmissionAcademicYearDetail_StudentAdmission");
            });

            modelBuilder.Entity<StudentAdmission>(entity =>
            {
                entity.ToTable("StudentAdmission");

                entity.Property(e => e.AadharNo)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.AdmisssionDate).HasColumnType("date");
                entity.Property(e => e.AlternateMailId)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.AlternateMobileNo)
                    .HasMaxLength(10)
                    .IsUnicode(false);
                entity.Property(e => e.ApplicationFor)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.ChoiceCode)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.CorrespondenceAddressMigration)
                    .HasMaxLength(1000)
                    .IsUnicode(false);
                entity.Property(e => e.CorrespondenceBuildingName)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.CorrespondenceCity)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.CorrespondenceFlatNo)
                    .HasMaxLength(10)
                    .IsUnicode(false);
                entity.Property(e => e.CorrespondenceLandMark)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.CreatedDate).HasColumnType("datetime");
                entity.Property(e => e.DateOfBirth).HasColumnType("date");
                entity.Property(e => e.DefenceType)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.DrivingLicenceNo)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.DteapplicationNo)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("DTEApplicationNo");
                entity.Property(e => e.EligiblityNo)
                    .HasMaxLength(10)
                    .IsFixedLength();
                entity.Property(e => e.EmergencyContactNo)
                    .HasMaxLength(10)
                    .IsUnicode(false);
                entity.Property(e => e.FirstName)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.Gender)
                    .HasMaxLength(10)
                    .IsUnicode(false);
                entity.Property(e => e.Grno)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("GRNo");
                entity.Property(e => e.HomeUniversity)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.LanguageKnown)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.LastName)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.LocalBuildingName)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.LocalCity)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.LocalFlatNo)
                    .HasMaxLength(10)
                    .IsUnicode(false);
                entity.Property(e => e.LocalLandMark)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.MahaDbtApplicationNo)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.MaritalStatus)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.MiddleName)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.MobileNo)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.MotherTounge)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.NameAsMarkSheet)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.NationalMeritListNo)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.NationalMeritMarks)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.Nationality)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.PanNo)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.ParentMailId)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.ParentMobileNo)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.PassportExpiryDate).HasColumnType("date");
                entity.Property(e => e.PassportNo)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.PermanentAddressMigration)
                    .HasMaxLength(1000)
                    .IsUnicode(false);
                entity.Property(e => e.PermanentBuildingName)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.PermanentCity)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.PermanentFlatNo)
                    .HasMaxLength(10)
                    .IsUnicode(false);
                entity.Property(e => e.PermanentLandMark)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.Prnno)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("PRNNo");
                entity.Property(e => e.Region)
                    .HasMaxLength(10)
                    .IsUnicode(false);
                entity.Property(e => e.StateMeritListNo)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.StateMeritMarks)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.StudentCode)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.StudentImage)
                    .HasMaxLength(200)
                    .IsUnicode(false);
                entity.Property(e => e.StudentMailId)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.StudentSignature)
                    .HasMaxLength(200)
                    .IsUnicode(false);
                entity.Property(e => e.TalukaOfBirth)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.Title)
                    .HasMaxLength(15)
                    .IsUnicode(false);
                entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
                entity.Property(e => e.VoterId)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.WhatsAppMobileNo)
                    .HasMaxLength(15)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<VehicleInformation>(entity =>
            {
                entity.ToTable("VehicleInformation");

                entity.Property(e => e.ChassisNo)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.CreatedDate).HasColumnType("datetime");
                entity.Property(e => e.DrivingLicence)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.EngineNo)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.Puc).HasColumnName("PUC");
                entity.Property(e => e.Rc)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("RC");
                entity.Property(e => e.Rcvalidity)
                    .HasColumnType("date")
                    .HasColumnName("RCValidity");
                entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
                entity.Property(e => e.ValidityOfLicence).HasColumnType("date");
                entity.Property(e => e.VehicleInsurancePolicyNo)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.VehicleNo)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.VehicleOwnerName)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.VehicleRegistrationNo)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.VehicleType)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.StudentAdmission).WithMany(p => p.VehicleInformations)
                    .HasForeignKey(d => d.StudentAdmissionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_VehicleInformation_StudentAdmission1");
            });

            OnModelCreatingPartial(modelBuilder);
        }
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
    #endregion AdmissionData
}