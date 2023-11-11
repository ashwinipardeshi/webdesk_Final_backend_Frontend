using Authenticate.BackgroundServices;
using Authenticate.Data;
using Authenticate.RedisService;
using Authenticate.Services.Contract;
using Authenticate.Services.Implementation;
using CommonApp.Services.Contract;
using CommonApp.Services.Implementation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

//Scaffold-DbContext "Server=103.172.151.211,1455;Database=AuthenticationDevDB;User Id=devuser;password=USg1#E729D19L;TrustServerCertificate=True;" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models -Force
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AuthenticationDevFinalDbContext>();
builder.Services.AddStackExchangeRedisCache(options => { options.Configuration = builder.Configuration["RedisCacheUrl"]; });
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IMenuService, MenuService>();
builder.Services.AddScoped<IRoleService, RoleService>();
builder.Services.AddScoped<IOnlineUserService, OnlineUserService>();
builder.Services.AddScoped<IErrorLogService, ErrorLogService>();
builder.Services.AddScoped<IRoleMenuService, RoleMenuService>();
builder.Services.AddScoped<IApprovedUserService, ApprovedUserService>();
builder.Services.AddScoped<IApprovedOfflineUserService, ApprovedOfflineUserService>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddHostedService<ApprovedUserRMQReceiverService>();
builder.Services.AddHostedService<ApprovedOfflineUserRMQReceiverService>();
builder.Services.AddScoped<IRedisService, RedisService>();

builder.Services.AddCors(c => c.AddPolicy(name: "CORSPolicy", options =>
{
    options.WithOrigins("*").WithMethods("GET", "POST", "DELETE", "PUT").AllowAnyMethod().AllowAnyHeader();
}));

//JWT
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
    option.SwaggerDoc("v1", new OpenApiInfo { Title = "Authenticate API", Version = "v1" });
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

app.Run();