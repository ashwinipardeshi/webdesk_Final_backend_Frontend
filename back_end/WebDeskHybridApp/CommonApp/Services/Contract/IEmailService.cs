namespace CommonApp.Services.Contract
{
    public interface IEmailService
    {
       Task<bool> sendMail(string useremail, string subject, string body);
    }
}
