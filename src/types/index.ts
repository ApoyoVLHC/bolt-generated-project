export interface Invoice {
  id: string;
  ncf: string;
  issueDate: Date;
  dueDate: Date;
  clientRnc: string;
  clientName: string;
  items: InvoiceItem[];
  subtotal: number;
  itbis: number;
  total: number;
}

export interface InvoiceItem {
  quantity: number;
  description: string;
  unitPrice: number;
  itbisRate: number;
  subtotal: number;
}

export interface FiscalReceipt {
  authorizationDate: Date;
  receiptType: string;
  receiptNumber: string;
  sequentialNumber: string;
}
