import { Invoice, InvoiceItem } from '../types/invoice';

interface ValidationError {
  field: string;
  message: string;
  example?: string;
  solution?: string;
}

export const validateInvoice = (invoice: Invoice): ValidationError[] => {
  const errors: ValidationError[] = [];

  // NCF Validation
  if (!invoice.ncf) {
    errors.push({
      field: 'ncf',
      message: 'El NCF es requerido',
      example: 'Formato esperado: B0100000001',
      solution: 'Ingrese un número de comprobante fiscal válido'
    });
  }

  // RNC Validation
  if (!invoice.clientRnc) {
    errors.push({
      field: 'clientRnc',
      message: 'El RNC del cliente es requerido',
      example: 'Formato esperado: 123456789',
      solution: 'Ingrese el número de RNC del cliente'
    });
  } else if (!/^\d{9}$/.test(invoice.clientRnc)) {
    errors.push({
      field: 'clientRnc',
      message: 'El formato del RNC es inválido',
      example: 'Debe contener 9 dígitos',
      solution: 'Verifique que el RNC contenga exactamente 9 dígitos numéricos'
    });
  }

  // Client Name Validation
  if (!invoice.clientName) {
    errors.push({
      field: 'clientName',
      message: 'El nombre del cliente es requerido',
      solution: 'Ingrese el nombre completo del cliente'
    });
  }

  // Items Validation
  if (!invoice.items.length) {
    errors.push({
      field: 'items',
      message: 'La factura debe tener al menos un item',
      solution: 'Seleccione uno o más pagos para incluir en la factura'
    });
  }

  // ITBIS and Calculations Validation
  let calculatedSubtotal = 0;
  let calculatedItbis = 0;

  invoice.items.forEach((item, index) => {
    // Validate ITBIS rate
    if (item.itbisRate < 0 || item.itbisRate > 1) {
      errors.push({
        field: `items[${index}].itbisRate`,
        message: 'Tasa de ITBIS inválida',
        example: 'Valores permitidos: 0%, 16%, 18%',
        solution: 'Seleccione una tasa de ITBIS válida del menú desplegable'
      });
    }

    // Validate calculations with detailed messages
    const expectedSubtotal = Number((item.quantity * item.unitPrice).toFixed(2));
    const expectedItbis = Number((expectedSubtotal * item.itbisRate).toFixed(2));
    const expectedTotal = Number((expectedSubtotal + expectedItbis).toFixed(2));

    if (Math.abs(item.subtotal - expectedSubtotal) > 0.01) {
      errors.push({
        field: `items[${index}].subtotal`,
        message: `Subtotal calculado incorrectamente en el item ${index + 1}`,
        example: `Valor esperado: ${expectedSubtotal.toFixed(2)}`,
        solution: 'Verifique el cálculo: cantidad × precio unitario'
      });
    }

    if (Math.abs(item.itbis - expectedItbis) > 0.01) {
      errors.push({
        field: `items[${index}].itbis`,
        message: `ITBIS calculado incorrectamente en el item ${index + 1}`,
        example: `Valor esperado: ${expectedItbis.toFixed(2)}`,
        solution: 'Verifique el cálculo: subtotal × tasa ITBIS'
      });
    }

    calculatedSubtotal += item.subtotal;
    calculatedItbis += item.itbis;
  });

  // Validate totals with detailed messages
  const calculatedTotal = Number((calculatedSubtotal + calculatedItbis).toFixed(2));

  if (Math.abs(invoice.total - calculatedTotal) > 0.01) {
    errors.push({
      field: 'total',
      message: 'El total de la factura no coincide con los cálculos',
      example: `Valor esperado: ${calculatedTotal.toFixed(2)}`,
      solution: 'Verifique la suma del subtotal y el ITBIS total'
    });
  }

  return errors;
};
