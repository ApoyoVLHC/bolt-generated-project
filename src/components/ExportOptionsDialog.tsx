import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Typography
} from '@mui/material';

interface ExportOptionsDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (options: any) => void;
}

export const ExportOptionsDialog: React.FC<ExportOptionsDialogProps> = ({
  open,
  onClose,
  onConfirm
}) => {
  const [options, setOptions] = useState({
    includeHeader: true,
    includeFooter: true,
    companyName: 'ASOCIACIÓN ESPERANZA INTERNACIONAL, INC.',
    visibleColumns: ['description', 'subtotal', 'itbisRate', 'itbis', 'total']
  });

  const handleConfirm = () => {
    onConfirm(options);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Opciones de Exportación</DialogTitle>
      <DialogContent>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={options.includeHeader}
                onChange={(e) => setOptions(prev => ({
                  ...prev,
                  includeHeader: e.target.checked
                }))}
              />
            }
            label="Incluir Encabezado"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={options.includeFooter}
                onChange={(e) => setOptions(prev => ({
                  ...prev,
                  includeFooter: e.target.checked
                }))}
              />
            }
            label="Incluir Pie de Página"
          />
        </FormGroup>

        <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
          Columnas Visibles:
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={options.visibleColumns.includes('description')}
                onChange={(e) => setOptions(prev => ({
                  ...prev,
                  visibleColumns: e.target.checked
                    ? [...prev.visibleColumns, 'description']
                    : prev.visibleColumns.filter(col => col !== 'description')
                }))}
              />
            }
            label="Descripción"
          />
          {/* Add more column options */}
        </FormGroup>

        <TextField
          fullWidth
          label="Nombre de la Empresa"
          value={options.companyName}
          onChange={(e) => setOptions(prev => ({
            ...prev,
            companyName: e.target.value
          }))}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleConfirm} color="primary">
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
