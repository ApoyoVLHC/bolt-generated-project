import React from 'react';
import { Paper, Typography, Grid } from '@mui/material';
import { Invoice } from '../types';
import { format } from 'date-fns';

interface Props {
  invoice: Invoice;
}

export const InvoicePreview: React.FC<Props> = ({ invoice }) => {
  return (
    <Paper sx={{ p: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h6">ASOCIACIÓN ESPERANZA INTERNACIONAL, INC.</Typography>
          <Typography>RNC: 401-50859-1</Typography>
          <Typography>Santo Domingo, República Dominicana</Typography>
          <Typography>
            Calle Frank Félix Miranda, No.1, Ensanche Naco
          </Typography>
          <Typography>Teléfono: 809-450-0333</Typography>
        </Grid>
        <Grid item xs={6} textAlign="right">
          <Typography>NCF: {invoice.ncf}</Typography>
          <Typography>
            Fecha: {format(invoice.issueDate, 'dd/MM/yyyy')}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};
