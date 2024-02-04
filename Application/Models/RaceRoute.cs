namespace Application.Models;

public class RaceRoute
{
    /// <summary>
    /// Список точек маршрута
    /// </summary>
    public ICollection<RoutePoint> RoutePoints { get; } = new List<RoutePoint>();
    
    /// <summary>
    /// Информация о фрагментах маршрута между точками
    /// </summary>
    public ICollection<Track> TracksInfo { get; } = new List<Track>();
}