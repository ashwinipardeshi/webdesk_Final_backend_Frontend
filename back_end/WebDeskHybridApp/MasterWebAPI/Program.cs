using MasterWebAPI.BackgroundServices;
using MasterWebAPI.Data;
using MasterWebAPI.RedisServices;
using MasterWebAPI.Services.Common.Contract;
using MasterWebAPI.Services.Common.Implementation;
using MasterWebAPI.Services.GlobalMasterContract;
using MasterWebAPI.Services.GlobalMasterImplementation;
using MasterWebAPI.Services.MasterContract;
using MasterWebAPI.Services.MasterImplementation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

//Scaffold-DbContext "Server=103.172.151.211,1455;Database=MasterDevDB;User Id=devuser;password=USg1#E729D19L;TrustServerCertificate=True;" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models -Force
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<MasterDevFinalDbContext>();
builder.Services.AddHostedService<RabbitMQBackgroundConsumerService>();
builder.Services.AddStackExchangeRedisCache(options => { options.Configuration = builder.Configuration["RedisCacheUrl"]; });

#region GlobalMasters
builder.Services.AddScoped<IAnnualIncomeService, AnnualIncomeService>();
builder.Services.AddScoped<IAppointmentTypeService, AppointmentTypeService>();
builder.Services.AddScoped<IBloodGroupService, BloodGroupService>();
builder.Services.AddScoped<IBoardService, BoardService>();
builder.Services.AddScoped<ICourseCategoryService, CourseCategoryService>();
builder.Services.AddScoped<ICandidatureTypeService, CandidatureTypeService>();
builder.Services.AddScoped<ICasteService, CasteService>();
builder.Services.AddScoped<ICountryService, CountryService>();
builder.Services.AddScoped<IDomicileService, DomicileService>();
builder.Services.AddScoped<IDistrictService, DistrictService>();
builder.Services.AddScoped<IEmployeeTypeService, EmployeeTypeService>();
builder.Services.AddScoped<IMinorityService, MinorityService>();
builder.Services.AddScoped<IMinorityDetailsService, MinorityDetailsService>();
builder.Services.AddScoped<IMotherTongueService, MotherTongueService>();
builder.Services.AddScoped<IReligionService, ReligionService>();
builder.Services.AddScoped<IRelationService, RelationService>();
builder.Services.AddScoped<ISemesterService, SemesterService>();
builder.Services.AddScoped<IStateService, StateService>();
builder.Services.AddScoped<ISubCasteService, SubCasteService>();
builder.Services.AddScoped<ITalukaService, TalukaService>();
builder.Services.AddScoped<ITimeSlotService, TimeSlotService>();
builder.Services.AddScoped<IHandicapTypeService, HandicapTypeService>();
builder.Services.AddScoped<ICommonSubjectListService, CommonSubjectListService>();
builder.Services.AddScoped<ICasteCategoryService, CasteCategoryService>();
#endregion GlobalMasters

#region Masters
builder.Services.AddScoped<IAccreditationService, AccreditationService>();
builder.Services.AddScoped<ICollegeService, CollegeService>();
builder.Services.AddScoped<IExamTypeService, ExamTypeService>();
builder.Services.AddScoped<IFeeHeadService, FeeHeadService>();
builder.Services.AddScoped<IBankService, BankService>();
builder.Services.AddScoped<ISMTPConfigService, SMTPConfigService>();
builder.Services.AddScoped<IEvaluationService, EvaluationService>();
builder.Services.AddScoped<IProgramTypeService, ProgramTypeService>();
builder.Services.AddScoped<IProgramService, ProgramService>();
builder.Services.AddScoped<IStudyService, StudyService>();
builder.Services.AddScoped<ISMSTemplateService, SMSTemplateService>();
builder.Services.AddScoped<IBranchService, BranchService>();
builder.Services.AddScoped<IDocumentService, DocumentService>();
builder.Services.AddScoped<IDivisionService, DivisionService>();
builder.Services.AddScoped<IDesignationService, DesignationService>();
builder.Services.AddScoped<IFeeHeadTypeService, FeeHeadTypeService>();
builder.Services.AddScoped<IReservationCategoryService, ReservationCategoryService>();
builder.Services.AddScoped<IDepartmentService, DepartmentService>();
builder.Services.AddScoped<IProgramDetailService, ProgramDetailService>();
builder.Services.AddScoped<IEvaluationService, EvaluationService>();
builder.Services.AddScoped<ISemesterDetailsService, SemesterDetailsService>();
builder.Services.AddScoped<IAdmissionTypeService, AdmissionTypeService>();
builder.Services.AddScoped<IAcademicYearService, AcademicYearService>();
builder.Services.AddScoped<IAcademicStatusService, AcademicStatusService>();
builder.Services.AddScoped<ICourseTypeService, CourseTypeService>();
builder.Services.AddScoped<IProgramYearService, ProgramYearService>();
builder.Services.AddScoped<ISyllabusPatternService, SyllabusPatternService>();
builder.Services.AddScoped<IStreamService, StreamService>();
builder.Services.AddScoped<IModeOfAdmissionMasterService, ModeOfAdmissionMasterService>();
builder.Services.AddScoped<IAllotmentCategoryService, AllotmentCategoryService>();
builder.Services.AddScoped<ICommonServices, CommonServices>();
builder.Services.AddScoped<ISeatTypeService, SeatTypeService>();
builder.Services.AddScoped<IAdmittedTypeService, AdmittedTypeService>();
builder.Services.AddScoped<IApplicationRejectReasonsService, ApplicationRejectReasonsService>();
builder.Services.AddScoped<IApplicationStatusService, ApplicationStatusService>();
builder.Services.AddScoped<ICollegeMainService, CollegeMainService>();
#endregion Masters

builder.Services.AddScoped<ICommonGetOptionService, CommonGetOptionService>();
builder.Services.AddScoped<IRedisService, RedisService>();

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
    option.SwaggerDoc("v1", new OpenApiInfo { Title = "Master Web API", Version = "v1" });
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