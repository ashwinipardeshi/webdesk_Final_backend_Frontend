using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace SaaSAppAPI.Models;

public partial class SaaSdevDbContext : DbContext
{
    public SaaSdevDbContext()
    {
    }

    public SaaSdevDbContext(DbContextOptions<SaaSdevDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<CollegeMainMaster> CollegeMainMasters { get; set; }

    public virtual DbSet<CollegeModule> CollegeModules { get; set; }

    public virtual DbSet<CollegeSubscription> CollegeSubscriptions { get; set; }

    public virtual DbSet<ErrorLog> ErrorLogs { get; set; }

    public virtual DbSet<ModuleMaster> ModuleMasters { get; set; }

    public virtual DbSet<Pricing> Pricings { get; set; }

    public virtual DbSet<SubscriptionMaster> SubscriptionMasters { get; set; }

    public virtual DbSet<UserActivityLog> UserActivityLogs { get; set; }

    public virtual DbSet<UserMaster> UserMasters { get; set; }

   
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CollegeMainMaster>(entity =>
        {
            entity.ToTable("CollegeMainMaster");

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
                .HasMaxLength(50)
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

        modelBuilder.Entity<CollegeModule>(entity =>
        {
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.CollegeSubscription).WithMany(p => p.CollegeModules)
                .HasForeignKey(d => d.CollegeSubscriptionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CollegeModules_CollegeSubscriptions");

            entity.HasOne(d => d.ModuleMaster).WithMany(p => p.CollegeModules)
                .HasForeignKey(d => d.ModuleMasterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CollegeModules_ModuleMaster");
        });

        modelBuilder.Entity<CollegeSubscription>(entity =>
        {
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.FromDate).HasColumnType("datetime");
            entity.Property(e => e.ToDate).HasColumnType("datetime");
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.College).WithMany(p => p.CollegeSubscriptions)
                .HasForeignKey(d => d.CollegeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CollegeSubscriptions_CollegeMainMaster");

            entity.HasOne(d => d.SubscriptionMaster).WithMany(p => p.CollegeSubscriptions)
                .HasForeignKey(d => d.SubscriptionMasterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CollegeSubscriptions_SubscriptionMaster");
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

        modelBuilder.Entity<ModuleMaster>(entity =>
        {
            entity.ToTable("ModuleMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<Pricing>(entity =>
        {
            entity.ToTable("Pricing");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.ModuleMaster).WithMany(p => p.Pricings)
                .HasForeignKey(d => d.ModuleMasterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Pricing_ModuleMaster");

            entity.HasOne(d => d.SubscriptionMaster).WithMany(p => p.Pricings)
                .HasForeignKey(d => d.SubscriptionMasterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Pricing_SubscriptionMaster");
        });

        modelBuilder.Entity<SubscriptionMaster>(entity =>
        {
            entity.ToTable("SubscriptionMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
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
        });

        modelBuilder.Entity<UserMaster>(entity =>
        {
            entity.ToTable("UserMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Designation)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.EmailId)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Password)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
