import { useState } from "react";
import { Input } from "@/shadcnComponents/ui/input";
import { Button } from "@/shadcnComponents/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/shadcnComponents/ui/table";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/shadcnComponents/ui/select";

interface Schedule {
  id: number;
  day: string;
  startTime: string;
  endTime: string;
}

const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

export default function ScheduleManager() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [newSchedule, setNewSchedule] = useState<Omit<Schedule, 'id'>>({ day: "", startTime: "", endTime: "" });

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
      <h2 className="text-lg font-semibold">Gestión de Horarios</h2>
      <div className="flex gap-2">
        <Select onValueChange={(value) => setNewSchedule({ ...newSchedule, day: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Día de la semana" />
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
          onChange={(e) => setNewSchedule({ ...newSchedule, startTime: e.target.value })}
        />
        <Input
          type="time"
          value={newSchedule.endTime}
          onChange={(e) => setNewSchedule({ ...newSchedule, endTime: e.target.value })}
        />
        <Button onClick={handleAddSchedule}>Agregar</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Día</TableHead>
            <TableHead>Hora Inicio</TableHead>
            <TableHead>Hora Fin</TableHead>
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