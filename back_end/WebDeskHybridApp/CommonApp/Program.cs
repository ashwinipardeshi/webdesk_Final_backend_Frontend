using CommonApp.Services.Contract;
using CommonApp.Services.Implementation;
using Microsoft.Extensions.DependencyInjection;
namespace CommonApp
{
    internal class Program
    {
        static void Main(string[] args)
        {
            var serviceProvider = new ServiceCollection().AddSingleton<IEmailService, EmailService>().BuildServiceProvider();
            var emailService = serviceProvider.GetRequiredService<IEmailService>();
            //bool op = await emailService.sendMail("vijaybadgujarpune@gmail.com", "subfinal", "bodyfinal");
            //Console.WriteLine(op);
        }
    }
}