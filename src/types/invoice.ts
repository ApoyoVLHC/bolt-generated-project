export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  itbisRate: number;
  subtotal: number;
  itbis: number;
  total: number;
}

export interface Invoice {
  id: string;
  ncf: string;
  issueDate: Date;
  dueDate: Date;
  clientRnc: string;
  clientName: string;
  branchName: string;
  items: InvoiceItem[];
  subtotal: number;
  itbisTotal: number;
  total: number;
}
