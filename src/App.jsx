import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import {
  Container, Typography, Paper, Box, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Divider, CssBaseline, Fab, Zoom, ThemeProvider, createTheme, useTheme, TextField
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { keyframes } from '@emotion/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './About';
import Contact from './Contact';

const questions = [
  {
    label: 'No of Dependants',
    options: [
      { label: '>3', value: 1 },
      { label: '3', value: 2 },
      { label: '2', value: 3 },
      { label: '1', value: 4 },
      { label: '0', value: 5 },
    ],
  },
  {
    label: '% EMI of monthly Income',
    options: [
      { label: '>50%', value: 1 },
      { label: '25%-50%', value: 2 },
      { label: '10% to 25%', value: 3 },
      { label: '<10%', value: 4 },
      { label: '0', value: 5 },
    ],
  },
  {
    label: 'Knowledge of Investment Products (Mutual funds, equity, bonds)',
    options: [
      { label: 'Unaware - Do not understand at all', value: 1 },
      { label: 'Aware of basic concepts', value: 2 },
      { label: 'Beginner: Aware by relying on advice', value: 3 },
      { label: 'Proficient: Do investments in various products myself', value: 4 },
      { label: 'Expert: Extensively trade in shares in secondary market', value: 5 },
    ],
  },
  {
    label: 'Equity as a %age of my total investments',
    options: [
      { label: 'Nil', value: 1 },
      { label: '<20%', value: 2 },
      { label: '20%-40%', value: 3 },
      { label: 'Approximately 50%', value: 4 },
      { label: '>50%', value: 5 },
    ],
  },
  {
    label: 'If I have an option of a stable Job/profession with low growth opp. vs. start up with high growth Opportunity',
    options: [
      { label: 'Definitely Stable', value: 1 },
      { label: 'Somewhat stable', value: 2 },
      { label: 'Not sure', value: 3 },
      { label: 'Somewhat start up', value: 4 },
      { label: 'Definitely start up', value: 5 },
    ],
  },
  {
    label: 'In case of a correction in stock market>20% drop in my portfolio, I will',
    options: [
      { label: 'Sell all immediately', value: 1 },
      { label: 'Switch immediately to lower risk portfolio', value: 2 },
      { label: 'Watch and switch over time to lower risk portfolio', value: 3 },
      { label: 'Stay put', value: 4 },
      { label: 'Invest more', value: 5 },
    ],
  },
  {
    label: 'Annual Income',
    options: [
      { label: 'Less than 5 lacs', value: 1 },
      { label: '5 to 25 lacs', value: 2 },
      { label: '25 to 50 lacs', value: 3 },
      { label: '50 lacs to 1 Cr', value: 4 },
      { label: '>1 Cr', value: 5 },
    ],
  },
  {
    label: 'How secure do you feel about your current & future income sources',
    options: [
      { label: 'Not Secure', value: 1 },
      { label: 'Somewhat insecure', value: 2 },
      { label: 'Not sure', value: 3 },
      { label: 'Somewhat secure', value: 4 },
      { label: 'Very Secure', value: 5 },
    ],
  },
  {
    label: 'Your mindset as an investor',
    options: [
      { label: 'Not ok with any loss even if temporary', value: 1 },
      { label: 'I\'m ok with a loss of 8% if there are possible gains of >20%', value: 3 },
      { label: 'Ok with a loss of 25% if there are possible gains of >50%', value: 5 },
    ],
  },
  {
    label: 'Age group',
    options: [
      { label: '>65 years', value: 1 },
      { label: '50 to 65 years', value: 2 },
      { label: '26 to 50 Years', value: 3 },
      { label: '25 to 30 years', value: 4 },
      { label: '<25 years', value: 5 },
    ],
  },
  {
    label: 'Portfolio size as % of annual income',
    options: [
      { label: '>60%', value: 1 },
      { label: '30 - 50%', value: 2 },
      { label: '<30%', value: 3 },
    ],
  },
];

const riskProfiles = [
  { min: 1, max: 1.4, label: 'Very Conservative', desc: 'Safety First: Ok with lower returns provided outcome in investments are conserved', equity: '<15% Equity' },
  { min: 1.5, max: 2.4, label: 'Conservative', desc: 'Slow and steady wins the race: Stable portfolio with stable returns. You are ok with minimal losses in favour of more stable means', equity: '15% to 30% Equity' },
  { min: 2.5, max: 3.4, label: 'Moderate', desc: 'Balance risk and returns, keeping in right in the middle with some assets in high risk and rest in low risk', equity: '30% to 50% Equity' },
  { min: 3.5, max: 4.4, label: 'Aggressive', desc: 'Returns Matter: Ready for high market fluctuations and keen for long term. Ready for risk with proven track record and higher than benchmark returns', equity: '50% to 60% Equity' },
  { min: 4.5, max: 5, label: 'Very Aggressive', desc: 'No risk no return: Market downturn as an opportunity to take risk. Ok with short term losses as long as you can recoup it within short term.', equity: '60% to 75% Equity' },
];

function getRiskProfile(avgScore) {
  return riskProfiles.find(rp => avgScore >= rp.min && avgScore <= rp.max);
}

function HeroSection() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  return (
    <Box sx={{ position: 'relative', mb: 5 }}>
      {/* SVG Wave Background */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}>
        <svg viewBox="0 0 1440 320" width="100%" height="100%" preserveAspectRatio="none" style={{ display: 'block' }}>
          <defs>
            <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isDark ? '#22304a' : '#e3f2fd'} />
              <stop offset="100%" stopColor={isDark ? '#101624' : '#fff'} />
            </linearGradient>
          </defs>
          <path fill="url(#waveGradient)" fillOpacity={isDark ? '0.5' : '0.35'} d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,154.7C840,149,960,171,1080,186.7C1200,203,1320,213,1380,218.7L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
        </svg>
      </Box>
      <Paper elevation={3} sx={{
        p: { xs: 3, md: 6 },
        mb: 0,
        textAlign: 'center',
        background: isDark
          ? 'linear-gradient(90deg, rgba(33,150,243,0.10) 0%, rgba(33,203,243,0.10) 100%), #101624'
          : 'linear-gradient(90deg, rgba(33,150,243,0.08) 0%, rgba(33,203,243,0.06) 100%), #fff',
        color: theme.palette.text.primary,
        borderRadius: 5,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        boxShadow: isDark
          ? '0 2px 8px 0 rgba(33, 150, 243, 0.10)'
          : '0 2px 8px 0 rgba(33, 150, 243, 0.05)',
        position: 'relative',
        zIndex: 1,
        maxWidth: 900,
        mx: 'auto',
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          gap: { xs: 3, md: 6 },
        }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h3" fontWeight={700} gutterBottom sx={{ color: theme.palette.text.primary, letterSpacing: 1 }}>
              FIRE Risk Profiler
            </Typography>
            <Typography variant="h6" sx={{ color: theme.palette.text.secondary, opacity: 0.95 }} gutterBottom>
              Assess your investment risk profile in minutes and get personalized equity allocation guidance.
            </Typography>
          </Box>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            {/* Finance/Growth SVG Illustration */}
            <svg width="160" height="120" viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="60" width="20" height="40" rx="4" fill={isDark ? '#22304a' : '#90caf9'} />
              <rect x="40" y="40" width="20" height="60" rx="4" fill={isDark ? '#1976d2' : '#42a5f5'} />
              <rect x="70" y="20" width="20" height="80" rx="4" fill={isDark ? '#1565c0' : '#1976d2'} />
              <rect x="100" y="50" width="20" height="50" rx="4" fill={isDark ? '#1565c0' : '#64b5f6'} />
              <rect x="130" y="30" width="20" height="70" rx="4" fill={isDark ? '#2196f3' : '#2196f3'} />
              <circle cx="80" cy="100" r="8" fill={isDark ? '#21cbf3' : '#21cbf3'} />
              <polyline points="10,100 40,80 70,60 100,90 130,70 150,60" stroke={isDark ? '#90caf9' : '#1976d2'} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

// Animation for result card
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(32px); }
  to { opacity: 1; transform: none; }
`;
// Bounce-in for result card
const bounceIn = keyframes`
  0% { opacity: 0; transform: scale(0.95) translateY(32px); }
  60% { opacity: 1; transform: scale(1.03) translateY(-8px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
`;

function MainFormPage() {
  // State and handlers for the form/result
  const [answers, setAnswers] = useState(Array(questions.length).fill(''));
  const [submitted, setSubmitted] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: '', email: '', phone: '' });
  const [userErrors, setUserErrors] = useState({ name: '', email: '' });
  const [downloadAnchor, setDownloadAnchor] = useState(null);
  const theme = useTheme();

  const handleChange = (idx, value) => {
    setAnswers(a => {
      const copy = [...a];
      copy[idx] = value;
      return copy;
    });
  };

  const handleUserInfoChange = (field, value) => {
    setUserInfo(info => ({ ...info, [field]: value }));
    setUserErrors(errors => ({ ...errors, [field]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate user info
    let errors = {};
    if (!userInfo.name.trim()) errors.name = 'Name is required';
    if (!userInfo.email.trim()) errors.email = 'Email is required';
    setUserErrors(errors);
    if (Object.keys(errors).length > 0) return;
    // Prepare submission data
    const submission = {
      timestamp: new Date().toISOString(),
      ...userInfo,
      answers,
      score: avgScore,
      profile: profile?.label || '',
    };
    // Save to LocalStorage
    const prev = JSON.parse(localStorage.getItem('fire_submissions') || '[]');
    localStorage.setItem('fire_submissions', JSON.stringify([...prev, submission]));
    setSubmitted(true);
  };

  // Download all submissions as CSV
  const handleDownloadCSV = () => {
    const data = JSON.parse(localStorage.getItem('fire_submissions') || '[]');
    if (!data.length) return;
    // Flatten answers into Q1, Q2, ...
    const headers = [
      'Timestamp', 'Name', 'Email', 'Phone',
      ...questions.map((q, i) => `Q${i + 1}`),
      'Score', 'Profile'
    ];
    const rows = data.map(d => [
      d.timestamp,
      d.name,
      d.email,
      d.phone,
      ...(d.answers || []),
      d.score,
      d.profile
    ]);
    const csv = [headers, ...rows].map(r => r.map(x => `"${(x ?? '').toString().replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fire_submissions.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const totalScore = answers.reduce((sum, val) => sum + (parseInt(val) || 0), 0);
  const avgScore = answers.filter(Boolean).length ? totalScore / answers.filter(Boolean).length : 0;
  const profile = getRiskProfile(avgScore);

  // Main content (hero, form, result, etc.)
  return (
    <Box sx={{ minHeight: '100vh', pb: 6, overflowX: 'hidden' }}>
      <Container maxWidth="md" sx={{ py: { xs: 2, md: 6 }, px: { xs: 2, sm: 3, md: 6 } }}>
        {/* Hero/Intro Section with SVG Wave */}
        <HeroSection />
        {/* Main Content Section with soft background */}
        <Box sx={{
          background: useTheme().palette.mode === 'dark'
            ? 'linear-gradient(135deg, #101624 60%, #1a2236 100%)'
            : 'linear-gradient(135deg, #e3f2fd 60%, #f4f6fb 100%)',
          borderRadius: { xs: 2, md: 6 },
          boxShadow: '0 1.5px 6px 0 rgba(33, 150, 243, 0.04)',
          px: { xs: 2, sm: 3, md: 6 },
          py: { xs: 2, sm: 3, md: 6 },
          mt: { xs: 2, md: 6 },
          mb: { xs: 2, md: 6 },
          position: 'relative',
          backgroundImage: `
            linear-gradient(135deg, ${useTheme().palette.mode === 'dark' ? '#101624 60%, #1a2236 100%' : '#e3f2fd 60%, #f4f6fb 100%'}),
            url('data:image/svg+xml;utf8,<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="18" y="0" width="4" height="40" rx="2" fill="%23bbdefb" fill-opacity="0.18"/><rect x="0" y="18" width="40" height="4" rx="2" fill="%23bbdefb" fill-opacity="0.18"/></svg>')
          `,
          backgroundRepeat: 'repeat',
          backgroundSize: 'auto, 40px 40px',
          overflowX: 'hidden',
        }}>
          {/* Section Title */}
          <Box sx={{ textAlign: 'center', mb: { xs: 2, md: 4 }, px: { xs: 1, md: 0 } }}>
            <Typography variant="h4" fontWeight={700} color="primary.main" gutterBottom sx={{ fontSize: { xs: '2rem', sm: '2.3rem', md: '2.5rem' } }}>
              Get Your Personalized Risk Profile
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 500, mx: 'auto', fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' } }}>
              Answer a few quick questions to discover your investment risk profile and get tailored equity allocation advice.
            </Typography>
            <Divider sx={{ mt: 3, mb: 0 }} />
          </Box>
          {/* Form Section */}
          <Paper
            elevation={6}
            sx={{
              p: { xs: 2.5, sm: 3, md: 4 },
              mb: 4,
              borderRadius: { xs: 2, md: 4 },
              boxShadow: '0 1.5px 6px 0 rgba(33, 150, 243, 0.04)',
              transition: 'box-shadow 0.3s cubic-bezier(.25,.8,.25,1)',
              maxWidth: '100%',
              overflowX: 'auto',
              '&:hover': {
                boxShadow: '0 3px 12px 0 rgba(33, 150, 243, 0.08)',
              },
            }}
          >
            <Typography variant="h5" fontWeight={600} gutterBottom color="primary.main" sx={{ fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.7rem' } }}>
              Risk Profile Assessment
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <form onSubmit={handleSubmit}>
              {/* User identification fields */}
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 3 }}>
                <TextField
                  label="Name"
                  value={userInfo.name}
                  onChange={e => handleUserInfoChange('name', e.target.value)}
                  required
                  error={!!userErrors.name}
                  helperText={userErrors.name}
                  fullWidth
                />
                <TextField
                  label="Email"
                  value={userInfo.email}
                  onChange={e => handleUserInfoChange('email', e.target.value)}
                  required
                  error={!!userErrors.email}
                  helperText={userErrors.email}
                  type="email"
                  fullWidth
                />
                <TextField
                  label="Phone (optional)"
                  value={userInfo.phone}
                  onChange={e => handleUserInfoChange('phone', e.target.value)}
                  fullWidth
                />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, md: 4 } }}>
                {questions.map((q, i) => (
                  <FormControl key={q.label} component="fieldset" sx={{ mb: 2 }}>
                    <FormLabel component="legend" sx={{ fontWeight: 500, mb: 1, fontSize: { xs: '1rem', md: '1.1rem' } }}>{q.label}</FormLabel>
                    <RadioGroup
                      value={answers[i]}
                      onChange={e => handleChange(i, e.target.value)}
                      row={window.innerWidth >= 600}
                    >
                      {q.options.map(opt => (
                        <FormControlLabel
                          key={opt.label}
                          value={opt.value.toString()}
                          control={<Radio sx={{
                            '&.Mui-checked': {
                              color: 'primary.main',
                            },
                            transition: 'box-shadow 0.2s',
                            boxShadow: '0 0 0 0 rgba(33,150,243,0)',
                            '&:focus-visible': {
                              boxShadow: '0 0 0 4px rgba(33,150,243,0.18)',
                            },
                          }} />}
                          label={opt.label}
                          sx={{ fontSize: { xs: '0.95rem', md: '1.05rem' }, mx: { xs: 0.5, md: 1 } }}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                ))}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{
                    mt: 2,
                    px: { xs: 3, md: 5 },
                    py: { xs: 1, md: 1.5 },
                    fontWeight: 600,
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    borderRadius: 3,
                    boxShadow: '0 2px 8px 0 rgba(33, 150, 243, 0.10)',
                    transition: 'background 0.2s, box-shadow 0.2s, transform 0.1s',
                    background: 'linear-gradient(90deg, #2196f3 0%, #21cbf3 100%)',
                    '&:hover': {
                      background: 'linear-gradient(90deg, #21cbf3 0%, #2196f3 100%)',
                      boxShadow: '0 4px 16px 0 rgba(33, 150, 243, 0.18)',
                      transform: 'translateY(-2px) scale(1.03)',
                    },
                    '&:active': {
                      background: 'linear-gradient(90deg, #1976d2 0%, #21cbf3 100%)',
                      transform: 'scale(0.98)',
                    },
                    overflow: 'hidden',
                  }}
                >
                  Submit
                </Button>
              </Box>
            </form>
            {submitted && (
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Button variant="outlined" color="primary" onClick={handleDownloadCSV}>
                  Download All Submissions (CSV)
                </Button>
              </Box>
            )}
          </Paper>
          {/* Result Section */}
          {submitted && profile && (
            <Paper
              sx={{
                p: { xs: 2.5, sm: 3, md: 4 },
                mt: 4,
                borderRadius: { xs: 2, md: 4 },
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(90deg, rgba(33,150,243,0.10) 0%, rgba(33,203,243,0.10) 100%), ' + theme.palette.background.paper
                  : 'linear-gradient(90deg, #e3f2fd 0%, #fff 100%)',
                boxShadow: '0 1.5px 6px 0 rgba(33, 150, 243, 0.04)',
                transition: 'box-shadow 0.3s cubic-bezier(.25,.8,.25,1)',
                maxWidth: '100%',
                overflowX: 'auto',
                '&:hover': {
                  boxShadow: '0 3px 12px 0 rgba(33, 150, 243, 0.08)',
                },
                animation: `${bounceIn} 0.8s cubic-bezier(.25,.8,.25,1)`,
              }}
            >
              <Typography variant="h5" fontWeight={700} gutterBottom color="primary.main" sx={{ fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.7rem' } }}>
                Result: {profile.label}
              </Typography>
              <Typography variant="subtitle1" gutterBottom sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}>Average Score: {avgScore.toFixed(2)}</Typography>
              <Typography variant="body1" gutterBottom sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}>{profile.desc}</Typography>
              <Typography variant="body2" color="text.secondary">Suggested Equity Allocation: {profile.equity}</Typography>
            </Paper>
          )}
          {submitted && !profile && (
            <Typography color="error" sx={{ mt: 2, fontSize: { xs: '1rem', md: '1.1rem' } }}>Please answer all questions to get your risk profile.</Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default function App() {
  const getSystemMode = () => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  };
  const [mode, setMode] = useState(() => localStorage.getItem('colorMode') || getSystemMode());
  const [showScroll, setShowScroll] = useState(false);

  // Persist color mode and listen for system changes if not overridden
  useEffect(() => {
    localStorage.setItem('colorMode', mode);
  }, [mode]);

  useEffect(() => {
    const listener = (e) => {
      if (!localStorage.getItem('colorMode')) {
        setMode(e.matches ? 'dark' : 'light');
      }
    };
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', listener);
    return () => mq.removeEventListener('change', listener);
  }, []);

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#90caf9' : '#1976d2',
      },
      background: {
        default: mode === 'dark' ? '#101624' : '#f4f6fb',
        paper: mode === 'dark' ? '#1a2236' : '#fff',
      },
    },
    shape: { borderRadius: 8 },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
    },
  });

  // Theme toggle button for menu (not header)
  const ColorModeToggle = (
    <Button
      onClick={() => {
        setMode(m => {
          const next = m === 'light' ? 'dark' : 'light';
          localStorage.setItem('colorMode', next);
          return next;
        });
      }}
      color="inherit"
      sx={{ minWidth: 0, p: 1, borderRadius: 2, width: '100%', justifyContent: 'flex-start' }}
      aria-label="Toggle light/dark mode"
      startIcon={mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    >
      {mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </Button>
  );

  // Show Back to Top button after scrolling 300px
  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <BrowserRouter>
          <Header ColorModeToggle={ColorModeToggle} />
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <Routes>
              <Route path="/" element={<MainFormPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Box>
          <Footer />
          {/* Back to Top Button */}
          <Zoom in={showScroll}>
            <Fab
              color="primary"
              size="medium"
              aria-label="Back to top"
              onClick={handleBackToTop}
              sx={{
                position: 'fixed',
                bottom: { xs: 24, md: 40 },
                right: { xs: 24, md: 40 },
                zIndex: 1201,
                boxShadow: '0 4px 16px 0 rgba(33,150,243,0.18)',
                transition: 'box-shadow 0.2s',
                '&:hover': {
                  boxShadow: '0 8px 32px 0 rgba(33,150,243,0.28)',
                },
              }}
            >
              <KeyboardArrowUpIcon fontSize="large" />
            </Fab>
          </Zoom>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
} 