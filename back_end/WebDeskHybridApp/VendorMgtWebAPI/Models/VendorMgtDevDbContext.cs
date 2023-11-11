using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace VendorMgtWebAPI.Models;

public partial class VendorMgtDevDbContext : DbContext
{
    public VendorMgtDevDbContext()
    {
    }

    public VendorMgtDevDbContext(DbContextOptions<VendorMgtDevDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<ErrorLog> ErrorLogs { get; set; }

    public virtual DbSet<UserActivityLog> UserActivityLogs { get; set; }

    public virtual DbSet<VendorBanksMaster> VendorBanksMasters { get; set; }

    public virtual DbSet<VendorBill> VendorBills { get; set; }

    public virtual DbSet<VendorMaster> VendorMasters { get; set; }

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

        modelBuilder.Entity<VendorBanksMaster>(entity =>
        {
            entity.ToTable("VendorBanksMaster");

            entity.Property(e => e.AccountName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.AccountNo)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.AccountType)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.BranchName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Ifsccode)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("IFSCCode");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.VendorMaster).WithMany(p => p.VendorBanksMasters)
                .HasForeignKey(d => d.VendorMasterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_VendorBanksMaster_VendorMaster");
        });

        modelBuilder.Entity<VendorBill>(entity =>
        {
            entity.Property(e => e.BillDate).HasColumnType("datetime");
            entity.Property(e => e.BillNo)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.BillType)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Cgst).HasColumnName("CGST");
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Gsttotal).HasColumnName("GSTTotal");
            entity.Property(e => e.Igst).HasColumnName("IGST");
            entity.Property(e => e.InwardDate).HasColumnType("datetime");
            entity.Property(e => e.InwardNo)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Remark)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Section)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Sgst).HasColumnName("SGST");
            entity.Property(e => e.Tan)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("TAN");
            entity.Property(e => e.Tds).HasColumnName("TDS");
            entity.Property(e => e.Tdsamount).HasColumnName("TDSAmount");
            entity.Property(e => e.Ugst).HasColumnName("UGST");
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.VendorMaster).WithMany(p => p.VendorBills)
                .HasForeignKey(d => d.VendorMasterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_VendorBills_VendorMaster");
        });

        modelBuilder.Entity<VendorMaster>(entity =>
        {
            entity.ToTable("VendorMaster");

            entity.Property(e => e.Address)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.ContactNo)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.EmailId)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Gstno)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("GSTNo");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Pan)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("PAN");
            entity.Property(e => e.Tan)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("TAN");
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
            entity.Property(e => e.Website)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }
    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
