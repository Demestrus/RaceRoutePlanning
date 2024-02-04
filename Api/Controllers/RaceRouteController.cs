using Application;
using Application.Models;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RaceRouteController : ControllerBase
{
    private readonly IRaceRouteService _service;

    public RaceRouteController(IRaceRouteService service)
    {
        _service = service;
    }

    [HttpGet]
    public ActionResult<RaceRoute> Get(int? maxPointAmount = null)
    {
        return _service.GenerateRaceRoute(maxPointAmount);
    }
}