import React, { useState } from 'react';
import { BsGlobe } from 'react-icons/bs';
import {
  Card,
  CardHeader,
  CardContent,
  InputAdornment,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  Typography,
  Chip,
  Box,
  Collapse,
  Divider,
  Grid,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function formatBytes(bytes) {
  if (!bytes) return '0 B';
  const units = ['B', 'KiB', 'MiB', 'GiB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
}

export default function DomainListSidebar({ accessed_vhosts, onSelect }) {
  const [search, setSearch] = useState('');

  const filtered = (accessed_vhosts || []).filter(
    (item) =>
      item?.domain_name &&
      item.domain_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card elevation={3} sx={{ width: '100%' }}>
      <CardHeader
        title={
          <Box display="flex" alignItems="center" gap={1}>
            <BsGlobe />
            <Typography variant="subtitle1" color="white">
              Danh sách Tên Miền
            </Typography>
          </Box>
        }
        sx={{ bgcolor: 'primary.main', color: 'white', py: 1.5 }}
      />
      <CardContent>
        <TextField
          fullWidth
          placeholder="Tìm kiếm tên miền..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        <List disablePadding>
          {filtered.map((item, i) => (
            <ListItem
              button
              key={i}
              onClick={() => onSelect?.(item)} // 🌟 gọi callback khi chọn
              sx={{
                px: 2,
                py: 1,
                '&:hover': { bgcolor: '#f5f5f5' },
              }}
            >
              <ListItemIcon sx={{ minWidth: 30, color: 'primary.main' }}>
                <BsGlobe />
              </ListItemIcon>
              <Box flexGrow={1}>
                <Typography fontWeight={500} fontSize="0.875rem">
                  {item.domain_name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Tổng: {item.requests} • RPS: {item.rps} • Time: {item.avg_response_ms}ms
                </Typography>
              </Box>
              <Chip label="Online" color="success" size="small" />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
