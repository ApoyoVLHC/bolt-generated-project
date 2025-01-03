import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
import { InvoiceForm } from './components/InvoiceForm';
import { Logo } from './components/Logo';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Logo />
      <InvoiceForm />
    </ThemeProvider>
  );
}

export default App;
