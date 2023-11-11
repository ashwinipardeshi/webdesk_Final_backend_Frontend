using ExamWebAPI.Data;
using ExamWebAPI.Services.Contracts;
using ExamWebAPI.Services.GraphQLServices;
using ExamWebAPI.Services.Implementations;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;



//Scaffold - DbContext "Server=103.172.151.211,1455;Database=ExamDevDB;User Id=devuser;password=USg1#E729D19L;TrustServerCertificate=True;" Microsoft.EntityFrameworkCore.SqlServer - OutputDir Models - Force
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ExamDevFinalDbContext>();
builder.Services.AddScoped<IExamService, ExamService>();

builder.Services.AddGraphQLServer().AddQueryType<ExamQuery>().AddMutationType<ExamMutation>().AddProjections().AddFiltering().AddSorting();

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

app.UseAuthorization();

app.MapControllers();

app.MapGraphQL();

app.Run();
