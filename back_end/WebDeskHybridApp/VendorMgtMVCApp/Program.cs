using VendorMgtMVCApp.Services.Contract;
using VendorMgtMVCApp.Services.GraphQLServices.Contract;
using VendorMgtMVCApp.Services.GraphQLServices.Implementation;
using VendorMgtMVCApp.Services.Implementation;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

builder.Services.AddScoped<IQueryService, QueryService>();
builder.Services.AddScoped<IMutationService, MutationService>();
builder.Services.AddScoped<IVendorBanksMaster, VendorBanksMaster>();
builder.Services.AddScoped<IVendorMasterService, VendorMasterService>();
builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
builder.Services.AddScoped<IVendorBillService, VendorBillService>();

builder.Services.AddRazorPages().AddRazorRuntimeCompilation();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseWebSockets();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=VendorMaster}/{action=Index}/{id?}");

app.Run();
