import React from 'react';
import DomainDetailTable from './DomainDetailTable';
import UpstreamDetailTable from './UpstreamDetailTable';
import { Box, CardHeader, Typography } from '@mui/material';
import { BsGlobe } from 'react-icons/bs';

export default function DetailTable({ domain }) {
    // console.log('Domain Detail:', domain);
    
    if (!domain) return null;

    return (
        <Box>
            <CardHeader
                title={
                    <Box display="flex" alignItems="center" gap={1}>
                        <BsGlobe />
                        <Typography variant="subtitle1" color="white">
                            Chi tiết tên miền
                        </Typography>
                    </Box>
                }
                sx={{ bgcolor: 'primary.main', color: 'white', py: 1.5 }}
            />

            <DomainDetailTable domain={domain} />

            {domain.location_path && Object.keys(domain.location_path).length > 0 && (
                <Box mt={4}>
                    <UpstreamDetailTable locationData={domain.location_path} domain={domain} />
                </Box>
            )}
        </Box>
    );
}
