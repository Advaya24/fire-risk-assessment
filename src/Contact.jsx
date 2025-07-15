import React from 'react';
import { Container, Typography, Paper, Box, Link } from '@mui/material';

export default function Contact() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper sx={{ p: { xs: 2, md: 4 }, borderRadius: 4 }}>
        <Typography variant="h4" fontWeight={700} color="primary.main" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
          Have questions, feedback, or need help? Reach out to us at
          <Link href="mailto:ravi.fintra@gmail.com" sx={{ ml: 1 }}>
            ravi.fintra@gmail.com
          </Link>
          {' '}and we’ll get back to you as soon as possible.
        </Typography>
      </Paper>
    </Container>
  );
} 