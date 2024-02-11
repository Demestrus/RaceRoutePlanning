'use client';

import {
    Box,
    Button,
    CircularProgress,
    Slider,
    Stack,
    TextField,
} from '@mui/material';
import { styles } from './styles';
import { ChangeEvent, KeyboardEventHandler, useRef, useState } from 'react';
import { IChartPoint } from '../models';

export type ChartControlsProps = {
    onChangeScale: (scale: number) => void;
    onLoadData: (max?: number) => void;
    isLoading: boolean;
};

export default function ChartControls(props: ChartControlsProps) {
    const { cx, classes } = styles();

    const [maxPointAmount, setMaxPointAmount] = useState<number | null>(null);
    const [scaleDisplayValue, setScaleDisplayValue] = useState<number>(100);

    const error = maxPointAmount !== null && maxPointAmount < 1;

    const onButtonClick = () => {
        props.onLoadData(maxPointAmount);
    };

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.valueAsNumber;

        setMaxPointAmount(isNaN(value) ? null : value);
    };

    const onKeyDown: KeyboardEventHandler = (event) => {
        if (event.key == 'Enter' && !error) {
            props.onLoadData(maxPointAmount);
        }
    };
    const onChangeScale = (_: any, value: number | number[]) => {
        if (Array.isArray(value)) return;

        setScaleDisplayValue(value);
        props.onChangeScale(value);
    };

    return (
        <Stack className={classes.stack} spacing={2} direction={'row'}>
            <Button
                variant={'outlined'}
                onClick={onButtonClick}
                disabled={error || props.isLoading}
                size={'small'}
            >
                Generate race route
            </Button>
            <TextField
                autoFocus={true}
                error={error}
                helperText={'Amount must be greater 0'}
                InputProps={{
                    type: 'number',
                }}
                label={'Max points amount'}
                margin={'none'}
                onInput={onInputChange}
                onKeyDown={onKeyDown}
                size="small"
                variant={'outlined'}
            />
            <Box width={50}>{props.isLoading && <CircularProgress />}</Box>
            <Box width={300}>
                Scale {scaleDisplayValue}%
                <Slider
                    value={scaleDisplayValue}
                    onChange={onChangeScale}
                    valueLabelDisplay={'off'}
                    min={1}
                    max={100}
                />
            </Box>
        </Stack>
    );
}
