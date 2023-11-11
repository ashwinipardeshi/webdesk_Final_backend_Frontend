using CommonApp.Services.Contract;
using System.Net;
using System.Net.Mail;

namespace CommonApp.Services.Implementation
{
    public class EmailService : IEmailService
    {
        public async Task<bool> sendMail(string useremail, string subject, string body)
        {
            try
            {
                using (MailMessage mail = new MailMessage())
                {
                    mail.From = new MailAddress("noreplywebdeskerp@gmail.com");
                    mail.To.Add(useremail);
                    //if (!String.IsNullOrEmpty(cc1))
                    //    mail.CC.Add(cc1);
                    mail.Subject = subject;
                    mail.Body = body;
                    mail.IsBodyHtml = true;
                    using (SmtpClient smtp = new SmtpClient())
                    {
                        smtp.Host = "smtp.gmail.com";
                        smtp.Port = 587;
                        smtp.UseDefaultCredentials = false;
                        NetworkCredential NetworkCred = new NetworkCredential("noreplywebdeskerp@gmail.com", "wppulbtipmgqkdta");
                        smtp.EnableSsl = true;
                        smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                        smtp.Credentials = NetworkCred;
                        smtp.Timeout = 200000;
                        await smtp.SendMailAsync(mail);
                        return true;
                    }
                }
            }
            catch (Exception e)
            {
                return false;
            }
        }
    }
}
