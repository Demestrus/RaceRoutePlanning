'use client';

import { ChangeEvent, useEffect, useState } from 'react';
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

    return (
        <>
            <ChartControls loadDataHandler={loadData} isLoading={isLoading} />
            <Chart raceRoute={data} />
        </>
    );
}
