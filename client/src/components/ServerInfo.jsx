import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Box,
  Tooltip
} from '@mui/material';
import {
  Computer as ComputerIcon,
  Extension as ExtensionIcon,
  AccessTime as AccessTimeIcon,
  Memory as MemoryIcon,
  Public as PublicIcon,
  PrecisionManufacturing as PrecisionManufacturingIcon
} from '@mui/icons-material';

function formatUptime(seconds) {
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${days} ngày ${hours} giờ ${minutes} phút ${secs} giây`;
}

export default function ServerInfo({ data }) {
  return (
    <Card elevation={10} sx={{ mb: 4, borderRadius: 4, overflow: 'hidden', backdropFilter: 'blur(8px)' }}>
      <CardHeader
        title={
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="h5" fontWeight={700} color="white">
              Thông Tin Máy Chủ
            </Typography>
          </Box>
        }
        sx={{
          background: 'linear-gradient(135deg,rgb(46, 101, 204) 0%, #2a5298 100%)',
          py: 2,
          px: 3,
          boxShadow: 3,
        }}
      />

      <CardContent sx={{ p: 0 }}>
        <TableContainer component={Paper} sx={{ borderRadius: 0 }}>
          <Table size="medium">
            <TableHead sx={{ bgcolor: 'grey.100' }}>
              <TableRow>
                {[
                  { icon: <ComputerIcon color="primary" />, label: 'Tên máy chủ', tip: 'Hostname hiện tại' },
                  { icon: <ExtensionIcon sx={{ color: '#9c27b0' }} />, label: 'Phiên bản', tip: 'Phiên bản NGINX' },
                  { icon: <AccessTimeIcon sx={{ color: '#f57c00' }} />, label: 'Uptime', tip: 'Thời gian hoạt động' },
                  { icon: <MemoryIcon sx={{ color: '#4caf50' }} />, label: 'Ram sử dụng', tip: 'Dung lượng RAM đang dùng' },
                  { icon: <PublicIcon sx={{ color: '#2196f3' }} />, label: 'Virtual IP', tip: 'Địa chỉ IP ảo' },
                  { icon: <PrecisionManufacturingIcon sx={{ color: '#ff1744' }} />, label: 'Worker', tip: 'Số tiến trình worker' },
                ].map(({ icon, label, tip }, index) => (
                  <TableCell key={index} align="center" sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                    <Tooltip title={tip} arrow>
                      <Box display="flex" alignItems="center" justifyContent="center" gap={0.5}>
                        {icon}
                        {label}
                      </Box>
                    </Tooltip>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow hover sx={{ transition: 'all 0.2s', '&:hover': { bgcolor: '#f0f0f0' } }}>
                <TableCell align="center">{data.hostname}</TableCell>
                <TableCell align="center">{data.nginx_version}</TableCell>
                <TableCell align="center">
                  <Typography variant="body2" fontWeight={500} color="secondary">
                    {formatUptime(data.uptime_seconds)}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography color="success.main" fontWeight={600}>{data.memory_mb} MB</Typography>
                </TableCell>
                <TableCell align="center">{data.ip_address}</TableCell>
                <TableCell align="center">
                  <Typography color="error.main" fontWeight={600}>{data.worker_processes}</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
