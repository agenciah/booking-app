import { useState } from "react";
import { Input } from "@/shadcnComponents/ui/input";
import { Button } from "@/shadcnComponents/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/shadcnComponents/ui/table";

interface Service {
  id: number;
  name: string;
  duration: string;
  price: string;
}

export default function ServicesManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [newService, setNewService] = useState<Omit<Service, 'id'>>({ name: "", duration: "", price: "" });

  const handleAddService = () => {
    if (!newService.name || !newService.duration || !newService.price) return;
    setServices([...services, { ...newService, id: Date.now() }]);
    setNewService({ name: "", duration: "", price: "" });
  };

  const handleRemoveService = (id: number) => {
    setServices(services.filter(service => service.id !== id));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Gestión de Servicios</h2>
      <div className="flex gap-2">
        <Input
          placeholder="Nombre del servicio"
          value={newService.name}
          onChange={(e) => setNewService({ ...newService, name: e.target.value })}
        />
        <Input
          placeholder="Duración (min)"
          type="number"
          value={newService.duration}
          onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
        />
        <Input
          placeholder="Precio ($)"
          type="number"
          value={newService.price}
          onChange={(e) => setNewService({ ...newService, price: e.target.value })}
        />
        <Button onClick={handleAddService}>Agregar</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Servicio</TableHead>
            <TableHead>Duración</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Acción</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service) => (
            <TableRow key={service.id}>
              <TableCell>{service.name}</TableCell>
              <TableCell>{service.duration} min</TableCell>
              <TableCell>${service.price}</TableCell>
              <TableCell>
                <Button variant="destructive" onClick={() => handleRemoveService(service.id)}>
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