import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Button, useTheme, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from 'react-router-dom';

export default function Header({ ColorModeToggle, children }) {
  const location = useLocation();
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ];
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 900;

  // Shadow/blur on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AppBar
      position="fixed"
      color="default"
      elevation={0}
      sx={{
        top: 0,
        left: 0,
        right: 0,
        background: theme.palette.background.paper,
        borderBottom: `1.5px solid ${theme.palette.divider}`,
        boxShadow: scrolled
          ? (theme.palette.mode === 'dark'
              ? '0 4px 24px 0 rgba(33,150,243,0.10), 0 1.5px 6px 0 rgba(33,150,243,0.10)'
              : '0 4px 24px 0 rgba(33,150,243,0.10), 0 1.5px 6px 0 rgba(33,150,243,0.04)')
          : 'none',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(8px)' : 'none',
        zIndex: 1202,
        transition: 'box-shadow 0.35s cubic-bezier(.4,0,.2,1), backdrop-filter 0.35s cubic-bezier(.4,0,.2,1)',
      }}
    >
      <Toolbar sx={{ minHeight: 84, px: { xs: 1, md: 4 }, position: 'relative' }}>
        {/* Mobile: Hamburger menu on the left */}
        <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', mr: 1 }}>
          <IconButton
            color="inherit"
            edge="start"
            aria-label="menu"
            onClick={() => setDrawerOpen(true)}
            sx={{ mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            PaperProps={{ sx: { minWidth: 200 } }}
          >
            <List>
              {navLinks.map(link => (
                <ListItem key={link.to} disablePadding>
                  <ListItemButton
                    component={Link}
                    to={link.to}
                    selected={location.pathname === link.to}
                    onClick={() => setDrawerOpen(false)}
                  >
                    <ListItemText primary={link.label} />
                  </ListItemButton>
                </ListItem>
              ))}
              {/* Theme toggle in menu (mobile only) */}
              <ListItem disablePadding>
                <ColorModeToggle showText={true} />
              </ListItem>
            </List>
          </Drawer>
        </Box>
        {/* App Title: Centered on mobile, left on desktop */}
        <Typography
          variant="h5"
          sx={{
            flexGrow: { xs: 1, md: 0 },
            fontWeight: 900,
            letterSpacing: 1,
            color: theme.palette.text.primary,
            fontSize: { xs: '1.1rem', sm: '1.3rem', md: '2rem' },
            transition: 'font-size 0.2s',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: { xs: '70vw', md: 'none' },
            textAlign: { xs: 'center', md: 'left' },
            position: { xs: 'absolute', md: 'static' },
            left: { xs: 0, md: 'auto' },
            right: { xs: 0, md: 'auto' },
            margin: { xs: 'auto', md: 0 },
            pointerEvents: { xs: 'none', md: 'auto' },
            zIndex: { xs: 1, md: 'auto' },
          }}
        >
          FIRE Risk Profiler
        </Typography>
        {/* Desktop: Nav links on right */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center', flexGrow: 1, justifyContent: 'flex-end' }}>
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
                  fontSize: { md: '1rem', lg: '1.1rem' },
                  letterSpacing: 0.5,
                  borderRadius: 99,
                  px: 2.5,
                  py: 1.2,
                  position: 'relative',
                  color: active ? theme.palette.primary.main : theme.palette.text.primary,
                  background: active ? (theme.palette.mode === 'dark' ? 'rgba(33,150,243,0.18)' : 'rgba(33,150,243,0.10)') : 'transparent',
                  boxShadow: active ? (theme.palette.mode === 'dark' ? '0 2px 8px 0 rgba(33,150,243,0.10)' : '0 2px 8px 0 rgba(33,150,243,0.04)') : 'none',
                  '&:hover': {
                    background: theme.palette.action.hover,
                    color: theme.palette.primary.main,
                  },
                  transition: 'all 0.2s',
                }}
              >
                {link.label}
              </Button>
            );
          })}
        </Box>
        {/* Desktop: Theme toggle on far right */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', ml: 2 }}>
          <ColorModeToggle showText={false} />
        </Box>
        {/* Right content (e.g., theme toggle) */}
        {children}
      </Toolbar>
    </AppBar>
  );
} 