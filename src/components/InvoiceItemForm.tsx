// ... previous imports ...

export const InvoiceItemForm: React.FC<InvoiceItemFormProps> = ({
  item,
  onUpdate,
  onDelete
}) => {
  const handleItbisRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRate = parseFloat(event.target.value);
    const newItbis = Number((item.subtotal * newRate).toFixed(2));
    const newTotal = Number((item.subtotal + newItbis).toFixed(2));

    onUpdate({
      ...item,
      itbisRate: newRate,
      itbis: newItbis,
      total: newTotal
    });
  };

  // ... rest of the component
};
