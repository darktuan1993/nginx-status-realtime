import React from 'react';
import { BsGlobe } from 'react-icons/bs';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    TableContainer,
    Card,
    CardHeader,
    CardContent,
    Paper,
    Tooltip,
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CellWithHighlight from './CellWithHighlight';

function formatBytes(bytes) {
    if (!bytes) return '0 B';
    const units = ['B', 'KiB', 'MiB', 'GiB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
}

export default function DetailTable({ domain }) {
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

    const total_status =
        (response_1xx || 0) +
        (response_2xx || 0) +
        (response_3xx || 0) +
        (response_4xx || 0) +
        (response_5xx || 0);

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

    const columnHeaders = [
        { label: 'IP', tip: 'Địa chỉ IP backend' },
        { label: 'Trạng thái', tip: 'Trạng thái backend hiện tại (UP/DOWN)' },
        { label: 'Check Fails', tip: 'Số lần check sức khỏe thất bại' },
        { label: 'Requests', tip: 'Tổng số request proxy đến backend' },
        { label: '2xx', tip: 'Số response thành công' },
        { label: '3xx', tip: 'Số response chuyển hướng' },
        { label: '4xx', tip: 'Lỗi từ client gửi đến backend' },
        { label: '5xx', tip: 'Lỗi từ backend server' },
        { label: 'Sent', tip: 'Tổng dữ liệu gửi đến backend' },
        { label: 'Received', tip: 'Tổng dữ liệu nhận từ backend' },
    ];

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
                                {response_4xx > 0 && <WarningAmberIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />}{response_4xx || 0}
                            </TableCell>
                            <TableCell align="center" sx={{ border: '1px solid #ddd', color: response_5xx > 0 ? 'red' : 'inherit' }}>
                                {response_5xx > 0 && <WarningAmberIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />}{response_5xx || 0}
                            </TableCell>
                            <TableCell align="center" sx={{ border: '1px solid #ddd' }}>{formatBytes(avg_req_size)}</TableCell>
                            <TableCell align="center" sx={{ border: '1px solid #ddd' }}>{formatBytes(bytes_sent)}</TableCell>
                            <TableCell align="center" sx={{ border: '1px solid #ddd' }}>{formatBytes(bytes_received)}</TableCell>
                            <TableCell align="center" sx={{ border: '1px solid #ddd' }}>0 B</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            {domain.upstream_server && Object.keys(domain.upstream_server).length > 0 && (
                <Box mt={4}>
                    <Typography variant="h6" gutterBottom>
                        Thông tin upstream server
                    </Typography>

                    <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    {columnHeaders.map((col, index) => (
                                        <TableCell
                                            key={index}
                                            align={index === 0 ? 'left' : 'center'}
                                            sx={{ border: '1px solid #ddd', bgcolor: 'primary.main', color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap', cursor: 'help' }}
                                        >
                                            <Tooltip title={col.tip} arrow>
                                                <Box component="span" sx={{ display: 'inline-block', width: '100%' }}>{col.label}</Box>
                                            </Tooltip>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Object.entries(domain.upstream_server).map(([ip, info]) => (
                                    <TableRow key={ip}>
                                        <TableCell>{ip}</TableCell>
                                        <TableCell align="center" sx={{ color: info.status === 'up' ? 'green' : 'red', fontWeight: 600 }}>
                                            {info.status.toUpperCase()}
                                        </TableCell>
                                        <TableCell align="center">{info.check_fails ?? 0}</TableCell>
                                        <TableCell align="center">{info.requests ?? 0}</TableCell>
                                        <TableCell align="center">{info.response_2xx ?? 0}</TableCell>
                                        <TableCell align="center">{info.response_3xx ?? 0}</TableCell>
                                        <TableCell align="center">{info.response_4xx ?? 0}</TableCell>
                                        <TableCell align="center" sx={{ color: info.response_5xx > 0 ? 'red' : 'inherit' }}>
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
            )}
        </Box>
    );
}
