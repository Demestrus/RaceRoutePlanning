using Persistence.DbModels;

namespace Application.Models;

public class Track
{
    public int FirstPointId { get; set; }
    public int SecondPointId { get; set; }
    public int Distance { get; set; }
    public Surface Surface { get; set; }
    public MaxSpeed MaxSpeed { get; set; }
}