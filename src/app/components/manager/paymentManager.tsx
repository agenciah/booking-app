import { useState, ChangeEvent } from "react";
import { Input } from "@/shadcnComponents/ui/input";
import { Button } from "@/shadcnComponents/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/shadcnComponents/ui/table";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/shadcnComponents/ui/select";

interface Payment {
  id: number;
  client: string;
  amount: string;
  method: string;
  status: "Pendiente" | "Completado";
}

const paymentMethods = ["Efectivo", "Tarjeta", "Transferencia"];

export default function PaymentsManager() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [newPayment, setNewPayment] = useState<Omit<Payment, 'id' | 'status'>>({ client: "", amount: "", method: "" });

  const handleAddPayment = () => {
    if (!newPayment.client || !newPayment.amount || !newPayment.method) return;
    setPayments([...payments, { ...newPayment, id: Date.now(), status: "Pendiente" }]);
    setNewPayment({ client: "", amount: "", method: "" });
  };

  const handleConfirmPayment = (id: number) => {
    setPayments(payments.map(payment =>
      payment.id === id ? { ...payment, status: "Completado" } : payment
    ));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Gestión de Pagos</h2>
      <div className="flex gap-2">
        <Input
          placeholder="Nombre del Cliente"
          value={newPayment.client}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPayment({ ...newPayment, client: e.target.value })}
        />
        <Input
          type="number"
          placeholder="Monto"
          value={newPayment.amount}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPayment({ ...newPayment, amount: e.target.value })}
        />
        <Select onValueChange={(value: string) => setNewPayment({ ...newPayment, method: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Método de Pago" />
          </SelectTrigger>
          <SelectContent>
            {paymentMethods.map((method) => (
              <SelectItem key={method} value={method}>{method}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={handleAddPayment}>Registrar</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
            <TableHead>Monto</TableHead>
            <TableHead>Método</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Acción</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell>{payment.client}</TableCell>
              <TableCell>${payment.amount}</TableCell>
              <TableCell>{payment.method}</TableCell>
              <TableCell>{payment.status}</TableCell>
              <TableCell>
                {payment.status === "Pendiente" && (
                  <Button onClick={() => handleConfirmPayment(payment.id)}>Confirmar</Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}