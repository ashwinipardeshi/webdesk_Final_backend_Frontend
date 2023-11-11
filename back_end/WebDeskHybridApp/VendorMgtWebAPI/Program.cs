using VendorMgtWebAPI.Models;
using VendorMgtWebAPI.Services.GraphQLServices;
using VendorMgtWebAPI.Services.RESTServices.Contract;
using VendorMgtWebAPI.Services.RESTServices.Implementation;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

//Scaffold-DbContext "Server=103.172.151.211,1455;Database=VendorMgtDevDB;User Id=devuser;password=USg1#E729D19L;TrustServerCertificate=True;" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models -Force
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<VendorMgtDevFinalDbContext>();

builder.Services.AddScoped<IVendorBanksMasterService, VendorBanksMasterService>();
builder.Services.AddScoped<IVendorBillsServices, VendorBillsServices>();
builder.Services.AddScoped<IVendorMasterService, VendorMasterServicer>();
builder.Services.AddScoped<IErrorLogService, ErrorLogService>();



builder.Services.AddCors(c => c.AddPolicy(name: "CORSPolicy", options =>
{
    options.WithOrigins("*").WithMethods("GET", "POST", "DELETE", "PUT").AllowAnyMethod().AllowAnyHeader();
}));

builder.Services.AddGraphQLServer().AddQueryType<Query>()
    .AddType<VendorBanksMasterQuery>()
    .AddType<VendorBillsQuery>()
    .AddType<VendorMasterQuery>()
    .AddType<ErrorLogQuery>()
    
     .AddMutationType(q => q.Name("Mutation"))
         .AddTypeExtension<VendorBanksMasterMutation>()
         .AddTypeExtension<VendorBillsMutation>()
          .AddTypeExtension<VendorMasterMutation>()
          .AddTypeExtension<ErrorLogMutation>()
         
    .AddProjections().AddFiltering().AddSorting();

//builder.Services.AddControllers();
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

var app = builder.Build();
//var app = builder.Build();
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