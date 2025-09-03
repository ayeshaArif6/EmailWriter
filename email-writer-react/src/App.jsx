
import {
  ThemeProvider, createTheme, CssBaseline,
  Container, TextField, Typography, Box, Stack,
  Chip, CircularProgress, Button, Divider
} from '@mui/material';
import MarkEmailReadRoundedIcon from '@mui/icons-material/MarkEmailReadRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import { useState } from 'react';
import axios from 'axios';
import './App.css';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#f59e0b' },   // warm amber accent
    background: { default: '#0b1120', paper: 'rgba(255,255,255,0.06)' },
    text: { primary: '#e5e7eb', secondary: '#a1a1aa' }
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: `Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji"`,
    h3: { fontWeight: 800, letterSpacing: '-.02em' }
  }
});

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const tones = [
    { label: 'Professional', value: 'professional' },
    { label: 'Friendly', value: 'friendly' },
    { label: 'Casual', value: 'casual' },
  ];

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setGeneratedReply('');
    setCopied(false);
    try {
      const res = await axios.post("http://localhost:8080/api/email/generate", {
        emailContent,
        tone
      });
      setGeneratedReply(typeof res.data === 'string' ? res.data : JSON.stringify(res.data, null, 2));
    } catch (e){
      console.error(e);
      setError('Failed to generate email reply. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedReply);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* animated backdrop */}
      <div className="hero-bg" aria-hidden="true" />

      <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
        {/* Header */}
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
          <MarkEmailReadRoundedIcon className="accent-glow" fontSize="large" />
          <Typography variant="h3" component="h1">Email Reply Generator</Typography>
        </Stack>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Paste an email, pick a tone, and get a polished reply you can send.
        </Typography>

        {/* Glass card */}
        <Box className="glass-card">
          <Stack spacing={2}>
            <TextField
              fullWidth multiline rows={8}
              label="Original Email Content"
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              placeholder="Paste the email you're replying to..."
            />

            {/* Tone chips */}
            <Box>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                Tone (Optional)
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                <Chip
                  label="None"
                  variant={tone ? 'outlined' : 'filled'}
                  color={tone ? 'default' : 'warning'}
                  onClick={() => setTone('')}
                />
                {tones.map(t => (
                  <Chip
                    key={t.value}
                    label={t.label}
                    color={tone === t.value ? 'warning' : 'default'}
                    variant={tone === t.value ? 'filled' : 'outlined'}
                    onClick={() => setTone(t.value)}
                  />
                ))}
              </Stack>
            </Box>

            {/* Generate button */}
            <Button
              className="btn-gradient"
              size="large"
              onClick={handleSubmit}
              disabled={!emailContent || loading}
              startIcon={<BoltRoundedIcon />}
              fullWidth
            >
              {loading ? <CircularProgress size={24} /> : 'Generate Reply'}
            </Button>
          </Stack>
        </Box>

        {/* Error */}
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>
        )}

        {/* Output */}
        {generatedReply && (
          <Box className="glass-card" sx={{ mt: 3 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
              <Typography variant="h6">Generated Reply</Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="caption" color={copied ? 'success.main' : 'text.secondary'}>
                  {copied ? 'Copied!' : 'Copy to clipboard'}
                </Typography>
                <Button size="small" variant="outlined" onClick={handleCopy} startIcon={<ContentCopyRoundedIcon />}>
                  Copy
                </Button>
              </Stack>
            </Stack>
            <Divider sx={{ mb: 2, opacity: .2 }} />
            <TextField
              fullWidth multiline rows={10}
              value={generatedReply}
              inputProps={{ readOnly: true }}
            />
          </Box>
        )}

        <Typography variant="caption" color="text.secondary" sx={{ display:'block', mt: 3, textAlign:'center' }}>
          Built with React + MUI • Accent <span style={{color:'#f59e0b'}}>amber</span> theme
        </Typography>
      </Container>
    </ThemeProvider>
  );
}

export default App;
