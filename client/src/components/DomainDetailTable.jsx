import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tooltip } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CellWithHighlight from './CellWithHighlight';

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
        { label: 'Time', tip: 'Thời gian phản hồi trung bình' },
        { label: '1xx', tip: 'Thông tin response' },
        { label: '2xx', tip: 'Thành công' },
        { label: '3xx', tip: 'Chuyển hướng' },
        { label: '4xx', tip: 'Lỗi phía client' },
        { label: '5xx', tip: 'Lỗi phía server' },
        { label: 'RSA', tip: 'Request size trung bình' },
        { label: 'Sent', tip: 'Dữ liệu gửi đi' },
        { label: 'Rcvd', tip: 'Dữ liệu nhận về' },
        { label: 'Sent/s', tip: 'Tốc độ gửi dữ liệu' },
    ];

    return (
        <Box>
            <Typography variant="body1" sx={{ mb: 2, mt: 1 }}>
                Thống kê tên miền: <Typography component="span" color="primary" fontWeight={700}>{domain_name}</Typography>
            </Typography>
            <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2, boxShadow: 3 }}>
                <Table size="small" sx={{ borderCollapse: 'collapse' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                rowSpan={2}
                                sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white', border: '1px solid #ddd', textAlign: 'center' }}
                            >
                                Tên Miền
                            </TableCell>
                            <TableCell colSpan={3} align="center" sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white', border: '1px solid #ddd' }}>
                                Requests
                            </TableCell>
                            <TableCell colSpan={5} align="center" sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white', border: '1px solid #ddd' }}>
                                Mã trạng thái
                            </TableCell>
                            <TableCell colSpan={4} align="center" sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white', border: '1px solid #ddd' }}>
                                Băng thông
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
                                        <Box component="span" sx={{ display: 'inline-block', width: '100%' }}>{label}</Box>
                                    </Tooltip>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow
                            hover
                            sx={{ backgroundColor: (response_4xx || 0) > 0 || (response_5xx || 0) > 0 ? 'rgba(255, 0, 0, 0.05)' : 'inherit' }}
                        >
                            <TableCell sx={{ border: '1px solid #ddd' }}>{domain_name}</TableCell>
                            <CellWithHighlight value={requests} />
                            <TableCell align="center" sx={{ border: '1px solid #ddd' }}>{rps}</TableCell>
                            <TableCell align="center" sx={{ border: '1px solid #ddd' }}>{avg_response_ms}s</TableCell>
                            <TableCell align="center" sx={{ border: '1px solid #ddd' }}>{response_1xx || 0}</TableCell>
                            <TableCell align="center" sx={{ border: '1px solid #ddd', fontWeight: 'bold', color: 'green' }}>{response_2xx || 0}</TableCell>
                            <TableCell align="center" sx={{ border: '1px solid #ddd' }}>{response_3xx || 0}</TableCell>
                            <TableCell align="center" sx={{ border: '1px solid #ddd', color: response_4xx > 0 ? 'orange' : 'inherit' }}>
                                {response_4xx > 0 }{response_4xx || 0}
                            </TableCell>
                            <TableCell align="center" sx={{ border: '1px solid #ddd', color: response_5xx > 0 ? 'red' : 'inherit' }}>
                                {response_5xx > 0 }{response_5xx || 0}
                            </TableCell>
                            <TableCell align="center" sx={{ border: '1px solid #ddd' }}>{formatBytes(avg_req_size)}</TableCell>
                            <TableCell align="center" sx={{ border: '1px solid #ddd' }}>{formatBytes(bytes_sent)}</TableCell>
                            <TableCell align="center" sx={{ border: '1px solid #ddd' }}>{formatBytes(bytes_received)}</TableCell>
                            <TableCell align="center" sx={{ border: '1px solid #ddd' }}>0 B</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
