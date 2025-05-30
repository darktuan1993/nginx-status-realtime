import React, { useEffect, useRef, useState } from 'react';
import { TableCell } from '@mui/material';

export default function CellWithHighlight({ value, align = 'center', sx = {}, ...rest }) {
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
        fontWeight: 600,
        color: highlight ? 'green' : 'green',
        transition: 'background-color 0.1ms',
        backgroundColor: highlight ? 'rgba(52, 255, 79, 0.5)' : 'inherit',
        ...sx,
      }}
      {...rest}
    >
      {value}
    </TableCell>
  );
}
