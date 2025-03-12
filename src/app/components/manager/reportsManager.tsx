import { useState } from "react";
import { Button } from "@/shadcnComponents/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/shadcnComponents/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcnComponents/ui/popover";
import { Calendar } from "@/shadcnComponents/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/shadcnComponents/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Report {
  month: string;
  ingresos: number;
}

const sampleData: Report[] = [
  { month: "Enero", ingresos: 5000 },
  { month: "Febrero", ingresos: 7000 },
  { month: "Marzo", ingresos: 8500 },
];

export default function ReportsManager() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [reports, setReports] = useState<Report[]>(sampleData);

  const handleGenerateReport = () => {
    console.log("Generando reporte de", startDate, "a", endDate);
  };

  const StartDatePicker = () => {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !startDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {startDate ? format(startDate, "PPP") : <span>Fecha Inicio</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={startDate || undefined}
            onSelect={(date: Date | undefined) => setStartDate(date || null)}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    );
  };

  const EndDatePicker = () => {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !endDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {endDate ? format(endDate, "PPP") : <span>Fecha Fin</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={endDate || undefined}
            onSelect={(date: Date | undefined) => setEndDate(date || null)}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Gestión de Reportes</h2>
      <div className="flex gap-2">
        <StartDatePicker />
        <EndDatePicker />
        <Button onClick={handleGenerateReport}>Generar Reporte</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Ingresos Mensuales</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={reports}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="ingresos" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Mes</TableHead>
            <TableHead>Ingresos</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.map((report, index) => (
            <TableRow key={index}>
              <TableCell>{report.month}</TableCell>
              <TableCell>${report.ingresos}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}