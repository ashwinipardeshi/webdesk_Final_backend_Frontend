using System;
using System.Collections.Generic;
using ExamWebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ExamWebAPI.Data;

public partial class ExamDevFinalDbContext : DbContext
{
    protected readonly IConfiguration Configuration;

    public ExamDevFinalDbContext(DbContextOptions<ExamDevFinalDbContext> options, IConfiguration configuration)
        : base(options)
    {
        Configuration = configuration;
    }

    public virtual DbSet<ErrorLog> ErrorLogs { get; set; }

    public virtual DbSet<Exam> Exams { get; set; }

    public virtual DbSet<ExamTest> ExamTests { get; set; }

    public virtual DbSet<Question> Questions { get; set; }

    public virtual DbSet<UserActivityLog> UserActivityLogs { get; set; }

    //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    //#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
    //    => optionsBuilder.UseSqlServer("Server=103.172.151.211,1455;Database=ExamDevDB;User Id=sa;password=USg1#E729D19L;TrustServerCertificate=True;");
    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        options.UseSqlServer(Configuration.GetConnectionString("ExamWebAPICon"));
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

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

        modelBuilder.Entity<Exam>(entity =>
        {
            entity.ToTable("Exam");

            entity.Property(e => e.Center)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ExamDate).HasColumnType("datetime");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<ExamTest>(entity =>
        {
            entity.ToTable("ExamTest");

            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Question>(entity =>
        {
            entity.Property(e => e.CorrectAns)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Option1)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Option2)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Option3)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Option4)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Question1)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Question");

            entity.HasOne(d => d.Exam).WithMany(p => p.Questions)
                .HasForeignKey(d => d.ExamId)
                .HasConstraintName("FK_Questions_Exam");
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
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

