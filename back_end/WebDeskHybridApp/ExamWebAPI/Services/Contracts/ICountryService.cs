using ExamWebAPI.ViewModels;

namespace ExamWebAPI.Services.Contracts
{
    public interface ICountryService
    {
        bool Insert(CountryGMasterVM countryGMasterVM);
    }
}
