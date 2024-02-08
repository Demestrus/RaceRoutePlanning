'use client';

import { useEffect, useState } from 'react';
import Chart from './chart/component';
import getRaceRoute from './apiService';
import { Button } from '@mui/base';

export default function Page() {
    const [data, setData] = useState<IRaceRoute>({
        routePoints: [],
        tracksInfo: [],
    });

    useEffect(() => loadData, []);

    const loadData = () => {
        getRaceRoute().then((result) => {
            setData(result);
        });
    };

    const onButtonClick = () => {
        loadData();
    };

    return (
        <>
            <Button onClick={onButtonClick}>Load data</Button>
            <Chart raceRoute={data} />
        </>
    );
}
