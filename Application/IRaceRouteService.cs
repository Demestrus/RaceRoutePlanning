using Application.Models;

namespace Application;

public interface IRaceRouteService
{
    RaceRoute GenerateRaceRoute(int? maxPointsAmount);
}