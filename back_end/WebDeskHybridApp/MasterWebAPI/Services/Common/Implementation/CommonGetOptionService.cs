using MasterWebAPI.Data;
using MasterWebAPI.Services.Common.Contract;
using MasterWebAPI.ViewModels.Common;
using Microsoft.EntityFrameworkCore;

namespace MasterWebAPI.Services.Common.Implementation
{
    public class CommonGetOptionService: ICommonGetOptionService
    {
        private readonly MasterDevFinalDbContext _context;

        public CommonGetOptionService(MasterDevFinalDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
        }

        /// <summary>
        /// GetMasterNameFromId
        /// </summary>
        /// <param name="tablename"></param>
        /// <param name="Id"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentException"></exception>
        public async Task<string?> GetMasterNameFromId(string tablename, long Id)
        {
            string ? name = null;
               switch (tablename)
            {
                case "AcademicYearMasters":
                    name = await _context.AcademicYearMasters.Where(m => m.Id == Id && m.IsActive == true && m.IsDeleted == false).Select(c => c.Name).FirstOrDefaultAsync(); break;
                case "BranchMasters":
                  name = await _context.BranchMasters.Where(m => m.Id == Id && m.IsActive == true && m.IsDeleted == false).Select(s => s.BranchPrefix).FirstOrDefaultAsync(); break;
    
                default:
                    return null;
            }
            return name;
        }

