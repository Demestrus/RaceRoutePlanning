'use client';

import { LineChart } from '@mui/x-charts/LineChart';
import { styles } from './styles';
import { IChartPoint, IRaceRoute, MaxSpeed, Surface } from '../models';
import BackgroundRect from './backgroundRect';
import RouteColor from './routeColor';
import tooltipContent from './tooltipContent';
import { Box, Slider } from '@mui/material';
import { useRef, useState } from 'react';

export type ChartProps = {
    raceRoute: IRaceRoute;
    scale: number;
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

export default function Chart({ raceRoute, scale }: ChartProps) {
    const data = raceRoute ? transformPropsIntoData(raceRoute) : [];

    const [xPosition, setXPosition] = useState<number>(0);

    const xMaxValue =
        data.length > 0 ? Math.max(...data.map((s) => s.distance)) : 0;
    const xViewPort = (xMaxValue * scale) / 100;
    const xMaxPosition = xMaxValue - xViewPort;

    if (xPosition > xMaxPosition) {
        setXPosition(xMaxPosition);
    }

    const xOffset = xPosition + xViewPort;

    const { cx, classes } = styles();

    const debounceRef = useRef(null);
    const debounceSlide = (value: number) => {
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            setXPosition(value);
        }, 50);
    };

    return (
        <div className={classes.container}>
            <LineChart
                disableAxisListener={true}
                tooltip={{
                    trigger: 'axis',
                }}
                slots={{
                    axisContent: (props) =>
                        tooltipContent({ points: data, ...props }),
                }}
                xAxis={[
                    {
                        dataKey: 'distance',
                        min: xPosition,
                        max: xOffset,
                    },
                ]}
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
                {data
                    .filter(
                        (p) =>
                            p.distance > xPosition &&
                            p.track?.prevCord < xOffset
                    )
                    .map((point) => {
                        if (!point.track) return;

                        const firstPoint =
                            point.track.prevCord < xPosition
                                ? xPosition
                                : point.track.prevCord;

                        const secondPoint =
                            point.distance > xOffset ? xOffset : point.distance;

                        return (
                            <BackgroundRect
                                key={`Rect_${point.id}`}
                                firstPoint={firstPoint}
                                secondPoint={secondPoint}
                                surface={point.track.surface}
                            />
                        );
                    })}
                <defs>
                    <RouteColor id={'maxSpeedGradient'} points={data} />
                </defs>
            </LineChart>
            <Box width={'75%'} height={'5%'} alignSelf={'center'}>
                {xMaxPosition > 0 && (
                    <Slider
                        min={0}
                        max={xMaxPosition}
                        track={false}
                        onChange={(event, value) => {
                            if (Array.isArray(value)) return;
                            debounceSlide(value);
                        }}
                    />
                )}
            </Box>
        </div>
    );
}
