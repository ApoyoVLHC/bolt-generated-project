// Update imports
import { DatePickerField } from './DatePickerField';

export const InvoiceForm: React.FC = () => {
  // ... other code remains the same ...

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', p: 2 }}>
      <Paper sx={{ p: 3 }}>
        {/* ... other form fields ... */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="NCF"
              value={invoice.ncf}
              onChange={(e) => setInvoice(prev => ({ ...prev, ncf: e.target.value }))}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePickerField
              label="Fecha de Emisión"
              value={invoice.issueDate}
              onChange={(date) => setInvoice(prev => ({ 
                ...prev, 
                issueDate: date || new Date() 
              }))}
            />
          </Grid>
          {/* ... other form fields ... */}
        </Grid>
        {/* ... rest of the component ... */}
      </Paper>
    </Box>
  );
};
