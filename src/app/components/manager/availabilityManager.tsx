import { useState, ChangeEvent } from "react";
import { Input } from "@/shadcnComponents/ui/input";
import { Button } from "@/shadcnComponents/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/shadcnComponents/ui/table";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/shadcnComponents/ui/select";

interface AvailabilitySchedule {
  id: number;
  day: string;
  startTime: string;
  endTime: string;
}

const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

export default function AvailabilityManager() {
  const [schedules, setSchedules] = useState<AvailabilitySchedule[]>([]);
  const [newSchedule, setNewSchedule] = useState<Omit<AvailabilitySchedule, 'id'>>({ day: "", startTime: "", endTime: "" });

  const handleAddSchedule = () => {
    if (!newSchedule.day || !newSchedule.startTime || !newSchedule.endTime) return;
    setSchedules([...schedules, { ...newSchedule, id: Date.now() }]);
    setNewSchedule({ day: "", startTime: "", endTime: "" });
  };

  const handleRemoveSchedule = (id: number) => {
    setSchedules(schedules.filter(schedule => schedule.id !== id));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Gestión de Disponibilidad</h2>
      <div className="flex gap-2">
        <Select onValueChange={(value: string) => setNewSchedule({ ...newSchedule, day: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Día" />
          </SelectTrigger>
          <SelectContent>
            {daysOfWeek.map((day) => (
              <SelectItem key={day} value={day}>{day}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="time"
          value={newSchedule.startTime}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewSchedule({ ...newSchedule, startTime: e.target.value })}
        />
        <Input
          type="time"
          value={newSchedule.endTime}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewSchedule({ ...newSchedule, endTime: e.target.value })}
        />
        <Button onClick={handleAddSchedule}>Agregar</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Día</TableHead>
            <TableHead>Hora de Inicio</TableHead>
            <TableHead>Hora de Fin</TableHead>
            <TableHead>Acción</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schedules.map((schedule) => (
            <TableRow key={schedule.id}>
              <TableCell>{schedule.day}</TableCell>
              <TableCell>{schedule.startTime}</TableCell>
              <TableCell>{schedule.endTime}</TableCell>
              <TableCell>
                <Button variant="destructive" onClick={() => handleRemoveSchedule(schedule.id)}>
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}