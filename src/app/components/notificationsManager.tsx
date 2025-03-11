import { useState } from "react";
import { Input } from "@/shadcnComponents/ui/input";
import { Button } from "@/shadcnComponents/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/shadcnComponents/ui/table";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/shadcnComponents/ui/select";

interface Notification {
  id: number;
  client: string;
  method: "email" | "sms" | undefined;
  message: string;
  sentAt: string;
}

export default function NotificationsManager() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [newNotification, setNewNotification] = useState<Omit<Notification, 'id' | 'sentAt'>>({ client: "", method: "", message: "" });

  const handleSendNotification = () => {
    if (!newNotification.client || !newNotification.method || !newNotification.message) return;
    setNotifications([...notifications, { ...newNotification, id: Date.now(), sentAt: new Date().toLocaleString() }]);
    setNewNotification({ client: "", method: "", message: "" });
  };

  const handleResendNotification = (id: number) => {
    const notification = notifications.find(n => n.id === id);
    if (notification) {
      setNotifications([...notifications, { ...notification, id: Date.now(), sentAt: new Date().toLocaleString() }]);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Gestión de Notificaciones</h2>
      <div className="flex gap-2">
        <Input
          placeholder="Cliente"
          value={newNotification.client}
          onChange={(e) => setNewNotification({ ...newNotification, client: e.target.value })}
        />
        <Select onValueChange={(value) => setNewNotification({ ...newNotification, method: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Método" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="email">Correo Electrónico</SelectItem>
            <SelectItem value="sms">SMS</SelectItem>
          </SelectContent>
        </Select>
        <Input
          placeholder="Mensaje"
          value={newNotification.message}
          onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
        />
        <Button onClick={handleSendNotification}>Enviar</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
            <TableHead>Método</TableHead>
            <TableHead>Mensaje</TableHead>
            <TableHead>Enviado</TableHead>
            <TableHead>Acción</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notifications.map((notification) => (
            <TableRow key={notification.id}>
              <TableCell>{notification.client}</TableCell>
              <TableCell>{notification.method === "email" ? "Correo" : "SMS"}</TableCell>
              <TableCell>{notification.message}</TableCell>
              <TableCell>{notification.sentAt}</TableCell>
              <TableCell>
                <Button onClick={() => handleResendNotification(notification.id)}>Reenviar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}