using CandyShop.API.Data;
using CandyShop.API.Options;
using CandyShop.API.Repositories;
using CandyShop.API.Services;
using CandyShop.API.Controllers;
using Microsoft.EntityFrameworkCore;
using CandyShop.API.Repos;

var builder = WebApplication.CreateBuilder(args);


var  MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

//create cors
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy  =>
                      {
                          policy.WithOrigins("*");
                      });
});

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



//service registration
builder.Services.AddScoped<IProductImageRepository, ProductImageRepository>();
builder.Services.AddScoped<IProductImageService, ProductImageService>();

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

//allow cors
app.UseCors(MyAllowSpecificOrigins);

app.MapControllerRoute(
    name: "default",
    pattern: "api/{controller=Product}/{Actin=GetAll}"
);
app.MapControllerRoute(
    name: "image",
    pattern: "api/{controller=Image}/{Actin=GetImage}"
);
app.Run();
