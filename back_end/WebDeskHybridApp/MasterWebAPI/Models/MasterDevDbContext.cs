using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace MasterWebAPI.Models;

public partial class MasterDevDbContext : DbContext
{
    public MasterDevDbContext()
    {
    }

    public MasterDevDbContext(DbContextOptions<MasterDevDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<AcademicStatusMaster> AcademicStatusMasters { get; set; }

    public virtual DbSet<AcademicYearMaster> AcademicYearMasters { get; set; }

    public virtual DbSet<AccreditationMaster> AccreditationMasters { get; set; }

    public virtual DbSet<AdmissionTypeMaster> AdmissionTypeMasters { get; set; }

    public virtual DbSet<AdmittedTypeMaster> AdmittedTypeMasters { get; set; }

    public virtual DbSet<AllotmentCategoryMaster> AllotmentCategoryMasters { get; set; }

    public virtual DbSet<AnnualIncomeGmaster> AnnualIncomeGmasters { get; set; }

    public virtual DbSet<ApplicationRejectReasonMaster> ApplicationRejectReasonMasters { get; set; }

    public virtual DbSet<ApplicationStatusMaster> ApplicationStatusMasters { get; set; }

    public virtual DbSet<AppointmentTypeGmaster> AppointmentTypeGmasters { get; set; }

    public virtual DbSet<BankMaster> BankMasters { get; set; }

    public virtual DbSet<BloodGroupGmaster> BloodGroupGmasters { get; set; }

    public virtual DbSet<BoardGmaster> BoardGmasters { get; set; }

    public virtual DbSet<BranchMaster> BranchMasters { get; set; }

    public virtual DbSet<CandidatureTypeGmaster> CandidatureTypeGmasters { get; set; }

    public virtual DbSet<CasteCategoryGmaster> CasteCategoryGmasters { get; set; }

    public virtual DbSet<CasteGmaster> CasteGmasters { get; set; }

    public virtual DbSet<CollegeMaster> CollegeMasters { get; set; }

    public virtual DbSet<CommonGmaster> CommonGmasters { get; set; }

    public virtual DbSet<CommonGmasterDetail> CommonGmasterDetails { get; set; }

    public virtual DbSet<CommonMaster> CommonMasters { get; set; }

    public virtual DbSet<CommonMasterDetail> CommonMasterDetails { get; set; }

    public virtual DbSet<CommonSubjectListGmaster> CommonSubjectListGmasters { get; set; }

    public virtual DbSet<CountryGmaster> CountryGmasters { get; set; }

    public virtual DbSet<CourseCategoryGmaster> CourseCategoryGmasters { get; set; }

    public virtual DbSet<CourseTypeMaster> CourseTypeMasters { get; set; }

    public virtual DbSet<DepartmentMaster> DepartmentMasters { get; set; }

    public virtual DbSet<DesignationMaster> DesignationMasters { get; set; }

    public virtual DbSet<DistrictGmaster> DistrictGmasters { get; set; }

    public virtual DbSet<DivisionMaster> DivisionMasters { get; set; }

    public virtual DbSet<DocumentMaster> DocumentMasters { get; set; }

    public virtual DbSet<DomicileGmaster> DomicileGmasters { get; set; }

    public virtual DbSet<EmployeeTypeGmaster> EmployeeTypeGmasters { get; set; }

    public virtual DbSet<ErrorLog> ErrorLogs { get; set; }

    public virtual DbSet<EvaluationMaster> EvaluationMasters { get; set; }

    public virtual DbSet<ExamTypeMaster> ExamTypeMasters { get; set; }

    public virtual DbSet<FeeHeadMaster> FeeHeadMasters { get; set; }

    public virtual DbSet<FeeHeadTypeMaster> FeeHeadTypeMasters { get; set; }

    public virtual DbSet<HandicapTypeGmaster> HandicapTypeGmasters { get; set; }

    public virtual DbSet<MinorityDetailsGmaster> MinorityDetailsGmasters { get; set; }

    public virtual DbSet<MinorityGmaster> MinorityGmasters { get; set; }

    public virtual DbSet<ModeOfAdmissionMaster> ModeOfAdmissionMasters { get; set; }

    public virtual DbSet<MotherTongueGmaster> MotherTongueGmasters { get; set; }

    public virtual DbSet<ProgramDetailMaster> ProgramDetailMasters { get; set; }

    public virtual DbSet<ProgramMaster> ProgramMasters { get; set; }

    public virtual DbSet<ProgramTypeMaster> ProgramTypeMasters { get; set; }

    public virtual DbSet<ProgramYearMaster> ProgramYearMasters { get; set; }

    public virtual DbSet<RelationGmaster> RelationGmasters { get; set; }

    public virtual DbSet<ReligionGmaster> ReligionGmasters { get; set; }

    public virtual DbSet<ReligionMaster> ReligionMasters { get; set; }

    public virtual DbSet<ReservationCategoryMaster> ReservationCategoryMasters { get; set; }

    public virtual DbSet<SeatTypeMaster> SeatTypeMasters { get; set; }

    public virtual DbSet<SemesterDetailsMaster> SemesterDetailsMasters { get; set; }

    public virtual DbSet<SemesterGmaster> SemesterGmasters { get; set; }

    public virtual DbSet<SmstemplateMaster> SmstemplateMasters { get; set; }

    public virtual DbSet<SmtpconfigMaster> SmtpconfigMasters { get; set; }

    public virtual DbSet<StateGmaster> StateGmasters { get; set; }

    public virtual DbSet<StreamMaster> StreamMasters { get; set; }

    public virtual DbSet<StudyMaster> StudyMasters { get; set; }

    public virtual DbSet<SubCasteGmaster> SubCasteGmasters { get; set; }

    public virtual DbSet<SyllabusPatternMaster> SyllabusPatternMasters { get; set; }

    public virtual DbSet<TalukaGmaster> TalukaGmasters { get; set; }

    public virtual DbSet<TimeSlotGmaster> TimeSlotGmasters { get; set; }

    public virtual DbSet<UserActivityLog> UserActivityLogs { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=103.172.151.211,1455;Database=MasterDevDB;User Id=devuser;password=USg1#E729D19L;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AcademicStatusMaster>(entity =>
        {
            entity.ToTable("AcademicStatusMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.College).WithMany(p => p.AcademicStatusMasters)
                .HasForeignKey(d => d.CollegeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AcademicStatusMaster_CollegeMaster");
        });

        modelBuilder.Entity<AcademicYearMaster>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_AcademicMaster");

            entity.ToTable("AcademicYearMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.EndYear).HasColumnType("date");
            entity.Property(e => e.Name)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.StartYear).HasColumnType("date");
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.College).WithMany(p => p.AcademicYearMasters)
                .HasForeignKey(d => d.CollegeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AcademicMaster_CollegeMaster");

            entity.HasOne(d => d.Stream).WithMany(p => p.AcademicYearMasters)
                .HasForeignKey(d => d.StreamId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AcademicMaster_StreamMaster");
        });

        modelBuilder.Entity<AccreditationMaster>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_StreamMaster");

            entity.ToTable("AccreditationMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Grade)
                .HasMaxLength(5)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
            entity.Property(e => e.VaildTill).HasColumnType("date");

            entity.HasOne(d => d.College).WithMany(p => p.AccreditationMasters)
                .HasForeignKey(d => d.CollegeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccreditationMaster_CollegeMaster");

            entity.HasOne(d => d.Stream).WithMany(p => p.AccreditationMasters)
                .HasForeignKey(d => d.StreamId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AccreditationMaster_StreamMaster");
        });

        modelBuilder.Entity<AdmissionTypeMaster>(entity =>
        {
            entity.ToTable("AdmissionTypeMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.College).WithMany(p => p.AdmissionTypeMasters)
                .HasForeignKey(d => d.CollegeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AdmissionTypeMaster_CollegeMaster");
        });

        modelBuilder.Entity<AdmittedTypeMaster>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_AdmittedToMaster");

            entity.ToTable("AdmittedTypeMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.College).WithMany(p => p.AdmittedTypeMasters)
                .HasForeignKey(d => d.CollegeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AdmittedToMaster_CollegeMaster");
        });

        modelBuilder.Entity<AllotmentCategoryMaster>(entity =>
        {
            entity.ToTable("AllotmentCategoryMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.College).WithMany(p => p.AllotmentCategoryMasters)
                .HasForeignKey(d => d.CollegeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AllotmentCategoryMaster_CollegeMaster");
        });

        modelBuilder.Entity<AnnualIncomeGmaster>(entity =>
        {
            entity.ToTable("AnnualIncomeGMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<ApplicationRejectReasonMaster>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_ApplicationRejectReason");

            entity.ToTable("ApplicationRejectReasonMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.College).WithMany(p => p.ApplicationRejectReasonMasters)
                .HasForeignKey(d => d.CollegeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ApplicationRejectReason_CollegeMaster");
        });

        modelBuilder.Entity<ApplicationStatusMaster>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_ApplicationStatus");

            entity.ToTable("ApplicationStatusMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.College).WithMany(p => p.ApplicationStatusMasters)
                .HasForeignKey(d => d.CollegeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ApplicationStatus_CollegeMaster");
        });

        modelBuilder.Entity<AppointmentTypeGmaster>(entity =>
        {
            entity.ToTable("AppointmentTypeGMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<BankMaster>(entity =>
        {
            entity.ToTable("BankMaster");

            entity.Property(e => e.AcholderName)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("ACHolderName");
            entity.Property(e => e.Acnumber)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("ACNumber");
            entity.Property(e => e.Actype)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("ACType");
            entity.Property(e => e.BranchAddress)
                .HasMaxLength(200)
                .IsUnicode(false);
            entity.Property(e => e.BranchName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Ifsc)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("IFSC");
            entity.Property(e => e.Micr)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("MICR");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.College).WithMany(p => p.BankMasters)
                .HasForeignKey(d => d.CollegeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_BankMaster_CollegeMaster");
        });

        modelBuilder.Entity<BloodGroupGmaster>(entity =>
        {
            entity.ToTable("BloodGroupGMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<BoardGmaster>(entity =>
        {
            entity.ToTable("BoardGMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<BranchMaster>(entity =>
        {
            entity.ToTable("BranchMaster");

            entity.Property(e => e.Abbreviation)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Accreditationstatus)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.AffiliationStatus)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.BranchPrefix)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Code)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.DateOfIntrodution).HasColumnType("datetime");
            entity.Property(e => e.MediumOfInstruction)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.College).WithMany(p => p.BranchMasters)
                .HasForeignKey(d => d.CollegeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_BranchMaster_CollegeMaster");

            entity.HasOne(d => d.Department).WithMany(p => p.BranchMasters)
                .HasForeignKey(d => d.DepartmentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_BranchMaster_Department");

            entity.HasOne(d => d.ProgramMaster).WithMany(p => p.BranchMasters)
                .HasForeignKey(d => d.ProgramMasterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_BranchMaster_ProgramMaster");

            entity.HasOne(d => d.StudyMaster).WithMany(p => p.BranchMasters)
                .HasForeignKey(d => d.StudyMasterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_BranchMaster_StudyMaster");
        });

        modelBuilder.Entity<CandidatureTypeGmaster>(entity =>
        {
            entity.ToTable("CandidatureTypeGMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<CasteCategoryGmaster>(entity =>
        {
            entity.ToTable("CasteCategoryGMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<CasteGmaster>(entity =>
        {
            entity.ToTable("CasteGMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<CollegeMaster>(entity =>
        {
            entity.ToTable("CollegeMaster");

            entity.Property(e => e.Address)
                .HasMaxLength(200)
                .IsUnicode(false);
            entity.Property(e => e.Category)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Cpemail)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("CPEmail");
            entity.Property(e => e.Cpmob)
                .HasMaxLength(12)
                .IsUnicode(false)
                .HasColumnName("CPMob");
            entity.Property(e => e.Cpname)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("CPName");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(1000)
                .IsUnicode(false);
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.PhoneNo)
                .HasMaxLength(12)
                .IsUnicode(false);
            entity.Property(e => e.ShortName)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Type)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.University)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
            entity.Property(e => e.Website)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<CommonGmaster>(entity =>
        {
            entity.ToTable("CommonGMaster");

            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<CommonGmasterDetail>(entity =>
        {
            entity.ToTable("CommonGMasterDetails");

            entity.Property(e => e.CommonGmasterId).HasColumnName("CommonGMasterId");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);

            entity.HasOne(d => d.CommonGmaster).WithMany(p => p.CommonGmasterDetails)
                .HasForeignKey(d => d.CommonGmasterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CommonGMasterDetails_CommonGMaster");
        });

        modelBuilder.Entity<CommonMaster>(entity =>
        {
            entity.ToTable("CommonMaster");

            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<CommonMasterDetail>(entity =>
        {
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);

            entity.HasOne(d => d.CommonMaster).WithMany(p => p.CommonMasterDetails)
                .HasForeignKey(d => d.CommonMasterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CommonMasterDetails_CommonMasterDetails");
        });

        modelBuilder.Entity<CommonSubjectListGmaster>(entity =>
        {
            entity.ToTable("CommonSubjectListGMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Type)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<CountryGmaster>(entity =>
        {
            entity.ToTable("CountryGMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<CourseCategoryGmaster>(entity =>
        {
            entity.ToTable("CourseCategoryGMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<CourseTypeMaster>(entity =>
        {
            entity.ToTable("CourseTypeMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.College).WithMany(p => p.CourseTypeMasters)
                .HasForeignKey(d => d.CollegeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CourseTypeMaster_CollegeMaster");
        });

        modelBuilder.Entity<DepartmentMaster>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Department");

            entity.ToTable("DepartmentMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.College).WithMany(p => p.DepartmentMasters)
                .HasForeignKey(d => d.CollegeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DepartmentMaster_CollegeMaster");

            entity.HasOne(d => d.Parent).WithMany(p => p.InverseParent)
                .HasForeignKey(d => d.ParentId)
                .HasConstraintName("FK_Department_Department");
        });

        modelBuilder.Entity<DesignationMaster>(entity =>
        {
            entity.ToTable("DesignationMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.College).WithMany(p => p.DesignationMasters)
                .HasForeignKey(d => d.CollegeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DesignationMaster_CollegeMaster");
        });

        modelBuilder.Entity<DistrictGmaster>(entity =>
        {
            entity.ToTable("DistrictGMaster");

            entity.HasIndex(e => e.StateId, "IX_DistrictGMaster_StateId");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.State).WithMany(p => p.DistrictGmasters)
                .HasForeignKey(d => d.StateId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DistrictGMaster_StateGMaster");
        });

        modelBuilder.Entity<DivisionMaster>(entity =>
        {
            entity.ToTable("DivisionMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.College).WithMany(p => p.DivisionMasters)
                .HasForeignKey(d => d.CollegeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DivisionMaster_CollegeMaster");
        });

        modelBuilder.Entity<DocumentMaster>(entity =>
        {
            entity.ToTable("DocumentMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(200)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.College).WithMany(p => p.DocumentMasters)
                .HasForeignKey(d => d.CollegeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DocumentMaster_CollegeMaster");
        });

        modelBuilder.Entity<DomicileGmaster>(entity =>
        {
            entity.ToTable("DomicileGMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<EmployeeTypeGmaster>(entity =>
        {
            entity.ToTable("EmployeeTypeGMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
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

        modelBuilder.Entity<EvaluationMaster>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_EvaluationGMaster");

            entity.ToTable("EvaluationMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.College).WithMany(p => p.EvaluationMasters)
                .HasForeignKey(d => d.CollegeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EvaluationGMaster_CollegeMaster");
        });

        modelBuilder.Entity<ExamTypeMaster>(entity =>
        {
            entity.ToTable("ExamTypeMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.College).WithMany(p => p.ExamTypeMasters)
                .HasForeignKey(d => d.CollegeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ExamTypeMaster_CollegeMaster");
        });

        modelBuilder.Entity<FeeHeadMaster>(entity =>
        {
            entity.ToTable("FeeHeadMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(1000)
                .IsUnicode(false);
            entity.Property(e => e.Fees).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.College).WithMany(p => p.FeeHeadMasters)
                .HasForeignKey(d => d.CollegeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_FeeHeadMaster_CollegeMaster");

            entity.HasOne(d => d.FeeHeadTypeMaster).WithMany(p => p.FeeHeadMasters)
                .HasForeignKey(d => d.FeeHeadTypeMasterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_FeeHeadMaster_FeeHeadTypeMaster");
        });

        modelBuilder.Entity<FeeHeadTypeMaster>(entity =>
        {
            entity.ToTable("FeeHeadTypeMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.College).WithMany(p => p.FeeHeadTypeMasters)
                .HasForeignKey(d => d.CollegeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_FeeHeadTypeMaster_CollegeMaster");
        });

        modelBuilder.Entity<HandicapTypeGmaster>(entity =>
        {
            entity.ToTable("HandicapTypeGMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<MinorityDetailsGmaster>(entity =>
        {
            entity.ToTable("MinorityDetailsGMaster");

            entity.HasIndex(e => e.MinorityMasterId, "IX_MinorityDetailsGMaster_MinorityMasterId");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.MinorityMaster).WithMany(p => p.MinorityDetailsGmasters)
                .HasForeignKey(d => d.MinorityMasterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_MinorityDetailsGMaster_MinorityGMaster");
        });

        modelBuilder.Entity<MinorityGmaster>(entity =>
        {
            entity.ToTable("MinorityGMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<ModeOfAdmissionMaster>(entity =>
        {
            entity.ToTable("ModeOfAdmissionMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.College).WithMany(p => p.ModeOfAdmissionMasters)
                .HasForeignKey(d => d.CollegeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ModeOfAdmissionMaster_CollegeMaster");
        });

        modelBuilder.Entity<MotherTongueGmaster>(entity =>
        {
            entity.ToTable("MotherTongueGMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<ProgramDetailMaster>(entity =>
        {
            entity.ToTable("ProgramDetailMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.ProgramMaster).WithMany(p => p.ProgramDetailMasters)
                .HasForeignKey(d => d.ProgramMasterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ProgramDetailMaster_ProgramMaster");

            entity.HasOne(d => d.ProgramType).WithMany(p => p.ProgramDetailMasters)
                .HasForeignKey(d => d.ProgramTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ProgramDetailMaster_ProgramTypeMaster");

            entity.HasOne(d => d.SyllabusPatternMaster).WithMany(p => p.ProgramDetailMasters)
                .HasForeignKey(d => d.SyllabusPatternMasterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ProgramDetailMaster_SyllabusPatternMaster");
        });

        modelBuilder.Entity<ProgramMaster>(entity =>
        {
            entity.ToTable("ProgramMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(1000)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ShortName)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.College).WithMany(p => p.ProgramMasters)
                .HasForeignKey(d => d.CollegeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ProgramMaster_CollegeMaster");

            entity.HasOne(d => d.ProgramType).WithMany(p => p.ProgramMasters)
                .HasForeignKey(d => d.ProgramTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ProgramMaster_ProgramTypeMaster");

            entity.HasOne(d => d.Stream).WithMany(p => p.ProgramMasters)
                .HasForeignKey(d => d.StreamId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ProgramMaster_StreamMaster");
        });

        modelBuilder.Entity<ProgramTypeMaster>(entity =>
        {
            entity.ToTable("ProgramTypeMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.College).WithMany(p => p.ProgramTypeMasters)
                .HasForeignKey(d => d.CollegeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ProgramTypeMaster_CollegeMaster");
        });

        modelBuilder.Entity<ProgramYearMaster>(entity =>
        {
            entity.ToTable("ProgramYearMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(200)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.College).WithMany(p => p.ProgramYearMasters)
                .HasForeignKey(d => d.CollegeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ProgramYearMaster_CollegeMaster");
        });

        modelBuilder.Entity<RelationGmaster>(entity =>
        {
            entity.ToTable("RelationGMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<ReligionGmaster>(entity =>
        {
            entity.ToTable("ReligionGMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<ReligionMaster>(entity =>
        {
            entity.ToTable("ReligionMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<ReservationCategoryMaster>(entity =>
        {
            entity.ToTable("ReservationCategoryMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.College).WithMany(p => p.ReservationCategoryMasters)
                .HasForeignKey(d => d.CollegeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ReservationCategoryMaster_CollegeMaster");
        });

        modelBuilder.Entity<SeatTypeMaster>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_SeatTypeGMaster");

            entity.ToTable("SeatTypeMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.College).WithMany(p => p.SeatTypeMasters)
                .HasForeignKey(d => d.CollegeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SeatTypeMaster_SeatTypeMaster");
        });

        modelBuilder.Entity<SemesterDetailsMaster>(entity =>
        {
            entity.ToTable("SemesterDetailsMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.EndDate).HasColumnType("date");
            entity.Property(e => e.StartDate).HasColumnType("date");
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
            entity.Property(e => e.Year)
                .HasMaxLength(20)
                .IsUnicode(false);

            entity.HasOne(d => d.AcademicYear).WithMany(p => p.SemesterDetailsMasters)
                .HasForeignKey(d => d.AcademicYearId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SemesterDetailsMaster_AcademicYearMaster");

            entity.HasOne(d => d.ProgramMaster).WithMany(p => p.SemesterDetailsMasters)
                .HasForeignKey(d => d.ProgramMasterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SemesterDetailsMaster_ProgramMaster");

            entity.HasOne(d => d.ProgramYear).WithMany(p => p.SemesterDetailsMasters)
                .HasForeignKey(d => d.ProgramYearId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SemesterDetailsMaster_ProgramYearMaster");

            entity.HasOne(d => d.SemesterMaster).WithMany(p => p.SemesterDetailsMasters)
                .HasForeignKey(d => d.SemesterMasterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SemesterDetailsMaster_SemesterGMaster");
        });

        modelBuilder.Entity<SemesterGmaster>(entity =>
        {
            entity.ToTable("SemesterGMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<SmstemplateMaster>(entity =>
        {
            entity.ToTable("SMSTemplateMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Template)
                .HasMaxLength(200)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.College).WithMany(p => p.SmstemplateMasters)
                .HasForeignKey(d => d.CollegeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SMSTemplateMaster_CollegeMaster");
        });

        modelBuilder.Entity<SmtpconfigMaster>(entity =>
        {
            entity.ToTable("SMTPConfigMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.College).WithMany(p => p.SmtpconfigMasters)
                .HasForeignKey(d => d.CollegeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SMTPConfigMaster_CollegeMaster");
        });

        modelBuilder.Entity<StateGmaster>(entity =>
        {
            entity.ToTable("StateGMaster");

            entity.HasIndex(e => e.CountryId, "IX_StateGMaster_CountryId");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.Country).WithMany(p => p.StateGmasters)
                .HasForeignKey(d => d.CountryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StateGMaster_CountryGMaster");
        });

        modelBuilder.Entity<StreamMaster>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_StreamMaster1");

            entity.ToTable("StreamMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(200)
                .IsFixedLength();
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.College).WithMany(p => p.StreamMasters)
                .HasForeignKey(d => d.CollegeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StreamMaster_CollegeMaster");
        });

        modelBuilder.Entity<StudyMaster>(entity =>
        {
            entity.ToTable("StudyMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.College).WithMany(p => p.StudyMasters)
                .HasForeignKey(d => d.CollegeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudyMaster_CollegeMaster");
        });

        modelBuilder.Entity<SubCasteGmaster>(entity =>
        {
            entity.ToTable("SubCasteGMaster");

            entity.HasIndex(e => e.CasteMasterId, "IX_SubCasteGMaster_CasteMasterId");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.CasteMaster).WithMany(p => p.SubCasteGmasters)
                .HasForeignKey(d => d.CasteMasterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SubCasteGMaster_CasteGMaster");
        });

        modelBuilder.Entity<SyllabusPatternMaster>(entity =>
        {
            entity.ToTable("SyllabusPatternMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.AcademicYearMaster).WithMany(p => p.SyllabusPatternMasters)
                .HasForeignKey(d => d.AcademicYearMasterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SyllabusPatternMaster_AcademicYearMaster");

            entity.HasOne(d => d.College).WithMany(p => p.SyllabusPatternMasters)
                .HasForeignKey(d => d.CollegeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SyllabusPatternMaster_CollegeMaster");

            entity.HasOne(d => d.ProgramMaster).WithMany(p => p.SyllabusPatternMasters)
                .HasForeignKey(d => d.ProgramMasterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SyllabusPatternMaster_ProgramMaster");
        });

        modelBuilder.Entity<TalukaGmaster>(entity =>
        {
            entity.ToTable("TalukaGMaster");

            entity.HasIndex(e => e.DistrictId, "IX_TalukaGMaster_DistrictId");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.District).WithMany(p => p.TalukaGmasters)
                .HasForeignKey(d => d.DistrictId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TalukaGMaster_DistrictGMaster");
        });

        modelBuilder.Entity<TimeSlotGmaster>(entity =>
        {
            entity.ToTable("TimeSlotGMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.FromTime).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ToTime).HasColumnType("datetime");
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<UserActivityLog>(entity =>
        {
            entity.ToTable("UserActivityLog");

            entity.Property(e => e.ActivityDateTime).HasColumnType("datetime");
            entity.Property(e => e.Ipaddress)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("IPAddress");
            entity.Property(e => e.Operation)
                .HasMaxLength(12)
                .IsUnicode(false);
            entity.Property(e => e.TableName)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.College).WithMany(p => p.UserActivityLogs)
                .HasForeignKey(d => d.CollegeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserActivityLog_CollegeMaster");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
