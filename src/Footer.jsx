import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box component="footer" sx={{ mt: 6, py: 3, textAlign: 'center', bgcolor: 'background.paper', borderTop: 1, borderColor: 'divider' }}>
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} FIRE Risk Profiler. All rights reserved.
      </Typography>
      {/* Add contact info or links here */}
    </Box>
  );
} 