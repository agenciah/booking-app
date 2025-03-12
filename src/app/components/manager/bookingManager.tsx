import { useState, ChangeEvent } from "react";
import { Input } from "@/shadcnComponents/ui/input";
import { Button } from "@/shadcnComponents/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/shadcnComponents/ui/table";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/shadcnComponents/ui/select";

interface Booking {
  id: number;
  client: string;
  date: string;
  time: string;
}

const times = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

export default function BookingManager() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [newBooking, setNewBooking] = useState<Omit<Booking, 'id'>>({ client: "", date: "", time: "" });

  const handleAddBooking = () => {
    if (!newBooking.client || !newBooking.date || !newBooking.time) return;
    setBookings([...bookings, { ...newBooking, id: Date.now() }]);
    setNewBooking({ client: "", date: "", time: "" });
  };

  const handleRemoveBooking = (id: number) => {
    setBookings(bookings.filter(booking => booking.id !== id));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Gestión de Reservas</h2>
      <div className="flex gap-2">
        <Input
          placeholder="Nombre del Cliente"
          value={newBooking.client}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewBooking({ ...newBooking, client: e.target.value })}
        />
        <Input
          type="date"
          value={newBooking.date}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewBooking({ ...newBooking, date: e.target.value })}
        />
        <Select onValueChange={(value: string) => setNewBooking({ ...newBooking, time: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Hora" />
          </SelectTrigger>
          <SelectContent>
            {times.map((time) => (
              <SelectItem key={time} value={time}>{time}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={handleAddBooking}>Reservar</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Hora</TableHead>
            <TableHead>Acción</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>{booking.client}</TableCell>
              <TableCell>{booking.date}</TableCell>
              <TableCell>{booking.time}</TableCell>
              <TableCell>
                <Button variant="destructive" onClick={() => handleRemoveBooking(booking.id)}>
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