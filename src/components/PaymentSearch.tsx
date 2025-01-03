// Update imports
import { DatePickerField } from './DatePickerField';

export const PaymentSearch: React.FC<PaymentSearchProps> = ({
  onPaymentsSelected
}) => {
  // ... other code remains the same ...

  return (
    <Box sx={{ mb: 3 }}>
      <Grid container spacing={2}>
        {/* ... other fields ... */}
        <Grid item xs={12} sm={6}>
          <DatePickerField
            label="Fecha Inicio"
            value={startDate}
            onChange={setStartDate}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePickerField
            label="Fecha Fin"
            value={endDate}
            onChange={setEndDate}
          />
        </Grid>
        {/* ... rest of the component ... */}
      </Grid>
    </Box>
  );
};
