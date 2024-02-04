using Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("[controller]")]
public class RaceRouteController : ControllerBase
{
    public RaceRouteController()
    {
    }

    [HttpGet]
    public IEnumerable<Track> Get()
    {
        return Enumerable.Empty<Track>();
    }
}