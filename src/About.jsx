import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

export default function About() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper sx={{ p: { xs: 2, md: 4 }, borderRadius: 4 }}>
        <Typography variant="h4" fontWeight={700} color="primary.main" gutterBottom>
          About FIRE Risk Profiler
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
          FIRE Risk Profiler is a modern, user-friendly tool designed to help you understand your investment risk profile and make smarter financial decisions. Answer a few quick questions to receive personalized equity allocation guidance tailored to your unique situation. Whether you’re a beginner or an experienced investor, our platform empowers you to take control of your financial future with confidence.
        </Typography>
      </Paper>
    </Container>
  );
} 