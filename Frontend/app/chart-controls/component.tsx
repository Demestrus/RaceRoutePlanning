'use client';

import { Button, CircularProgress, Stack, TextField } from '@mui/material';
import { styles } from './styles';
import { ChangeEvent, KeyboardEventHandler, useState } from 'react';

export type ChartControlsProps = {
    loadDataHandler: (max?: number) => void;
    isLoading: boolean;
};

export default function ChartControls(props: ChartControlsProps) {
    const { cx, classes } = styles();

    const [maxPointAmount, setMaxPointAmount] = useState<number | null>(null);

    const onButtonClick = () => {
        props.loadDataHandler(maxPointAmount);
    };

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.valueAsNumber;

        setMaxPointAmount(isNaN(value) ? null : value);
    };

    const onKeyDown: KeyboardEventHandler = (event) => {
        if (event.key == 'Enter' && !error) {
            props.loadDataHandler(maxPointAmount);
        }
    };

    const error = maxPointAmount !== null && maxPointAmount < 1;

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
            {props.isLoading && <CircularProgress />}
        </Stack>
    );
}