        public async Task<List<OptionVM>> GetMasterOptions(string tablename)
        {
            List<OptionVM> res = new List<OptionVM>();
            switch (tablename)
            {
                case "CollegeMasters":
                    {
                        res = await _context.CollegeMasters.Where(e => e.IsActive && e.IsDeleted == false).Select(e => new OptionVM()
                        {
                            Id = e.Id,
                            Name = e.Name
                        }).ToListAsync<OptionVM>();
                        break;
                    }
                case "AcademicYearMasters":
                    {
                        res = await _context.AcademicYearMasters.Where(e => e.IsActive && e.IsDeleted == false).Select(e => new OptionVM()
                        {
                            Id = e.Id,
                            Name = e.Name
                        }).ToListAsync<OptionVM>();
                        break;
                    }
                case "AdmissionTypeMasters":
                    {
                        res = await _context.AdmissionTypeMasters.Where(e => e.IsActive && e.IsDeleted == false).Select(e => new OptionVM()
                        {
                            Id = e.Id,
                            Name = e.Name
                        }).ToListAsync<OptionVM>();
                        break;
                    }
                case "SeatTypeMasters":
                    {
                        res = await _context.SeatTypeMasters.Where(e => e.IsActive && e.IsDeleted == false).Select(e => new OptionVM()
                        {
                            Id = e.Id,
                            Name = e.Name
                        }).ToListAsync<OptionVM>();
                        break;
                    }
                case "CandidatureTypeGmasters":
                    {
                        res = await _context.CandidatureTypeGmasters.Where(e => e.IsActive && e.IsDeleted == false).Select(e => new OptionVM()
                        {
                            Id = e.Id,
                            Name = e.Name
                        }).ToListAsync<OptionVM>();
                        break;
                    }
                case "DomicileGmasters":
                    {
                        res = await _context.DomicileGmasters.Where(e => e.IsActive && e.IsDeleted == false).Select(e => new OptionVM()
                        {
                            Id = e.Id,
                            Name = e.Name
                        }).ToListAsync<OptionVM>();
                        break;
                    }
                case "ReligionGmasters":
                    {
                        res = await _context.ReligionGmasters.Where(e => e.IsActive && e.IsDeleted == false).Select(e => new OptionVM()
                        {
                            Id = e.Id,
                            Name = e.Name
                        }).ToListAsync<OptionVM>();
                        break;
                    }
                case "CasteGmasters":
                    {
                        res = await _context.CasteGmasters.Where(e => e.IsActive && e.IsDeleted == false).Select(e => new OptionVM()
                        {
                            Id = e.Id,
                            Name = e.Name
                        }).ToListAsync<OptionVM>();
                        break;
                    }
                case "SubCasteGmasters":
                    {
                        res = await _context.SubCasteGmasters.Where(e => e.IsActive && e.IsDeleted == false).Select(e => new OptionVM()
                        {
                            Id = e.Id,
                            Name = e.Name
                        }).ToListAsync<OptionVM>();
                        break;
                    }
                case "MinorityGmasters":
                    {
                        res = await _context.MinorityGmasters.Where(e => e.IsActive && e.IsDeleted == false).Select(e => new OptionVM()
                        {
                            Id = e.Id,
                            Name = e.Name
                        }).ToListAsync<OptionVM>();
                        break;
                    }
                case "MinorityDetailsGmasters":
                    {
                        res = await _context.MinorityDetailsGmasters.Where(e => e.IsActive && e.IsDeleted == false).Select(e => new OptionVM()
                        {
                            Id = e.Id,
                            Name = e.Name
                        }).ToListAsync<OptionVM>();
                        break;
                    }
                case "CountryGmasters":
                    {
                        res = await _context.CountryGmasters.Where(e => e.IsActive && e.IsDeleted == false).Select(e => new OptionVM()
                        {
                            Id = e.Id,
                            Name = e.Name
                        }).ToListAsync<OptionVM>();
                        break;
                    }
                case "StateGmasters":
                    {
                        res = await _context.StateGmasters.Where(e => e.IsActive && e.IsDeleted == false).Select(e => new OptionVM()
                        {
                            Id = e.Id,
                            Name = e.Name
                        }).ToListAsync<OptionVM>();
                        break;
                    }
                case "DistrictGmasters":
                    {
                        res = await _context.DistrictGmasters.Where(e => e.IsActive && e.IsDeleted == false).Select(e => new OptionVM()
                        {
                            Id = e.Id,
                            Name = e.Name
                        }).ToListAsync<OptionVM>();
                        break;
                    }
                case "TalukaGmasters":
                    {
                        res = await _context.TalukaGmasters.Where(e => e.IsActive && e.IsDeleted == false).Select(e => new OptionVM()
                        {
                            Id = e.Id,
                            Name = e.Name
                        }).ToListAsync<OptionVM>();
                        break;
                    }

                case "ProgramYearMasters":
                    {
                        res = await _context.ProgramYearMasters.Where(e => e.IsActive && e.IsDeleted == false).Select(e => new OptionVM()
                        {
                            Id = e.Id,
                            Name = e.Name
                        }).ToListAsync<OptionVM>();
                        break;
                    }
                case "BranchMasters":
                    {
                        res = await _context.BranchMasters.Where(e => e.IsActive && e.IsDeleted == false).Select(e => new OptionVM()
                        {
                            Id = e.Id,
                            Name = e.Name
                        }).ToListAsync<OptionVM>();
                        break;
                    }
                case "AcademicStatusMasters":
                    {
                        res = await _context.AcademicStatusMasters.Where(e => e.IsActive && e.IsDeleted == false).Select(e => new OptionVM()
                        {
                            Id = e.Id,
                            Name = e.Name
                        }).ToListAsync<OptionVM>();
                        break;
                    }
                case "ModeOfAdmissionMasters":
                    {
                        res = await _context.ModeOfAdmissionMasters.Where(e => e.IsActive && e.IsDeleted == false).Select(e => new OptionVM()
                        {
                            Id = e.Id,
                            Name = e.Name
                        }).ToListAsync<OptionVM>();
                        break;
                    }
                case "AdmittedTypeMasters":
                    {
                        res = await _context.AdmittedTypeMasters.Where(e => e.IsActive && e.IsDeleted == false).Select(e => new OptionVM()
                        {
                            Id = e.Id,
                            Name = e.Name
                        }).ToListAsync<OptionVM>();
                        break;
                    }
                case "AllotmentCategoryMasters":
                    {
                        res = await _context.AllotmentCategoryMasters.Where(e => e.IsActive && e.IsDeleted == false).Select(e => new OptionVM()
                        {
                            Id = e.Id,
                            Name = e.Name
                        }).ToListAsync<OptionVM>();
                        break;
                    }
                case "BloodGroupGmasters":
                    {
                        res = await _context.BloodGroupGmasters.Where(e => e.IsActive && e.IsDeleted == false).Select(e => new OptionVM()
                        {
                            Id = e.Id,
                            Name = e.Name
                        }).ToListAsync<OptionVM>();
                        break;
                    }
                case "MotherTongueGmasters":
                    {
                        res = await _context.MotherTongueGmasters.Where(e => e.IsActive && e.IsDeleted == false).Select(e => new OptionVM()
                        {
                            Id = e.Id,
                            Name = e.Name
                        }).ToListAsync<OptionVM>();
                        break;
                    }
                case "HandicapTypeGmasters":
                    {
                        res = await _context.HandicapTypeGmasters.Where(e => e.IsActive && e.IsDeleted == false).Select(e => new OptionVM()
                        {
                            Id = e.Id,
                            Name = e.Name
                        }).ToListAsync<OptionVM>();
                        break;
                    }
                case "ApplicationRejectReasonMasters":
                    {
                        res = await _context.ApplicationRejectReasonMasters.Where(e => e.IsActive && e.IsDeleted == false).Select(e => new OptionVM()
                        {
                            Id = e.Id,
                            Name = e.Name
                        }).ToListAsync<OptionVM>();
                        break;
                    }
                case "CasteCategoryGmasters":
                    {
                        res = await _context.CasteCategoryGmasters.Where(e => e.IsActive && e.IsDeleted == false).Select(e => new OptionVM()
                        {
                            Id = e.Id,
                            Name = e.Name
                        }).ToListAsync<OptionVM>();
                        break;
                    }
                case "ApplicationStatusMasters":
                    {
                        res = await _context.ApplicationStatusMasters.Where(e => e.IsActive && e.IsDeleted == false).Select(e => new OptionVM()
                        {
                            Id = e.Id,
                            Name = e.Name
                        }).ToListAsync<OptionVM>();
                        break;
                    }
                case "ReservationCategoryMasters":
                    {
                        res = await _context.ReservationCategoryMasters.Where(e => e.IsActive && e.IsDeleted == false).Select(e => new OptionVM()
                        {
                            Id = e.Id,
                            Name = e.Name
                        }).ToListAsync<OptionVM>();
                        break;
                    }

                case "ProgramMasters":
                    {
                        res = await _context.ProgramMasters.Where(e => e.IsActive && e.IsDeleted == false).Select(e => new OptionVM()
                        {
                            Id = e.Id,
                            Name = e.Name
                        }).ToListAsync<OptionVM>();
                        break;
                    }
            }
            return res;
        }
    }
}
