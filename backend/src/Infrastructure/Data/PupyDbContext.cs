using Core.Entities;
using Microsoft.EntityFrameworkCore;


//In Package manager console

//Set startup project to only Presentation_API
//Add-Migration "V01" -context PupyDbContext
//update-database -context PupyDbContext


namespace Infrastructure.Data;

public class PupyDbContext : DbContext
{
    private static readonly string azureConnectionString = @"Server=tcp:serveradminlogin.database.windows.net,1433;Initial Catalog=pupy-database-name;Persist Security Info=False;User ID=serveradminlogin;Password={passwordA12};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30";
    public PupyDbContext(DbContextOptions<PupyDbContext> options) : base(options)
    {
        //this.Database.EnsureCreated();
    }

    public DbSet<User> User { get; set; }
    public DbSet<Advert> Advert { get; set; }



    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        //optionsBuilder.UseSqlServer(azureConnectionString);
        optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=PupyDb;Trusted_Connection=True;");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
    }

}
    
