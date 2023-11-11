
using AdmissionWebAPI.Data;
using AdmissionWebAPI.HTTPServices;
using AdmissionWebAPI.RedisServices;
using AdmissionWebAPI.Services.Common.Contract;
using AdmissionWebAPI.Services.Common.Implementation;
using AdmissionWebAPI.Services.OfflineContract;
using AdmissionWebAPI.Services.OfflineImplementation;
using AdmissionWebAPI.Services.OnlineContract;
using AdmissionWebAPI.Services.OnlineImplementation;
using AdmissionWebAPI.ViewModels.Offline;
using AdmissionWebAPI.ViewModels.Online;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.OData;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OData.Edm;
using Microsoft.OData.ModelBuilder;
using Microsoft.OpenApi.Models;
using System.Text;

//Scaffold-DbContext "Server=103.172.151.211,1455;Database=AdmissionDevDB;User Id=devuser;password=USg1#E729D19L;TrustServerCertificate=True;" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models -Force
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AdmissionDevFinalDbContext>();
//builder.Services.AddHostedService<RabbitMQBackgroundConsumerService>();
builder.Services.AddScoped<IOnlineAdmissionService, OnlineAdmissionService>();
builder.Services.AddScoped<IOfflineAdmissionService, OfflineAdmissionService>();
builder.Services.AddScoped<IOnlineAdmissionConfirmationService, OnlineAdmissionConfirmationService>();
builder.Services.AddScoped<IErrorLogService, ErrorLogService>();
builder.Services.AddScoped<IGetMasterNameFromId, GetMasterNameFromId>();
builder.Services.AddScoped<IOfflineOdataAdmissionService, OfflineOdataAdmissionService>();
builder.Services.AddScoped<IOnlineOdataAdmissionService, OnlineOdataAdmissionService>();
builder.Services.AddScoped<ICommonServices, CommonServices>();
builder.Services.AddScoped<IOnlineOdataCountAdmissionService, OnlineOdataCountAdmissionService>();
builder.Services.AddScoped<IRedisService, RedisService>();
builder.Services.AddScoped<IDropBoxFilesService, DropBoxFilesService>();
builder.Services.AddScoped<IHTTPRequestService, HTTPRequestService>();
builder.Services.AddControllers();
builder.Services.AddStackExchangeRedisCache(options => { options.Configuration = builder.Configuration["RedisCacheUrl"]; });

builder.Services.AddCors(c => c.AddPolicy(name: "CORSPolicy", options =>
{
    options.WithOrigins("*").WithMethods("GET", "POST", "DELETE", "PUT").AllowAnyMethod().AllowAnyHeader();
}));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(option =>
    {
        option.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Aud1"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });

builder.Services.AddAuthorization();

builder.Services.AddSwaggerGen(option =>
{
    option.SwaggerDoc("v1", new OpenApiInfo { Title = "Admission Web API", Version = "v1" });
    option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter a valid token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "Bearer"
    });
    option.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });
    
});

builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

builder.Services.AddControllers()
.AddOData(options => options
    .AddRouteComponents("odata", GetEdmModel())
    .Select()
    .Filter()
    .Expand()
    .SetMaxTop(100)
    .Count()
    .OrderBy());

var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseCors("CORSPolicy");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();

static IEdmModel GetEdmModel()
{
    ODataConventionModelBuilder builder = new();
    builder.EntitySet<OnlineAdmissionODataVM>("OnlineAdmissionStudentDetails");
    builder.EntitySet<OfflineAdmissionOdataVM>("OfflineAdmissionStudentDetails");
    return builder.GetEdmModel();
}

