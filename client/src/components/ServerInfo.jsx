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
  Paper
} from '@mui/material';
import ComputerIcon from '@mui/icons-material/Computer';
import ExtensionIcon from '@mui/icons-material/Extension';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MemoryIcon from '@mui/icons-material/Memory';
import PublicIcon from '@mui/icons-material/Public';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';


export default function ServerInfo({ data }) {
  const uptime = data.nowMsec - data.loadMsec;
  const uptimeSeconds = Math.floor(uptime / 1000);

  function formatUptime(seconds) {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${days} ngày ${hours} giờ ${minutes} phút ${secs} giây`;
  }



  return (
    <Card elevation={3} sx={{ mb: 4 }}>
      <CardHeader
        title={
          <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600 }}>
            Thông Tin Máy Chủ
          </Typography>
        }
        sx={{ bgcolor: 'primary.main', py: 1.5 }}
      />
      <CardContent>
        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <TableHead sx={{ bgcolor: 'grey.100' }}>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
                  <ComputerIcon fontSize="small" sx={{ mr: 0.5, color: 'primary.main' }} />
                  Tên máy chủ
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
                  <ExtensionIcon fontSize="small" sx={{ mr: 0.5, color: '#9c27b0' }} />
                  Phiên bản
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
                  <AccessTimeIcon fontSize="small" sx={{ mr: 0.5, color: '#f57c00' }} />
                  Uptime
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
                  <MemoryIcon fontSize="small" sx={{ mr: 0.5, color: '#4caf50' }} />
                  Ram dịch vụ sử dụng
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
                  <PublicIcon fontSize="small" sx={{ mr: 0.5, color: '#2196f3' }} />
                  Virtual IP
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
                  <PrecisionManufacturingIcon fontSize="small" sx={{ mr: 0.5, color: '#ff1744' }} />
                  Worker Processes
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow hover>
                <TableCell align="center">{data.hostname}</TableCell>
                <TableCell align="center">{data.nginx_version}</TableCell>
                <TableCell align="center">
                  {formatUptime(data.uptime_seconds)}
                </TableCell>
                <TableCell align="center">{data.memory_mb}MB</TableCell>
                <TableCell align="center">{data.ip_address}</TableCell>
                <TableCell align="center">{data.worker_processes}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
