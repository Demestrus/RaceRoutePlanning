namespace Persistence.DbModels;

public class Track
{
    public int Id { get; set; }
    public int FirstPointId { get; set; }
    public int SecondPointId { get; set; }
    public int Distance { get; set; }
    public Surface Surface { get; set; }
    public MaxSpeed MaxSpeed { get; set; }
    
    public virtual RoutePoint FirstPoint { get; set; }
    public virtual RoutePoint SecondPoint { get; set; }
}