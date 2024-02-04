using Application.Models;
using Persistence;

namespace Application;

public class RaceRaceRouteService : IRaceRouteService
{
    private readonly RaceRoutesEfContext _ctx;

    public RaceRaceRouteService(RaceRoutesEfContext ctx)
    {
        _ctx = ctx;
    }

    public RaceRoute GenerateRaceRoute(int? maxPointsAmount)
    {
        var points = _ctx.Points.Select(p => new RoutePoint
        {
            Id = p.Id,
            Name = p.Name,
            Height = p.Height
        }).ToArray();

        var tracks = _ctx.Tracks.Select(t => new Track
        {
            FirstPointId = t.FirstPointId,
            SecondPointId = t.SecondPointId,
            Distance = t.Distance,
            MaxSpeed = t.MaxSpeed,
            Surface = t.Surface
        }).ToList();

        var pointIndex = new Random().Next(0, points.Length - 1);
        var nextPointId = points[pointIndex].Id;

        var route = new RaceRoute();
        route.RoutePoints.Add(points.First(s => s.Id == nextPointId));

        // не стал усложнять алгоритм генерации маршрута:
        // каждая следующая точка выбирается рандомно, цикличность на маршруте исключается
        // если при выборе следующей точки зашли в тупик - построение маршрута окончено
        for (var i = 0; i < (maxPointsAmount ?? int.MaxValue); i++)
        {
            var pointTracks = tracks.Where(s =>
                    s.FirstPointId == nextPointId && route.RoutePoints.All(rp => rp.Id != s.SecondPointId) ||
                    s.SecondPointId == nextPointId && route.RoutePoints.All(rp => rp.Id != s.FirstPointId))
                .ToArray();

            if (pointTracks.Length == 0) break;
            
            var trackIndex = new Random().Next(0, pointTracks.Length - 1);
            var track = pointTracks[trackIndex];

            nextPointId = track.FirstPointId == nextPointId ? track.SecondPointId : track.FirstPointId;
            
            route.TracksInfo.Add(track);
            route.RoutePoints.Add(points.First(s => s.Id == nextPointId));
        }

        return route;
    }
}