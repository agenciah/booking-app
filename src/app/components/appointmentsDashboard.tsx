import { useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/shadcnComponents/ui/table";
import { Badge } from "@/shadcnComponents/ui/badge";
import { Input } from "@/shadcnComponents/ui/input";

const sampleAppointments = [
  { id: 1, name: "Juan Pérez", date: "2025-03-12", time: "10:00 AM", status: "Confirmada" },
  { id: 2, name: "Ana López", date: "2025-03-13", time: "02:00 PM", status: "Pendiente" },
  { id: 3, name: "Carlos Ruiz", date: "2025-03-14", time: "11:00 AM", status: "Cancelada" },
];

export default function AppointmentsDashboard() {
  const [search, setSearch] = useState("");

  const filteredAppointments = sampleAppointments.filter((appointment) =>
    appointment.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <Input
        placeholder="Buscar cliente..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Hora</TableHead>
            <TableHead>Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAppointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>{appointment.name}</TableCell>
              <TableCell>{appointment.date}</TableCell>
              <TableCell>{appointment.time}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    appointment.status === "Confirmada" ? "default" :
                    appointment.status === "Pendiente" ? "secondary" : "destructive"
                  }
                >
                  {appointment.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
