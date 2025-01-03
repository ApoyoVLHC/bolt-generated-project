import * as XLSX from 'xlsx';
import { Invoice } from '../types/invoice';
import { format } from 'date-fns';

interface ExportOptions {
  includeHeader?: boolean;
  includeFooter?: boolean;
  visibleColumns?: string[];
  companyName?: string;
}

const DEFAULT_OPTIONS: ExportOptions = {
  includeHeader: true,
  includeFooter: true,
  visibleColumns: ['description', 'subtotal', 'itbis', 'total'],
  companyName: 'ASOCIACIÓN ESPERANZA INTERNACIONAL, INC.'
};

export const exportToExcel = (invoice: Invoice, options: ExportOptions = {}) => {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const workbook = XLSX.utils.book_new();
  
  const items = invoice.items.map(item => {
    const row: any = {};
    if (opts.visibleColumns?.includes('description')) row['Descripción'] = item.description;
    if (opts.visibleColumns?.includes('subtotal')) row['Monto'] = item.subtotal;
    if (opts.visibleColumns?.includes('itbisRate')) row['Tasa ITBIS'] = `${(item.itbisRate * 100).toFixed(0)}%`;
    if (opts.visibleColumns?.includes('itbis')) row['ITBIS'] = item.itbis;
    if (opts.visibleColumns?.includes('total')) row['Total'] = item.total;
    return row;
  });

  const itemsWs = XLSX.utils.json_to_sheet(items);
  
  if (opts.includeHeader) {
    XLSX.utils.sheet_add_aoa(itemsWs, [[opts.companyName]], { origin: 'A1' });
  }

  XLSX.utils.book_append_sheet(workbook, itemsWs, 'Detalles');

  const fileName = `factura-${invoice.ncf || 'sin-ncf'}.xlsx`;
  XLSX.writeFile(workbook, fileName);
};

export const exportToCSV = (invoice: Invoice, options: ExportOptions = {}) => {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  let csvContent = '';

  // Add header
  if (opts.includeHeader) {
    csvContent += `${opts.companyName}\n\n`;
    csvContent += `NCF: ${invoice.ncf}\n`;
    csvContent += `Fecha: ${format(invoice.issueDate, 'dd/MM/yyyy')}\n`;
    csvContent += `Cliente: ${invoice.clientName}\n`;
    csvContent += `RNC: ${invoice.clientRnc}\n\n`;
  }

  // Add column headers
  const headers: string[] = [];
  if (opts.visibleColumns?.includes('description')) headers.push('Descripción');
  if (opts.visibleColumns?.includes('subtotal')) headers.push('Monto');
  if (opts.visibleColumns?.includes('itbisRate')) headers.push('Tasa ITBIS');
  if (opts.visibleColumns?.includes('itbis')) headers.push('ITBIS');
  if (opts.visibleColumns?.includes('total')) headers.push('Total');
  
  csvContent += headers.join(',') + '\n';

  // Add items
  invoice.items.forEach(item => {
    const row: string[] = [];
    if (opts.visibleColumns?.includes('description')) row.push(`"${item.description}"`);
    if (opts.visibleColumns?.includes('subtotal')) row.push(item.subtotal.toString());
    if (opts.visibleColumns?.includes('itbisRate')) row.push(`${(item.itbisRate * 100).toFixed(0)}%`);
    if (opts.visibleColumns?.includes('itbis')) row.push(item.itbis.toString());
    if (opts.visibleColumns?.includes('total')) row.push(item.total.toString());
    csvContent += row.join(',') + '\n';
  });

  // Add footer
  if (opts.includeFooter) {
    csvContent += `\nSubtotal,${invoice.subtotal}\n`;
    csvContent += `ITBIS Total,${invoice.itbisTotal}\n`;
    csvContent += `Total,${invoice.total}\n`;
  }

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `factura-${invoice.ncf || 'sin-ncf'}.csv`;
  link.click();
};
