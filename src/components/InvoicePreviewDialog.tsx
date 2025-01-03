// ... previous imports ...
import { exportToExcel, exportToCSV } from '../utils/exporters';
import { ExportOptionsDialog } from './ExportOptionsDialog';

export const InvoicePreviewDialog: React.FC<InvoicePreviewDialogProps> = ({
  // ... previous props ...
}) => {
  const [exportOptionsOpen, setExportOptionsOpen] = useState(false);
  const [exportType, setExportType] = useState<'excel' | 'csv' | null>(null);

  const handleExport = (type: 'excel' | 'csv') => {
    setExportType(type);
    setExportOptionsOpen(true);
  };

  const handleExportWithOptions = (options: any) => {
    if (exportType === 'excel') {
      exportToExcel(invoice, options);
    } else if (exportType === 'csv') {
      exportToCSV(invoice, options);
    }
  };

  return (
    <>
      <Dialog /* ... existing dialog props ... */>
        {/* ... existing dialog content ... */}
        <DialogActions>
          {/* ... existing buttons ... */}
          <Tooltip title="Exportar a CSV">
            <IconButton
              onClick={() => handleExport('csv')}
              color="primary"
              disabled={hasErrors || hasEmptyFields || loading}
              sx={{ mr: 1 }}
            >
              <FileDownloadIcon />
            </IconButton>
          </Tooltip>
          {/* ... other buttons ... */}
        </DialogActions>
      </Dialog>

      <ExportOptionsDialog
        open={exportOptionsOpen}
        onClose={() => setExportOptionsOpen(false)}
        onConfirm={handleExportWithOptions}
      />
    </>
  );
};
