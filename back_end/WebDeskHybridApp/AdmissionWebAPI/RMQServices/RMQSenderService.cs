using AdmissionWebAPI.Utility;
using Newtonsoft.Json;
using RabbitMQ.Client;
using System.Text;

namespace AdmissionWebAPI.RMQServices
{
    public class RMQSenderService<T>
    {
        public bool sendData(T data, string queueName, string routeKey)
        {
            var RabbitMQServer = "";
            var RabbitMQUserName = "";
            var RabbutMQPassword = "";

            if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Production")
            {
                RabbitMQServer = Environment.GetEnvironmentVariable("RABBIT_MQ_SERVER");
                RabbitMQUserName = Environment.GetEnvironmentVariable("RABBIT_MQ_USERNAME");
                RabbutMQPassword = Environment.GetEnvironmentVariable("RABBIT_MQ_PASSWORD");
            }
            else
            {
                RabbitMQServer = StaticConfigurationManager.AppSetting["RabbitMQ:RabbitURL"];
                RabbitMQUserName = StaticConfigurationManager.AppSetting["RabbitMQ:Username"];
                RabbutMQPassword = StaticConfigurationManager.AppSetting["RabbitMQ:Password"];
            }

            try
            {
                var factory = new ConnectionFactory()
                { HostName = RabbitMQServer, UserName = RabbitMQUserName, Password = RabbutMQPassword };
                using (var connection = factory.CreateConnection())
                using (var channel = connection.CreateModel())
                {
                    //Direct Exchange Details like name and type of exchange
                    channel.ExchangeDeclare(StaticConfigurationManager.AppSetting["RabbitMqSettings:ExchangeName"], StaticConfigurationManager.AppSetting["RabbitMqSettings:ExchhangeType"]);

                    //Declare Queue with Name and a few property related to Queue like durabality of msg, auto delete and many more
                    channel.QueueDeclare(queue: StaticConfigurationManager.AppSetting[$"RabbitMqSettings:{queueName}"],
                                         durable: true,
                                         exclusive: false,
                                         autoDelete: false,
                                         arguments: null);

                    //Bind Queue with Exhange and routing details
                    channel.QueueBind(queue: StaticConfigurationManager.AppSetting[$"RabbitMqSettings:{queueName}"], exchange: StaticConfigurationManager.AppSetting["RabbitMqSettings:ExchangeName"], routingKey: StaticConfigurationManager.AppSetting[$"RabbitMqSettings:{routeKey}"]);

                    //Seriliaze object using Newtonsoft library
                    string serData = JsonConvert.SerializeObject(data);

                    var body = Encoding.UTF8.GetBytes(serData);
                    var properties = channel.CreateBasicProperties();
                    properties.Persistent = true;

                    //publish msg 
                    channel.BasicPublish(exchange: StaticConfigurationManager.AppSetting["RabbitMqSettings:ExchangeName"],
                                         routingKey: StaticConfigurationManager.AppSetting[$"RabbitMqSettings:{routeKey}"],
                                         basicProperties: properties,
                                         body: body);

                    return true;
                }
            }

            catch (Exception)
            {
            }
            return false;
        }
    }
}
