enum Surface {
    SAND,
    ASPHALT,
    GROUND,
}
enum MaxSpeed {
    FAST,
    NORMAL,
    SLOW,
}

interface IPoint {
    id: number;
    name: string;
    height: number;
}

interface ITrack {
    firstId: number;
    secondId: number;
    distance: number;
    surface: Surface;
    maxSpeed: MaxSpeed;
}

interface IRaceRoute {
    routePoints: IPoint[];
    tracksInfo: ITrack[];
}

interface IChartPoint {
    id: number;
    name: string;
    height: number;
    distance: number;
}
