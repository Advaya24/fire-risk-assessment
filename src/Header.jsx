import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

export default function Header({ rightContent, children }) {
  const location = useLocation();
  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ];
  return (
    <AppBar position="static" color="primary" elevation={2}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
          FIRE Risk Profiler
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          {navLinks.map(link => (
            <Button
              key={link.to}
              component={Link}
              to={link.to}
              color={location.pathname === link.to ? 'secondary' : 'inherit'}
              sx={{
                fontWeight: 600,
                textTransform: 'none',
                borderBottom: location.pathname === link.to ? '2px solid #fff' : 'none',
                borderRadius: 0,
                px: 2,
                py: 1,
                fontSize: '1rem',
              }}
            >
              {link.label}
            </Button>
          ))}
        </Box>
        {children}
        {rightContent && <Box sx={{ ml: 2 }}>{rightContent}</Box>}
      </Toolbar>
    </AppBar>
  );
} 