import React, { useEffect, useRef, useState } from 'react';
import { TableCell } from '@mui/material';

export default function CanhBaoWarning ({ value, align = 'center', sx = {}, ...rest }) {
    const [highlight, setHighlight] = useState(false);
    const previous = useRef(value);

    useEffect(() => {
        if (value !== previous.current) {
            setHighlight(true);
            const timeout = setTimeout(() => setHighlight(false), 800);
            previous.current = value;
            return () => clearTimeout(timeout);
        }
    }, [value]);

    return (
        <TableCell
            align={align}
            sx={{
                border: '1px solid #ddd',
                transition: 'background-color 0.1ms',
                fontWeight: 600,
                color: highlight ? 'rgb(240, 110, 3)' : 'inherit',
                backgroundColor: highlight ? 'rgba(247, 171, 100, 0.84)' : 'inherit',
                ...sx,
            }}
            {...rest}
        >
            {value}
        </TableCell>
    );
}
