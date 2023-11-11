using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using SaaSAppAPI.Data;
using SaaSAppAPI.RedisService;
using SaaSAppAPI.Services.Common.Contract;
using SaaSAppAPI.Services.Common.Implementation;
using SaaSAppAPI.Services.GraphQLServices;
using SaaSAppAPI.Services.HTTPServices;
using SaaSAppAPI.Services.RESTServices.Contract;
using SaaSAppAPI.Services.RESTServices.Implementation;
using System.Text;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

//Scaffold-DbContext "Server=103.172.151.211,1455;Database=SaaSDevDB;User Id=devuser;password=USg1#E729D19L;TrustServerCertificate=True;" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models -Force
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<SaaSdevDbFinalContext>();
builder.Services.AddStackExchangeRedisCache(options => { options.Configuration = builder.Configuration["RedisCacheUrl"]; });
builder.Services.AddScoped<ICollegeModuleService, CollegeModuleService>();
builder.Services.AddScoped<ICollegeSubscriptionService, CollegeSubscriptionService>();
builder.Services.AddScoped<IModuleMasterService, ModuleMasterService>();
builder.Services.AddScoped<ISubscriptionService, SubscriptionService>();
builder.Services.AddScoped<IPricingService, PricingService>();
builder.Services.AddScoped<ISaasErrorLogService, SaasErrorLogService>();
builder.Services.AddScoped<IUserMasterService, UserMasterService>();
builder.Services.AddScoped<IModuleService, ModuleService>();
builder.Services.AddScoped<IRedisService, RedisService>();
builder.Services.AddScoped<IHTTPRequestService, HTTPRequestService>();
builder.Services.AddScoped<ICommonServices, CommonServices>();
builder.Services.AddScoped<ICollegeMainMasterService, CollegeMainMasterService>();

builder.Services.AddCors(c => c.AddPolicy(name: "CORSPolicy", options =>
{
    options.WithOrigins("*").WithMethods("GET", "POST", "DELETE", "PUT").AllowAnyMethod().AllowAnyHeader();
}));

builder.Services.AddGraphQLServer().AddQueryType<Query>()
    .AddType<ModuleMasterQuery>()
    .AddType<CollegeMainMasterQuery>()
    .AddType<CollegeModuleQuery>()
    .AddType<PricingQuery>()
    .AddType<CollegeSubscriptionQuery>()
    .AddType<SubscriptionMasterQuery>()
    .AddMutationType(q => q.Name("Mutation"))
    .AddTypeExtension<CollegeMainMasterMutation>()
    .AddTypeExtension<ModuleMasterMutation>()
    .AddTypeExtension<CollegeModuleMutation>()
    .AddTypeExtension<PricingMutation>()
    .AddTypeExtension<CollegeSubscriptionMutation>()
    .AddTypeExtension<SubscriptionMasterMutation>()
    .AddProjections().AddFiltering().AddSorting();

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
    option.SwaggerDoc("v1", new OpenApiInfo { Title = "SaaS App API", Version = "v1" });
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

app.MapGraphQL();

app.Run();
