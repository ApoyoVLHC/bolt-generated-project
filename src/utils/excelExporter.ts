import * as XLSX from 'xlsx';
import { Invoice } from '../types/invoice';
import { format } from 'date-fns';

export const exportToExcel = (invoice: Invoice) => {
  const workbook = XLSX.utils.book_new();
  
  // Format items for Excel
  const items = invoice.items.map(item => ({
    'Descripción': item.description,
    'Monto': item.subtotal,
    'Tasa ITBIS': `${(item.itbisRate * 100).toFixed(0)}%`,
    'ITBIS': item.itbis,
    'Total': item.total
  }));

  // Create items worksheet
  const itemsWs = XLSX.utils.json_to_sheet(items);
  XLSX.utils.book_append_sheet(workbook, itemsWs, 'Detalles');

  // Create summary worksheet
  const summary = [{
    'Cliente': invoice.clientName,
    'RNC': invoice.clientRnc,
    'NCF': invoice.ncf,
    'Fecha': format(invoice.issueDate, 'dd/MM/yyyy'),
    'Subtotal': invoice.subtotal,
    'ITBIS Total': invoice.itbisTotal,
    'Total': invoice.total
  }];
  const summaryWs = XLSX.utils.json_to_sheet(summary);
  XLSX.utils.book_append_sheet(workbook, summaryWs, 'Resumen');

  // Save the file
  XLSX.writeFile(workbook, `factura-${invoice.ncf || 'sin-ncf'}.xlsx`);
};
