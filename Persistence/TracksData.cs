using Persistence.DbModels;

namespace Persistence;

public static class TracksData
{
    public static List<Track> Tracks => new()
    {
        new Track
        {
            FirstPointId = 1,
            SecondPointId = 2,
            Distance = 150,
            MaxSpeed = MaxSpeed.Fast,
            Surface = Surface.Asphalt
        },
        new Track
        {
            FirstPointId = 1,
            SecondPointId = 3,
            Distance = 350,
            MaxSpeed = MaxSpeed.Normal,
            Surface = Surface.Sand
        },
        new Track
        {
            FirstPointId = 1,
            SecondPointId = 5,
            Distance = 300,
            MaxSpeed = MaxSpeed.Normal,
            Surface = Surface.Asphalt
        },
        new Track
        {
            FirstPointId = 2,
            SecondPointId = 3,
            Distance = 220,
            MaxSpeed = MaxSpeed.Normal,
            Surface = Surface.Sand
        },
        new Track
        {
            FirstPointId = 2,
            SecondPointId = 5,
            Distance = 150,
            MaxSpeed = MaxSpeed.Normal,
            Surface = Surface.Asphalt
        },
        new Track
        {
            FirstPointId = 2,
            SecondPointId = 6,
            Distance = 260,
            MaxSpeed = MaxSpeed.Slow,
            Surface = Surface.Ground
        },
        new Track
        {
            FirstPointId = 2,
            SecondPointId = 8,
            Distance = 220,
            MaxSpeed = MaxSpeed.Normal,
            Surface = Surface.Ground
        },
        new Track
        {
            FirstPointId = 3,
            SecondPointId = 4,
            Distance = 100,
            MaxSpeed = MaxSpeed.Normal,
            Surface = Surface.Sand
        },
        new Track
        {
            FirstPointId = 3,
            SecondPointId = 5,
            Distance = 210,
            MaxSpeed = MaxSpeed.Slow,
            Surface = Surface.Sand
        },
        new Track
        {
            FirstPointId = 4,
            SecondPointId = 5,
            Distance = 310,
            MaxSpeed = MaxSpeed.Normal,
            Surface = Surface.Sand
        },
        new Track
        {
            FirstPointId = 5,
            SecondPointId = 6,
            Distance = 300,
            MaxSpeed = MaxSpeed.Normal,
            Surface = Surface.Ground
        },
        new Track
        {
            FirstPointId = 5,
            SecondPointId = 8,
            Distance = 340,
            MaxSpeed = MaxSpeed.Normal,
            Surface = Surface.Ground
        },
        new Track
        {
            FirstPointId = 6,
            SecondPointId = 7,
            Distance = 190,
            MaxSpeed = MaxSpeed.Normal,
            Surface = Surface.Ground
        },
        new Track
        {
            FirstPointId = 6,
            SecondPointId = 8,
            Distance = 150,
            MaxSpeed = MaxSpeed.Fast,
            Surface = Surface.Asphalt
        },
        new Track
        {
            FirstPointId = 6,
            SecondPointId = 9,
            Distance = 220,
            MaxSpeed = MaxSpeed.Normal,
            Surface = Surface.Asphalt
        },
        new Track
        {
            FirstPointId = 7,
            SecondPointId = 9,
            Distance = 190,
            MaxSpeed = MaxSpeed.Normal,
            Surface = Surface.Ground
        },
        new Track
        {
            FirstPointId = 7,
            SecondPointId = 10,
            Distance = 300,
            MaxSpeed = MaxSpeed.Normal,
            Surface = Surface.Asphalt
        },
        new Track
        {
            FirstPointId = 8,
            SecondPointId = 9,
            Distance = 270,
            MaxSpeed = MaxSpeed.Normal,
            Surface = Surface.Asphalt
        },
        new Track
        {
            FirstPointId = 9,
            SecondPointId = 10,
            Distance = 180,
            MaxSpeed = MaxSpeed.Fast,
            Surface = Surface.Asphalt
        }
    };
}