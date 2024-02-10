import { IRaceRoute } from './models';

export default async function getRaceRoute(
    maxPointAmount?: number
): Promise<IRaceRoute> {
    try {
        let url = 'https://localhost:7217/api/RaceRoute';
        if (maxPointAmount) {
            url += `?maxPointAmount=${maxPointAmount}`;
        }
        const res = await fetch(url);
        return res.json();
    } catch {
        return Promise.resolve(fallback(maxPointAmount));
    }
}

function fallback(maxPointAmount?: number): IRaceRoute {
    const count = maxPointAmount ?? 5 + getRandomInt(20);

    const result: IRaceRoute = {
        routePoints: [],
        tracksInfo: [],
    };

    for (let i = 0; i < count; i++) {
        result.routePoints.push({
            id: i + 1,
            name: `Point ${i}`,
            height: 10 + getRandomInt(300),
        });

        if (i > 0) {
            result.tracksInfo.push({
                firstId: i,
                secondId: i + 1,
                distance: 30 + getRandomInt(300),
                surface: getRandomInt(3),
                maxSpeed: getRandomInt(3),
            });
        }
    }

    return result;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
