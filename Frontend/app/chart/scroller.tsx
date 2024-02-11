import { Box, Slider, SliderThumb } from '@mui/material';

type ScrollerProps = {
    maxPosition: number;
    onChange: (value: number) => void;
};

export default function Scroller({ maxPosition, onChange }: ScrollerProps) {
    return (
        <Box width={'75%'} height={'5%'} alignSelf={'center'}>
            {maxPosition > 0 && (
                <Slider
                    min={0}
                    max={maxPosition}
                    track={false}
                    onChange={(event, value) => {
                        if (Array.isArray(value)) return;
                        onChange(value);
                    }}
                    sx={{
                        '& .MuiSlider-thumb': {
                            borderRadius: 0,
                        },
                    }}
                />
            )}
        </Box>
    );
}
