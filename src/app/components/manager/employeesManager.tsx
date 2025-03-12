import { useState, ChangeEvent } from "react"; // Importa ChangeEvent
import { Input } from "@/shadcnComponents/ui/input";
import { Button } from "@/shadcnComponents/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/shadcnComponents/ui/table";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/shadcnComponents/ui/select";

interface Employee {
  id: number;
  name: string;
  email: string;
  role: "admin" | "staff";
}

export default function EmployeesManager() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [newEmployee, setNewEmployee] = useState<Omit<Employee, 'id'>>({ name: "", email: "", role: "admin" });

  const handleAddEmployee = () => {
    if (!newEmployee.name || !newEmployee.email || !newEmployee.role) return;
    setEmployees([...employees, { ...newEmployee, id: Date.now() }]);
    setNewEmployee({ name: "", email: "", role: "admin" });
  };

  const handleRemoveEmployee = (id: number) => {
    setEmployees(employees.filter(employee => employee.id !== id));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Gestión de Empleados</h2>
      <div className="flex gap-2">
        <Input
          placeholder="Nombre"
          value={newEmployee.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewEmployee({ ...newEmployee, name: e.target.value })}
        />
        <Input
          type="email"
          placeholder="Correo Electrónico"
          value={newEmployee.email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewEmployee({ ...newEmployee, email: e.target.value })}
        />
        <Select onValueChange={(value: string) => setNewEmployee({ ...newEmployee, role: value as "admin" | "staff" })}>
          <SelectTrigger>
            <SelectValue placeholder="Rol" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Administrador</SelectItem>
            <SelectItem value="staff">Empleado</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleAddEmployee}>Agregar</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Correo Electrónico</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead>Acción</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.role === "admin" ? "Administrador" : "Empleado"}</TableCell>
              <TableCell>
                <Button variant="destructive" onClick={() => handleRemoveEmployee(employee.id)}>
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