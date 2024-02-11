import { tss } from 'tss-react/mui';

export const styles = tss.create({
    container: {
        display: 'flex',
        height: '90vh',
        flexFlow: 'column',
    },
    chart: {
        flex: '1 1 auto',
    },
    tooltip: {
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        fontWeight: 400,
        fontSize: '1rem',
        lineHeight: 1.5,
        letterSpacing: '0.00938em',

        '& table': {
            borderCollapse: 'collapse',
        },
    },
    tooltipSm: {
        lineHeight: 1,
        fontSize: '0.6em',
    },
    tooltipRow: {
        '& > td': {
            padding: '6px 10px',
        },
        '& > td:first-child': {
            paddingRight: '20px',
        },
        '& > td:last-child': {
            fontWeight: 600,
        },
        '&:not(:last-child) > td': {
            borderBottom: '1px solid #ccc',
        },
    },
});
