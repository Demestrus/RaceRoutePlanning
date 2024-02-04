using Persistence.DbModels;

namespace Persistence;

public static class RoutePointsData
{
    public static List<RoutePoint> Points => new()
    {
        new RoutePoint
        {
            Id = 1,
            Name = "Berlin",
            Height = 150
        },
        new RoutePoint
        {
            Id = 2,
            Name = "Paris",
            Height = 190
        },
        new RoutePoint
        {
            Id = 3,
            Name = "Madrid",
            Height = 240
        },
        new RoutePoint
        {
            Id = 4,
            Name = "Lisbon",
            Height = 230
        },
        new RoutePoint
        {
            Id = 5,
            Name = "Rome",
            Height = 160
        },
        new RoutePoint
        {
            Id = 6,
            Name = "Warsaw",
            Height = 205
        },
        new RoutePoint
        {
            Id = 7,
            Name = "Budapest",
            Height = 260
        },
        new RoutePoint
        {
            Id = 8,
            Name = "Prague",
            Height = 180
        },
        new RoutePoint
        {
            Id = 9,
            Name = "Minsk",
            Height = 200
        },
        new RoutePoint()
        {
            Id = 10,
            Name = "Moscow",
            Height = 230
        }
    };
}