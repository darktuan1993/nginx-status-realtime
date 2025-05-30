import React, { useState } from 'react';
import { BsGlobe2 } from 'react-icons/bs';
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
  const [selectedDomain, setSelectedDomain] = useState(null);

  const filtered = (accessed_vhosts || []).filter(
    (item) =>
      item?.domain_name &&
      item.domain_name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (item) => {
    setSelectedDomain(item.domain_name);
    onSelect?.(item);
  };

  return (
    <Card elevation={4} sx={{ width: '100%', borderRadius: 3 }}>
      <CardHeader
        title={
          <Box display="flex" alignItems="center" gap={1}>
            <BsGlobe2 size={18} />
            <Typography variant="h6" color="white" fontWeight="bold">
              Danh sách Tên Miền
            </Typography>
          </Box>
        }
        sx={{ bgcolor: 'primary.main', color: 'white', py: 1.5, px: 2 }}
      />
      <CardContent sx={{ pt: 1 }}>
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
          {filtered.map((item, i) => {
            const isSelected = selectedDomain === item.domain_name;
            const isDown = item.error_rate > 30;

            return (
              <ListItem
                key={i}
                onClick={() => handleSelect(item)}
                sx={{
                  px: 2,
                  py: 1.5,
                  bgcolor: isSelected ? 'primary.light' : 'transparent',
                  borderLeft: isSelected ? '4px solid #1976d2' : '4px solid transparent',
                  '&:hover': {
                    bgcolor: isSelected ? 'primary.light' : '#f9f9f9',
                    cursor: 'pointer',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                <ListItemIcon sx={{ minWidth: 30, color: 'primary.main' }}>
                  <BsGlobe2 size={16} />
                </ListItemIcon>
                <Box flexGrow={1}>
                  <Typography fontWeight={600} fontSize="0.9rem">
                    {item.domain_name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Tổng: {item.requests} • RPS: {item.rps} • Time: {item.avg_response_ms}ms
                  </Typography>
                </Box>
                <Chip
                  label={isDown ? 'Warning' : 'Healthy'}
                  color={isDown ? 'warning' : 'success'}
                  size="small"
                  variant={isSelected ? 'filled' : 'outlined'}
                />
              </ListItem>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
}
