import React, { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  TextField,
  Box,
  Checkbox
} from '@mui/material';
import { Payment } from '../types/payment';
import { format } from 'date-fns';

type Order = 'asc' | 'desc';

interface Column {
  id: keyof Payment;
  label: string;
  numeric: boolean;
  format?: (value: any) => string;
}

const columns: Column[] = [
  { id: 'accountHolderName', label: 'Nombre del titular', numeric: false },
  { id: 'accountName', label: 'Nombre de la Cuenta', numeric: false },
  { id: 'accountId', label: 'Identificador de Cuenta', numeric: false },
  { id: 'groups', label: 'Grupos (Asociado)', numeric: false },
  { id: 'branchName', label: 'Nombre de la Sucursal', numeric: false },
  { 
    id: 'amount', 
    label: 'Monto', 
    numeric: true,
    format: (value: number) => value.toLocaleString('es-DO', { 
      style: 'currency', 
      currency: 'DOP' 
    })
  },
  { 
    id: 'principalAmount', 
    label: 'Monto del Capital', 
    numeric: true,
    format: (value: number) => value.toLocaleString('es-DO', { 
      style: 'currency', 
      currency: 'DOP' 
    })
  },
  { 
    id: 'interestAmount', 
    label: 'Monto de Interés', 
    numeric: true,
    format: (value: number) => value.toLocaleString('es-DO', { 
      style: 'currency', 
      currency: 'DOP' 
    })
  },
  { 
    id: 'feesAmount', 
    label: 'Monto Cargos', 
    numeric: true,
    format: (value: number) => value.toLocaleString('es-DO', { 
      style: 'currency', 
      currency: 'DOP' 
    })
  },
  { 
    id: 'penaltyAmount', 
    label: 'Monto de la Penalización', 
    numeric: true,
    format: (value: number) => value.toLocaleString('es-DO', { 
      style: 'currency', 
      currency: 'DOP' 
    })
  },
  { 
    id: 'valueDate', 
    label: 'Fecha del valor', 
    numeric: false,
    format: (value: string) => format(new Date(value), 'dd/MM/yyyy')
  },
  { id: 'channel', label: 'Canal', numeric: false },
  { id: 'user', label: 'Usuario', numeric: false }
];

interface PaymentResultsTableProps {
  payments: Payment[];
  onPaymentSelect: (payment: Payment) => void;
  selectedPayments: Payment[];
}

export const PaymentResultsTable: React.FC<PaymentResultsTableProps> = ({
  payments,
  onPaymentSelect,
  selectedPayments
}) => {
  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<keyof Payment>('valueDate');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState<Partial<Record<keyof Payment, string>>>({});

  const handleRequestSort = (property: keyof Payment) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (column: keyof Payment) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilters(prev => ({
      ...prev,
      [column]: event.target.value
    }));
    setPage(0);
  };

  const isSelected = (payment: Payment) => 
    selectedPayments.some(selected => selected.accountId === payment.accountId);

  const filteredPayments = payments.filter(payment => {
    return Object.entries(filters).every(([key, filterValue]) => {
      if (!filterValue) return true;
      const value = payment[key as keyof Payment];
      return String(value)
        .toLowerCase()
        .includes(filterValue.toLowerCase());
    });
  });

  const sortedPayments = filteredPayments.sort((a, b) => {
    const aValue = a[orderBy];
    const bValue = b[orderBy];
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return order === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    return order === 'asc'
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });

  const paginatedPayments = sortedPayments.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" />
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.numeric ? 'right' : 'left'}
                  sortDirection={orderBy === column.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : 'asc'}
                    onClick={() => handleRequestSort(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                  <TextField
                    size="small"
                    variant="standard"
                    placeholder="Filtrar"
                    value={filters[column.id] || ''}
                    onChange={handleFilterChange(column.id)}
                    sx={{ mt: 1 }}
                  />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedPayments.map((payment, index) => {
              const isItemSelected = isSelected(payment);
              return (
                <TableRow
                  hover
                  onClick={() => onPaymentSelect(payment)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={payment.accountId + index}
                  selected={isItemSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                    />
                  </TableCell>
                  {columns.map(column => (
                    <TableCell
                      key={column.id}
                      align={column.numeric ? 'right' : 'left'}
                    >
                      {column.format
                        ? column.format(payment[column.id])
                        : payment[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={filteredPayments.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} de ${count}`
        }
      />
    </Paper>
  );
};
