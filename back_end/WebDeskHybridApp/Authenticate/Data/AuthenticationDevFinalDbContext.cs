using Authenticate.Models;
using Microsoft.EntityFrameworkCore;

namespace Authenticate.Data;

public partial class AuthenticationDevFinalDbContext : DbContext
{
    protected readonly IConfiguration _configuration;

    public AuthenticationDevFinalDbContext(DbContextOptions<AuthenticationDevFinalDbContext> options, IConfiguration configuration)
        : base(options)
    {
        _configuration = configuration;
    }
    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        options.UseSqlServer(_configuration.GetConnectionString("AuthenticateDbCon"));
    }

    // Update below code

    public virtual DbSet<ErrorLog> ErrorLogs { get; set; }

    public virtual DbSet<MenuMaster> MenuMasters { get; set; }

    public virtual DbSet<OnlineUser> OnlineUsers { get; set; }

    public virtual DbSet<RoleMaster> RoleMasters { get; set; }

    public virtual DbSet<RoleMenuMaster> RoleMenuMasters { get; set; }

    public virtual DbSet<UserLoginActivity> UserLoginActivities { get; set; }

    public virtual DbSet<UserMaster> UserMasters { get; set; }


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

        modelBuilder.Entity<MenuMaster>(entity =>
        {
            entity.ToTable("MenuMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Icon)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
            entity.Property(e => e.Url)
                .HasMaxLength(100)
                .IsUnicode(false);

            entity.HasOne(d => d.Parent).WithMany(p => p.InverseParent)
                .HasForeignKey(d => d.ParentId)
                .HasConstraintName("FK_MenuMaster_MenuMaster");
        });

        modelBuilder.Entity<OnlineUser>(entity =>
        {
            entity.ToTable("OnlineUser");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.EmailId)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Mobile)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Password)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.RefTableName)
                .HasMaxLength(100)
                .IsUnicode(false);

            entity.HasOne(d => d.Role).WithMany(p => p.OnlineUsers)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_OnlineUser_RoleMaster");
        });

        modelBuilder.Entity<RoleMaster>(entity =>
        {
            entity.ToTable("RoleMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(1000)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<RoleMenuMaster>(entity =>
        {
            entity.HasKey(e => new { e.RoleId, e.MenuId });

            entity.ToTable("RoleMenuMaster");

            entity.HasOne(d => d.Menu).WithMany(p => p.RoleMenuMasters)
                .HasForeignKey(d => d.MenuId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RoleMenuMaster_MenuMaster");

            entity.HasOne(d => d.Role).WithMany(p => p.RoleMenuMasters)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RoleMenuMaster_RoleMaster");
        });

        modelBuilder.Entity<UserLoginActivity>(entity =>
        {
            entity.ToTable("UserLoginActivity");

            entity.Property(e => e.LoginDateTime).HasColumnType("datetime");
            entity.Property(e => e.LoginIpaddress)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("LoginIPAddress");
            entity.Property(e => e.LogoutAddress)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.LogoutDateTime).HasColumnType("datetime");

            entity.HasOne(d => d.User).WithMany(p => p.UserLoginActivities)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserLoginActivity_UserMaster");
        });

        modelBuilder.Entity<UserMaster>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_User");

            entity.ToTable("UserMaster");

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.EmailId)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Mobile)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Password)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.RefTableName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.Role).WithMany(p => p.UserMasters)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserMaster_RoleMaster");
        });

        OnModelCreatingPartial(modelBuilder);
    }


    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
