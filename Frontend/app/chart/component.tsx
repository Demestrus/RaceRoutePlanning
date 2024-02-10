'use client';

import { LineChart } from '@mui/x-charts/LineChart';
import { styles } from './styles';
import { IChartPoint, IRaceRoute, MaxSpeed, Surface } from '../models';
import BackgroundRect from './backgroundRect';
import RouteColor from './routeColor';
import tooltipContent from './tooltipContent';

export type ChartProps = {
    raceRoute: IRaceRoute;
};

const transformPropsIntoData = (raceRoute: IRaceRoute): IChartPoint[] => {
    let result: IChartPoint[] = [];

    for (let i = 0; i < raceRoute.routePoints.length; i++) {
        const point = raceRoute.routePoints[i];
        let distance: number;
        let track: { prevCord: number; surface: Surface; maxSpeed: MaxSpeed } =
            undefined;

        if (i == 0) {
            distance = 0;
        } else {
            const prevPoint = result[i - 1];
            const trackInfo = raceRoute.tracksInfo[i - 1];

            distance = prevPoint.distance + trackInfo?.distance ?? 0;
            track = {
                prevCord: prevPoint.distance,
                surface: trackInfo.surface,
                maxSpeed: trackInfo.maxSpeed,
            };
        }

        result.push({
            id: point.id,
            name: point.name,
            height: point.height,
            distance: distance,
            track: track,
        });
    }

    return result;
};

export default function Chart({ raceRoute }: ChartProps) {
    const data = raceRoute ? transformPropsIntoData(raceRoute) : [];

    const { cx, classes } = styles();

    return (
        <div className={classes.container}>
            <LineChart
                tooltip={{
                    trigger: 'axis',
                }}
                slots={{
                    axisContent: (props) =>
                        tooltipContent({ points: data, ...props }),
                }}
                xAxis={[{ dataKey: 'distance', min: 0 }]}
                yAxis={[{ min: 0 }]}
                series={[{ id: 'route', dataKey: 'height', color: '#000' }]}
                dataset={data as any[]}
                className={classes.chart}
                axisHighlight={{
                    x: 'line',
                    y: 'none',
                }}
                sx={{
                    '& .MuiLineElement-series-route': {
                        stroke: "url('#maxSpeedGradient')",
                        strokeDasharray: '10 3',
                        strokeWidth: 3,
                    },
                }}
            >
                {data.map((point: IChartPoint) => {
                    if (!point.track) return;

                    return (
                        <BackgroundRect
                            key={`Rect_${point.id}`}
                            firstPoint={point.track.prevCord}
                            secondPoint={point.distance}
                            surface={point.track.surface}
                        />
                    );
                })}
                <defs>
                    <RouteColor id={'maxSpeedGradient'} points={data} />
                </defs>
            </LineChart>
        </div>
    );
}
