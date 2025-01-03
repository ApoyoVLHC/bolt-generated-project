import { jsPDF } from 'jspdf';
import { Invoice, InvoiceItem } from '../types/invoice';
import { format } from 'date-fns';

export const generateInvoicePDF = (invoice: Invoice) => {
  const doc = new jsPDF();
  const margin = 20;
  let y = margin;

  // Header
  doc.setFontSize(18);
  doc.text('ASOCIACIÓN ESPERANZA INTERNACIONAL, INC.', margin, y);
  
  y += 10;
  doc.setFontSize(12);
  doc.text(`RNC: 401-50859-1`, margin, y);
  
  y += 6;
  doc.text('Santo Domingo, República Dominicana', margin, y);
  
  y += 6;
  doc.text('Calle Frank Félix Miranda, No.1, Ensanche Naco', margin, y);
  
  y += 6;
  doc.text('Teléfono: 809-450-0333', margin, y);

  // Invoice Details
  y += 15;
  doc.setFontSize(14);
  doc.text(`NCF: ${invoice.ncf}`, margin, y);
  doc.text(`Fecha: ${format(invoice.issueDate, 'dd/MM/yyyy')}`, 120, y);

  // Client Info
  y += 15;
  doc.setFontSize(12);
  doc.text(`Cliente: ${invoice.clientName}`, margin, y);
  y += 6;
  doc.text(`RNC: ${invoice.clientRnc}`, margin, y);
  y += 6;
  doc.text(`Sucursal: ${invoice.branchName}`, margin, y);

  // Items Table
  y += 15;
  const columns = ['Descripción', 'Monto', 'ITBIS', 'Total'];
  const columnWidths = [80, 30, 30, 30];
  let x = margin;

  // Table Header
  doc.setFillColor(240, 240, 240);
  doc.rect(x, y, 170, 8, 'F');
  columns.forEach((col, i) => {
    doc.text(col, x, y + 6);
    x += columnWidths[i];
  });

  // Table Content
  y += 12;
  invoice.items.forEach((item) => {
    x = margin;
    doc.text(item.description, x, y);
    x += columnWidths[0];
    
    const formatAmount = (amount: number) => 
      amount.toLocaleString('es-DO', {
        style: 'currency',
        currency: 'DOP'
      });

    doc.text(formatAmount(item.subtotal), x, y);
    x += columnWidths[1];
    doc.text(formatAmount(item.itbis), x, y);
    x += columnWidths[2];
    doc.text(formatAmount(item.total), x, y);
    
    y += 8;
  });

  // Totals
  y += 10;
  doc.text(`Subtotal: ${invoice.subtotal.toLocaleString('es-DO', { style: 'currency', currency: 'DOP' })}`, 120, y);
  y += 8;
  doc.text(`ITBIS Total: ${invoice.itbisTotal.toLocaleString('es-DO', { style: 'currency', currency: 'DOP' })}`, 120, y);
  y += 8;
  doc.text(`Total: ${invoice.total.toLocaleString('es-DO', { style: 'currency', currency: 'DOP' })}`, 120, y);

  return doc;
};
