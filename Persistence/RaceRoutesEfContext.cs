using Microsoft.EntityFrameworkCore;
using Persistence.DbModels;

namespace Persistence;

public class RaceRoutesEfContext : DbContext
{
    public DbSet<RoutePoint> Points { get; set; }
    public DbSet<Track> Tracks { get; set; }

    public RaceRoutesEfContext(DbContextOptions<RaceRoutesEfContext> options) : base(options)
    {
        
    }

    public void Seed()
    {
        if (Points.Any() || Tracks.Any()) return;
        
        AddRange(RoutePointsData.Points);
        AddRange(TracksData.Tracks);

        SaveChanges();
    }
}