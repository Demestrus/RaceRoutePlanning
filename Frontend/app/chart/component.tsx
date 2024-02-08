'use client';

import { LineChart } from '@mui/x-charts/LineChart';
import { styles } from './style';

export type ChartProps = {
    raceRoute: IRaceRoute;
};

const transformPropsIntoData = (raceRoute: IRaceRoute): any[] => {
    let result: IChartPoint[] = [];

    for (let i = 0; i < raceRoute.routePoints.length; i++) {
        const point = raceRoute.routePoints[i];
        let distance: number;

        if (i == 0) {
            distance = 0;
        } else {
            const prevPoint = result[i - 1];
            const track = raceRoute.tracksInfo[i - 1];

            distance = prevPoint.distance + track?.distance ?? 0;
        }

        result.push({
            id: point.id,
            name: point.name,
            height: point.height,
            distance: distance,
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
                slots={{}}
                xAxis={[{ dataKey: 'distance', min: 0 }]}
                yAxis={[{ min: 0 }]}
                series={[{ dataKey: 'height' }]}
                dataset={data}
                className={classes.chart}
                axisHighlight={{
                    x: 'band',
                    y: 'none',
                }}
            />
        </div>
    );
}
