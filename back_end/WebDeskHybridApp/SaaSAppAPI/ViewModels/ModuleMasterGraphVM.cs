using SaaSAppAPI.ViewModels.Common;

namespace SaaSAppAPI.ViewModels
{
    public class ModuleMasterGraphVM 
    {
        public long Id { get; set; }

        public string Name { get; set; } = null!;

        public string? Description { get; set; }

        public bool IsActive { get; set; }

        public bool IsDeleted { get; set; }

        public long CreatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public long? UpdatedBy { get; set; }

        public DateTime? UpdatedDate { get; set; }


    }
}
