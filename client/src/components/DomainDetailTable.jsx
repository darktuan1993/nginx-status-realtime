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
import CellWithHighlight from './Highlight/CellWithHighlight';
import CanhBaoWarning from './Highlight/CanhBaoWarning';
import CanhBaoError from './Highlight/CanhBaoError';

function formatBytes(bytes) {
    if (!bytes) return '0 B';
    const units = ['B', 'KiB', 'MiB', 'GiB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
}

export default function DomainDetailTable({ domain }) {
    if (!domain) return null;

    const {
        domain_name,
        requests,
        rps,
        avg_response_ms,
        error_rate,
        avg_req_size,
        response_1xx,
        response_2xx,
        response_3xx,
        response_4xx,
        response_5xx,
        bytes_sent,
        bytes_received,
    } = domain;

    const headerTooltips = [
        { label: 'Tổng', tip: 'Tổng số lượng request' },
        { label: 'Req/s', tip: 'Request trên mỗi giây' },
        { label: 'Time', tip: 'Thời gian phản hồi trung bình (ms)' },
        { label: '1xx', tip: 'Thông tin response' },
        { label: '2xx', tip: 'Thành công' },
        { label: '3xx', tip: 'Chuyển hướng' },
        { label: '4xx', tip: 'Lỗi phía client' },
        { label: '5xx', tip: 'Lỗi phía server' },
        { label: 'RSA', tip: 'Request size trung bình' },
        { label: 'Sent', tip: 'Tổng dữ liệu gửi đi' },
        { label: 'Rcvd', tip: 'Tổng dữ liệu nhận về' },
        { label: 'Sent/s', tip: 'Tốc độ gửi dữ liệu mỗi giây (chưa tính)' },
        { label: 'Error %', tip: 'Tỷ lệ lỗi (4xx + 5xx) / tổng request (%)' }, // ✅ mới thêm
    ];

    return (
        <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                Thông tin Tên Miền{' '}
                <Typography component="span" color="primary" fontWeight={700}>
                    {domain_name}
                </Typography>
            </Typography>

            <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2, boxShadow: 3 }}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={3} align="center" sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 'bold', border: '1px solid #ddd' }}>
                                Requests
                            </TableCell>
                            <TableCell colSpan={5} align="center" sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 'bold', border: '1px solid #ddd' }}>
                                Mã trạng thái
                            </TableCell>
                            <TableCell colSpan={5} align="center" sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 'bold', border: '1px solid #ddd' }}>
                                Bandwith & Tỷ lệ lỗi
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            {headerTooltips.map(({ label, tip }, index) => (
                                <TableCell
                                    key={index}
                                    align="center"
                                    sx={{ fontWeight: 500, bgcolor: 'grey.100', border: '1px solid #ddd', cursor: 'help' }}
                                >
                                    <Tooltip title={tip} arrow>
                                        <Box component="span" sx={{ display: 'inline-block', width: '100%' }}>
                                            {label}
                                        </Box>
                                    </Tooltip>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        <TableRow
                            hover
                            sx={{
                                backgroundColor: (response_4xx || response_5xx) > 0 ? 'rgba(255, 243, 229, 0.3)' : 'inherit',
                            }}
                        >
                            <CellWithHighlight value={requests} />
                            <TableCell align="center" sx={{ border: '1px solid #ddd' }}>{rps}</TableCell>
                            <TableCell align="center" sx={{ border: '1px solid #ddd' }}>{avg_response_ms} ms</TableCell>
                            <TableCell align="center" sx={{ border: '1px solid #ddd' }}>{response_1xx || 0}</TableCell>
                            <CellWithHighlight value={response_2xx || 0} />
                            <TableCell align="center" sx={{ border: '1px solid #ddd' }}>{response_3xx || 0}</TableCell>
                            <CanhBaoWarning value={response_4xx || 0} />
                            <CanhBaoError value={response_5xx || 0} />
                            <TableCell align="center" sx={{ border: '1px solid #ddd' }}>{formatBytes(avg_req_size)}</TableCell>
                            <TableCell align="center" sx={{ border: '1px solid #ddd' }}>{formatBytes(bytes_sent)}</TableCell>
                            <TableCell align="center" sx={{ border: '1px solid #ddd' }}>{formatBytes(bytes_received)}</TableCell>
                            <TableCell align="center" sx={{ border: '1px solid #ddd' }}>0 B</TableCell>
                            {/* ✅ Error Rate Cell */}
                            <TableCell
                                align="center"
                                sx={{
                                    border: '1px solid #ddd',
                                    fontWeight: 'bold',
                                    color:
                                        error_rate > 10
                                            ? 'error.main'
                                            : error_rate > 5
                                                ? 'warning.main'
                                                : 'success.main',
                                }}
                            >
                                <Tooltip title="(4xx + 5xx) / Tổng request x 100%" arrow>
                                    <span>{error_rate?.toFixed(2)}%</span>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
