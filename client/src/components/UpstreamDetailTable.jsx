import React from 'react';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Tooltip,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CellWithHighlight from './Highlight/CellWithHighlight';
import CanhBaoWarning from './Highlight/CanhBaoWarning';
import CanhBaoError from './Highlight/CanhBaoError';

function formatBytes(bytes) {
    if (!bytes) return '0 B';
    const units = ['B', 'KiB', 'MiB', 'GiB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
}

const columnHeaders = [
    { label: 'IP', tip: 'Địa chỉ IP backend' },
    { label: 'Trạng thái', tip: 'Trạng thái backend hiện tại (UP/DOWN)' },
    { label: 'Tổng Req', tip: 'Tổng số request proxy đến backend' },
    { label: 'CheckFails', tip: 'Số lần check sức khỏe thất bại' },
    { label: '2xx', tip: 'Response thành công' },
    { label: '3xx', tip: 'Chuyển hướng' },
    { label: '4xx', tip: 'Lỗi client' },
    { label: '5xx', tip: 'Lỗi server' },
    { label: 'Sent', tip: 'Dữ liệu gửi đến backend' },
    { label: 'Received', tip: 'Dữ liệu nhận từ backend' },
];

export default function UpstreamDetailTable({ locationData, domain }) {
    if (!locationData || Object.keys(locationData).length === 0) return null;

    return (
        <Box mt={4}>
            {Object.entries(locationData).map(([path, { upstream_server }]) => {
                const upstreamGroup = upstream_server?.upstream_group || 'unknown';

                return (
                    <Box key={path} mb={4}>
                        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                            🔁 <strong>Location:</strong> <code>{path}</code> &nbsp;&nbsp;
                            🌐 <strong>Domain:</strong> <code>https://{domain?.domain_name}{path}</code>
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                            Upstream Group: <strong>{upstreamGroup}</strong>
                        </Typography>

                        <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        {columnHeaders.map((col, index) => (
                                            <TableCell
                                                key={index}
                                                align={index === 0 ? 'left' : 'center'}
                                                sx={{
                                                    bgcolor: 'primary.main',
                                                    color: 'white',
                                                    fontWeight: 'bold',
                                                    fontSize: '0.8rem',
                                                    border: '1px solid #ddd',
                                                    whiteSpace: 'nowrap',
                                                    cursor: 'help',
                                                }}
                                            >
                                                <Tooltip title={col.tip} arrow>
                                                    <span>{col.label}</span>
                                                </Tooltip>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {Object.entries(upstream_server)
                                        .filter(([ip]) => ip !== 'upstream_group')
                                        .map(([ip, info]) => {
                                            const {
                                                status,
                                                check_fails,
                                                requests,
                                                response_2xx,
                                                response_3xx,
                                                response_4xx,
                                                response_5xx,
                                                bytes_sent,
                                                bytes_received,
                                            } = info;

                                            return (
                                                <TableRow key={ip} hover>
                                                    <TableCell sx={{ fontWeight: 600, color: 'primary.main' }}>{ip}</TableCell>
                                                    <TableCell align="center" sx={{ fontWeight: 600, border: '1px solid #ddd' }}>
                                                        {status === 'up' ? (
                                                            <CheckCircleIcon sx={{ color: 'success.main', mr: 0.5, verticalAlign: 'middle' }} />
                                                        ) : (
                                                            <CancelIcon sx={{ color: 'error.main', mr: 0.5, verticalAlign: 'middle' }} />
                                                        )}
                                                        {status?.toUpperCase()}
                                                    </TableCell>
                                                    <CellWithHighlight value={requests ?? 0} />
                                                    <CanhBaoError value={check_fails ?? 0} />
                                                    <CellWithHighlight value={response_2xx ?? 0} />
                                                    {/* <TableCell align="center" sx={{ color: 'success.main', fontWeight: 600 }}>
                                                        {response_2xx ?? 0}
                                                    </TableCell> */}
                                                    <CanhBaoWarning value={response_3xx ?? 0} />
                                                    <CanhBaoWarning value={response_4xx ?? 0} />
                                                    <CanhBaoError value={response_5xx ?? 0} />
                                                    <TableCell sx={{  border: '1px solid #ddd' }} align="center">{formatBytes(bytes_sent)}</TableCell>
                                                    <TableCell align="center">{formatBytes(bytes_received)}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                );
            })}
        </Box>
    );
}
