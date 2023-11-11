namespace SaaSAppAPI.ViewModels
{
    public class CollegeMainMasterVM
    {
        public long Id { get; set; }

        public long? CollegeMasterId { get; set; }

        public string Name { get; set; } = null!;

        public string? ShortName { get; set; }

        public string? Description { get; set; }

        public string? University { get; set; }

        public string? Category { get; set; }

        public string? Address { get; set; }

        public string? Website { get; set; }

        public string? Email { get; set; }

        public string? PhoneNo { get; set; }

        public string? Cpname { get; set; }

        public string? Cpemail { get; set; }

        public string? Cpmob { get; set; }

        public string? Type { get; set; }

        public bool IsActive { get; set; }

        public bool IsDeleted { get; set; }

        public long CreatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public long? UpdatedBy { get; set; }

        public DateTime? UpdatedDate { get; set; }

    }
}
