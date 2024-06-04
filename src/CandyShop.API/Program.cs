using CandyShop.API.Data;
using CandyShop.API.Options;
using CandyShop.API.Repositories;
using CandyShop.API.Services;
using CandyShop.API.Controllers;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



//service registration
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IProductService, ProductService>();

builder.Services.AddControllers();

builder.Services.Configure<FileStorageOptions>(builder.Configuration.GetSection("FileStorage"));
builder.Services.Configure<QueryOptions>(builder.Configuration.GetSection("QueryOptions"));

var ConnectionString = builder.Configuration.GetConnectionString("DbConnection");
builder.Services.AddDbContextPool<ApplicationDbContext>(
    options =>
    {
        options.UseMySql(ConnectionString, ServerVersion.AutoDetect(ConnectionString))
        .LogTo(Console.WriteLine, LogLevel.Information)
        .EnableSensitiveDataLogging()
        .EnableDetailedErrors();
    }
);

var app = builder.Build();

//seed Db with data
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    try{
        SeedData.Initialise(services);
    }
    catch(Exception ex)
    {
        Console.WriteLine(ex.ToString());
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();

app.MapControllerRoute(
    name: "default",
    pattern: "api/{controller=Product}/{Actin=GetAll}"
);

app.Run();
