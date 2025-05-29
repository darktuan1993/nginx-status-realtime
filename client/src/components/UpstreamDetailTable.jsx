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
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import PublicIcon from '@mui/icons-material/Public';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import LoopIcon from '@mui/icons-material/Loop';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import BlockIcon from '@mui/icons-material/Block';
import UploadIcon from '@mui/icons-material/Upload';

function formatBytes(bytes) {
    if (!bytes) return '0 B';
    const units = ['B', 'KiB', 'MiB', 'GiB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
}

const columnHeaders = [
    { label: 'IP', tip: 'Địa chỉ IP backend' },
    { label: 'Trạng thái', tip: 'Trạng thái backend hiện tại (UP/DOWN)' },
    { label: 'Auto Check Fails', tip: 'Số lần check sức khỏe thất bại' },
    { label: 'Tổng Req', tip: 'Tổng số request proxy đến backend' },
    { label: '2xx', tip: 'Số response thành công' },
    { label: '3xx', tip: 'Số response chuyển hướng' },
    { label: '4xx', tip: 'Lỗi từ client gửi đến backend' },
    { label: '5xx', tip: 'Lỗi từ backend server' },
    { label: 'Sent', tip: 'Tổng dữ liệu gửi đến backend' },
    { label: 'Received', tip: 'Tổng dữ liệu nhận từ backend' },
];

export default function UpstreamDetailTable({ locationData, domain }) {
    // console.log('Upstream Detail:', domain);

    if (!locationData || Object.keys(locationData).length === 0) return null;

    return (
        <Box mt={4}>
            {/* <Typography gutterBottom>
                Thông tin <strong>proxy_pass</strong> đến các <strong>upstream server</strong>
            </Typography> */}

            {Object.entries(locationData).map(([path, { upstream_server }]) => {
                const upstreamGroup = upstream_server?.upstream_group || 'unknown';

                return (
                    <Box key={path} mb={3}>
                        <Typography variant="body2" color="info.dark" sx={{ mb: 0.5 }}>
                            <b>Location Path:</b> <>{path} ---------- Domain: {domain?.domain_name
                                ? <strong>{`https://${domain.domain_name}${path}`}</strong>
                                : <em>Chưa có tên miền</em>}
                                {' '}</>
                        </Typography>
                        upstream group: <strong>{upstreamGroup}</strong>
                        <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        {columnHeaders.map((col, index) => (
                                            <TableCell
                                                key={index}
                                                align={index === 0 ? 'left' : 'center'}
                                                sx={{
                                                    border: '1px solid #ddd',
                                                    bgcolor: 'primary.main',
                                                    color: 'white',
                                                    fontWeight: 'bold',
                                                    whiteSpace: 'nowrap',
                                                    cursor: 'help',
                                                }}
                                            >
                                                <Tooltip title={col.tip} arrow>
                                                    <Box component="span" sx={{ display: 'inline-block', width: '100%' }}>
                                                        {col.label}
                                                    </Box>
                                                </Tooltip>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Object.entries(upstream_server)
                                        .filter(([ip]) => ip !== 'upstream_group')
                                        .map(([ip, info]) => (
                                            <TableRow key={ip}>
                                                <TableCell sx={{ color: 'primary.main', fontWeight: 500 }}>{ip}</TableCell>
                                                <TableCell align="center" sx={{ fontWeight: 600 }}>
                                                    {info.status === 'up' ? (
                                                        <CheckCircleIcon sx={{ color: 'success.main', mr: 0.5, verticalAlign: 'middle' }} />
                                                    ) : (
                                                        <CancelIcon sx={{ color: 'error.main', mr: 0.5, verticalAlign: 'middle' }} />
                                                    )}
                                                    {info.status?.toUpperCase()}
                                                </TableCell>
                                                <TableCell align="center">{info.check_fails ?? 0}</TableCell>
                                                <TableCell align="center">{info.requests ?? 0}</TableCell>
                                                <TableCell align="center" sx={{ color: 'success.main', fontWeight: 500 }}>
                                                    {info.response_2xx ?? 0}
                                                </TableCell>
                                                <TableCell align="center">{info.response_3xx ?? 0}</TableCell>
                                                <TableCell align="center" sx={{ color: 'orange' }}>
                                                    {info.response_4xx ?? 0}
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    sx={{ color: info.response_5xx > 0 ? 'error.main' : 'inherit' }}
                                                >
                                                    {info.response_5xx > 0 && (
                                                        <WarningAmberIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                                                    )}
                                                    {info.response_5xx ?? 0}
                                                </TableCell>
                                                <TableCell align="center">{formatBytes(info.bytes_sent)}</TableCell>
                                                <TableCell align="center">{formatBytes(info.bytes_received)}</TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                );
            })}
        </Box>

    );
} 
