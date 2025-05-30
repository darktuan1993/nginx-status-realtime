import React from 'react';
import DomainDetailTable from './DomainDetailTable';
import UpstreamDetailTable from './UpstreamDetailTable';
import { Box, Card, CardHeader, Divider, Typography } from '@mui/material';
import { BsGlobe } from 'react-icons/bs';

export default function DetailTable({ domain }) {
    if (!domain) return null;

    return (
        <Card elevation={4} sx={{ borderRadius: 4, overflow: 'hidden' }}>
            <CardHeader
                title={
                    <Box display="flex" alignItems="center" gap={1}>
                        <BsGlobe size={20} />
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
                            Chi tiết tên miền
                        </Typography>
                    </Box>
                }
                sx={{
                    bgcolor: 'primary.main',
                    py: 2,
                    px: 3,
                    color: 'white',
                }}
            />

            <Box px={3} py={2}>
                <DomainDetailTable domain={domain} />
            </Box>

            {domain.location_path && Object.keys(domain.location_path).length > 0 && (
                <>
                    <Divider sx={{ my: 2 }} />
                    <Box px={3} pb={3}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                            Thông tin Upstream
                        </Typography>
                        <UpstreamDetailTable locationData={domain.location_path} domain={domain} />
                    </Box>
                </>
            )}
        </Card>
    );
}
