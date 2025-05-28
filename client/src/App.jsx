import React, { useEffect, useState } from 'react';
import ServerInfo from './components/ServerInfo';
import DomainListSidebar from './components/DomainListSidebar';
import DetailTable from './components/DetailTable';
import { Container, Typography, Grid, Paper, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

export default function App() {
  const [data, setData] = useState(null);
  const [selectedDomain, setSelectedDomain] = useState(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');
    
    socket.onmessage = (event) => {
      try {
        setData(JSON.parse(event.data));
      } catch (err) {
        console.error('JSON parse error', err);
      }
    };
    return () => socket.close();
  }, []);
  
  useEffect(() => {
    if (data && selectedDomain?.domain_name) {
    
      const updated = data.accessed_vhosts?.find(
        (d) => d.domain_name === selectedDomain.domain_name
      );
      if (updated) setSelectedDomain(updated);
    }
  }, [data]);


  return (
    <Container maxWidth="xl" sx={{ py: 4, minHeight: '100vh', bgcolor: 'background.default' }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom color="primary">
        THEO DÕI TÊN MIỀN
      </Typography>

      {data && (
        <Box mb={4}>
          <StyledPaper>
            <ServerInfo data={data} />
          </StyledPaper>
        </Box>
      )}

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          flexDirection: { xs: 'column', md: 'row' },
          minHeight: 500,
        }}
      >
        <Box sx={{ flex: 1, minWidth: 200 }}>
          <StyledPaper>
            <DomainListSidebar
              accessed_vhosts={data?.accessed_vhosts}
              onSelect={(domain) => setSelectedDomain(domain)}
            />
          </StyledPaper>
        </Box>

        <Box sx={{ flex: 2 }}>
          <StyledPaper sx={{ overflow: 'auto' }}>
            {selectedDomain ? (
              <DetailTable domain={selectedDomain} />
            ) : (
              <Typography variant="body2" sx={{ p: 2 }}>
                Chọn một tên miền để xem chi tiết
              </Typography>
            )}
          </StyledPaper>
        </Box>
      </Box>
    </Container>
  );
}