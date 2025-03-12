import { useState } from "react";
import { Input } from "@/shadcnComponents/ui/input";
import { Button } from "@/shadcnComponents/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/shadcnComponents/ui/table";

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export default function ClientsManager() {
  const [clients, setClients] = useState<Client[]>([]);
  const [newClient, setNewClient] = useState<Omit<Client, 'id'>>({ name: "", email: "", phone: "" });

  const handleAddClient = () => {
    if (!newClient.name || !newClient.email || !newClient.phone) return;
    setClients([...clients, { ...newClient, id: Date.now() }]);
    setNewClient({ name: "", email: "", phone: "" });
  };

  const handleRemoveClient = (id: number) => {
    setClients(clients.filter(client => client.id !== id));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Gestión de Clientes</h2>
      <div className="flex gap-2">
        <Input
          placeholder="Nombre"
          value={newClient.name}
          onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
        />
        <Input
          placeholder="Correo electrónico"
          type="email"
          value={newClient.email}
          onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
        />
        <Input
          placeholder="Teléfono"
          type="tel"
          value={newClient.phone}
          onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
        />
        <Button onClick={handleAddClient}>Agregar</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Correo</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Acción</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>{client.name}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>{client.phone}</TableCell>
              <TableCell>
                <Button variant="destructive" onClick={() => handleRemoveClient(client.id)}>
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