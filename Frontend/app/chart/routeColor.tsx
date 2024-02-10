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

    for (let i = 1; i < points.length; i++) {
        const prevPoint = points[i - 1];
        const nextPoint = points[i];

        const offset = nextPoint.distance / maxDistance;

        if (prevPoint.track) {
            stops.push(
                <stop
                    key={`GradientFirstStop_${prevPoint.id}`}
                    offset={offset}
                    stopColor={matchColor(prevPoint.track.maxSpeed)}
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
