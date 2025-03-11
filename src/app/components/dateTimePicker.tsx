"use client";
import { useState } from "react";
import { Calendar } from "@/shadcnComponents/ui/calendar";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/shadcnComponents/ui/dialog";
import { Button } from "@/shadcnComponents/ui/button";

interface DateTimePickerProps {
  onSelect: (dateTime: { date: Date | undefined; time: string | null }) => void;
}

export default function DateTimePicker({ onSelect }: DateTimePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const times: string[] = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Seleccionar Fecha y Hora</Button>
      </DialogTrigger>
      <DialogContent className="p-4">
      <DialogTitle>Seleccionar Fecha y Hora</DialogTitle> {/* Agrega DialogTitle */}
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="mb-4"
        />

        {selectedDate && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Selecciona un Horario</h2>
            <div className="grid grid-cols-3 gap-2">
              {times.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
        )}

        {selectedDate && selectedTime && (
          <Button
            className="mt-4 w-full"
            onClick={() => onSelect({ date: selectedDate, time: selectedTime })}
          >
            Confirmar Cita
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}