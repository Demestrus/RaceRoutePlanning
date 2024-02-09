import { useDrawingArea, useXScale, useYScale } from '@mui/x-charts';
import { Surface } from '../models';

type BackgroundRectSwitchProps = {
    firstPoint: number;
    secondPoint: number;
    surface: Surface;
};

export default function BackgroundRectSwitch({
    surface,
    firstPoint,
    secondPoint,
}: BackgroundRectSwitchProps) {
    const { top, height, bottom } = useDrawingArea();
    const svgHeight = top + bottom + height;

    const xScale = useXScale();
    const yScale = useYScale();
    const y0 = yScale(0);
    const yTop = svgHeight - y0;
    const yBottom = y0 - yTop;

    const x0 = xScale(firstPoint);
    const x1 = xScale(secondPoint);
    const width = x1 - x0;

    let color: string;

    switch (surface) {
        case Surface.GROUND:
            color = '#11B678';
            break;
        case Surface.ASPHALT:
            color = '#DDD';
            break;
        case Surface.SAND:
            color = '#FFFF8F';
            break;
    }

    return (
        <rect
            x={x0}
            y={yTop}
            width={width}
            fill={color}
            height={yBottom}
            opacity={0.5}
        />
    );
}
