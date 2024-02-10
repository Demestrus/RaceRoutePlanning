import { IChartPoint, MaxSpeed, Surface } from '../models';
import { ChartsAxisContentProps } from '@mui/x-charts/ChartsTooltip/ChartsAxisTooltipContent';
import { Paper } from '@mui/material';
import { styles } from './styles';

type toolTipContentProps = ChartsAxisContentProps & {
    points: IChartPoint[];
};
export default function toolTipContent({
    points,
    dataIndex,
}: toolTipContentProps) {
    if (points.length === 0) return;

    const { cx, classes } = styles();

    const point = points[dataIndex];

    if (!point) return;

    const TableRow = ({ header, item }) => (
        <tr className={classes.tooltipRow}>
            <td>{header}</td>
            <td>{item}</td>
        </tr>
    );

    return (
        <Paper
            className={classes.tooltip}
            variant="outlined"
            sx={{ padding: 2 }}
        >
            <table>
                <tbody>
                    <TableRow header={'Name'} item={point.name} />
                    <TableRow
                        header={'Distance between'}
                        item={point.distance - point.track?.prevCord ?? 0}
                    />
                    <TableRow header={'Total distance'} item={point.distance} />
                    <TableRow header={'Point height'} item={point.height} />
                </tbody>
            </table>
        </Paper>
    );
}
