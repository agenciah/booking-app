import { useState } from "react";
import { Input } from "@/shadcnComponents/ui/input";
import { Button } from "@/shadcnComponents/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/shadcnComponents/ui/table";

interface Appointment {
  id: number;
  client: string;
  service: string;
  date: string;
  time: string;
}

export default function AppointmentsManager() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [newAppointment, setNewAppointment] = useState<Omit<Appointment, 'id'>>({ client: "", service: "", date: "", time: "" });

  const handleAddAppointment = () => {
    if (!newAppointment.client || !newAppointment.service || !newAppointment.date || !newAppointment.time) return;
    setAppointments([...appointments, { ...newAppointment, id: Date.now() }]);
    setNewAppointment({ client: "", service: "", date: "", time: "" });
  };

  const handleRemoveAppointment = (id: number) => {
    setAppointments(appointments.filter(appointment => appointment.id !== id));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Gestión de Citas</h2>
      <div className="flex gap-2">
        <Input
          placeholder="Cliente"
          value={newAppointment.client}
          onChange={(e) => setNewAppointment({ ...newAppointment, client: e.target.value })}
        />
        <Input
          placeholder="Servicio"
          value={newAppointment.service}
          onChange={(e) => setNewAppointment({ ...newAppointment, service: e.target.value })}
        />
        <Input
          type="date"
          value={newAppointment.date}
          onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
        />
        <Input
          type="time"
          value={newAppointment.time}
          onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
        />
        <Button onClick={handleAddAppointment}>Agregar</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
            <TableHead>Servicio</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Hora</TableHead>
            <TableHead>Acción</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>{appointment.client}</TableCell>
              <TableCell>{appointment.service}</TableCell>
              <TableCell>{appointment.date}</TableCell>
              <TableCell>{appointment.time}</TableCell>
              <TableCell>
                <Button variant="destructive" onClick={() => handleRemoveAppointment(appointment.id)}>
                  Cancelar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}