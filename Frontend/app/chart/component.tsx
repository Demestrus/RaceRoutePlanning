'use client';

import { LineChart } from '@mui/x-charts/LineChart';
import { styles } from './styles';
import BackgroundRectSwitch from './backgroundRectSwitch';
import { IChartPoint, IRaceRoute, MaxSpeed, Surface } from '../models';

export type ChartProps = {
    raceRoute: IRaceRoute;
};

const transformPropsIntoData = (raceRoute: IRaceRoute): any[] => {
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

export default function Chart(props: ChartProps) {
    const data = props.raceRoute ? transformPropsIntoData(props.raceRoute) : [];

    const { cx, classes } = styles();

    return (
        <div className={classes.container}>
            <LineChart
                tooltip={{ trigger: 'axis' }}
                xAxis={[{ dataKey: 'distance', min: 0 }]}
                yAxis={[{ min: 0 }]}
                series={[{ dataKey: 'height' }]}
                dataset={data}
                className={classes.chart}
                axisHighlight={{
                    x: 'band',
                    y: 'none',
                }}
            >
                {data.map((point: IChartPoint) => {
                    if (!point.track) return;

                    return (
                        <BackgroundRectSwitch
                            firstPoint={point.track.prevCord}
                            secondPoint={point.distance}
                            surface={point.track.surface}
                        />
                    );
                })}
            </LineChart>
        </div>
    );
}
