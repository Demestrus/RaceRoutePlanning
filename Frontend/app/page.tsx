'use client';

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Chart from './chart/component';
import getRaceRoute from './apiService';
import ChartControls from './chart-controls/component';
import { IRaceRoute } from './models';

export default function Page() {
    const [data, setData] = useState<IRaceRoute>({
        routePoints: [],
        tracksInfo: [],
    });

    const [isLoading, changeLoadingState] = useState<boolean>(false);
    const [scale, setScale] = useState<number>(100);

    useEffect(() => loadData, []);

    const loadData = (maxPointAmount?: number) => {
        if (isLoading) return;

        changeLoadingState(true);

        getRaceRoute(maxPointAmount)
            .then((result) => {
                setData(result);
            })
            .finally(() => changeLoadingState(false));
    };

    const debounceRef = useRef(null);
    const debounceScaleChange = (value: number) => {
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            setScale(value);
        }, 50);
    };

    return (
        <>
            <ChartControls
                onChangeScale={debounceScaleChange}
                onLoadData={loadData}
                isLoading={isLoading}
            />
            <Chart raceRoute={data} scale={scale} />
        </>
    );
}
