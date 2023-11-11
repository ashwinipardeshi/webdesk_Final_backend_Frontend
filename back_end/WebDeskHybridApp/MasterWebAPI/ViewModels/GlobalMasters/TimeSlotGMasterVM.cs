using MasterWebAPI.ViewModels.Common;
using System.ComponentModel.DataAnnotations;

namespace MasterWebAPI.ViewModels.GlobalMasters
{
    public class TimeSlotGMasterVM : CommonProps
    {
        [Required,DataType(DataType.Date)]
        public DateTime FromTime { get; set; }

        [Required,DataType(DataType.Date)]
        public DateTime ToTime { get; set; }
    }
}
