import { IChartPoint, MaxSpeed } from '../models';

type RouteColorProps = {
    id: string;
    points: IChartPoint[];
};

export default function RouteColor({ id, points }: RouteColorProps) {
    if (points.length < 2) return;

    const maxDistance = points[points.length - 1].distance;

    function matchColor(maxSpeed: MaxSpeed): string {
        let color: string;

        switch (maxSpeed) {
            case MaxSpeed.SLOW:
                color = 'red';
                break;
            case MaxSpeed.NORMAL:
                color = '#FEC83F';
                break;
            case MaxSpeed.FAST:
                color = 'blue';
                break;
        }

        return color;
    }

    let stops = [];

    for (let i = 0; i < points.length - 1; i++) {
        const point = points[i];
        const nextPoint = points[i + 1];

        const offset = point.distance / maxDistance;

        if (point.track) {
            stops.push(
                <stop
                    key={`GradientFirstStop_${point.id}`}
                    offset={offset}
                    stopColor={matchColor(point.track.maxSpeed)}
                />
            );
        }

        if (nextPoint.track) {
            stops.push(
                <stop
                    key={`GradientSecondStop_${nextPoint.id}`}
                    offset={offset}
                    stopColor={matchColor(nextPoint.track.maxSpeed)}
                />
            );
        }
    }

    return (
        <linearGradient key={'linearGradient'} id={id}>
            {stops}
        </linearGradient>
    );
}
