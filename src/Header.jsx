import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, useTheme } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

export default function Header({ rightContent, children }) {
  const location = useLocation();
  const theme = useTheme();
  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ];
  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{
        background: theme.palette.background.paper,
        borderBottom: `1.5px solid ${theme.palette.divider}`,
        boxShadow: theme.palette.mode === 'dark' ? '0 2px 8px 0 rgba(0,0,0,0.18)' : '0 2px 8px 0 rgba(33,150,243,0.04)',
      }}
    >
      <Toolbar sx={{ minHeight: 84, px: { xs: 1, md: 4 } }}>
        <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 900, letterSpacing: 1, color: theme.palette.text.primary }}>
          FIRE Risk Profiler
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {navLinks.map(link => {
            const active = location.pathname === link.to;
            return (
              <Button
                key={link.to}
                component={Link}
                to={link.to}
                color="inherit"
                disableRipple
                sx={{
                  fontWeight: 700,
                  textTransform: 'none',
                  fontSize: '1rem',
                  letterSpacing: 0.5,
                  borderRadius: 99,
                  px: 2.5,
                  py: 1.2,
                  position: 'relative',
                  color: active ? theme.palette.primary.main : theme.palette.text.primary,
                  background: active ? (theme.palette.mode === 'dark' ? 'rgba(33,150,243,0.18)' : 'rgba(33,150,243,0.10)') : 'transparent',
                  boxShadow: active ? (theme.palette.mode === 'dark' ? '0 2px 8px 0 rgba(33,150,243,0.10)' : '0 2px 8px 0 rgba(33,150,243,0.04)') : 'none',
                  // No underline or after pseudo-element
                  '&:hover': {
                    background: theme.palette.action.hover,
                    color: theme.palette.primary.main,
                  },
                }}
              >
                {link.label}
              </Button>
            );
          })}
        </Box>
        {children}
        {rightContent && <Box sx={{ ml: 2 }}>{rightContent}</Box>}
      </Toolbar>
    </AppBar>
  );
} 