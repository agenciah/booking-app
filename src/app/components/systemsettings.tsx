import { useState, ChangeEvent } from "react";
import { Input } from "@/shadcnComponents/ui/input";
import { Button } from "@/shadcnComponents/ui/button";
import { Switch } from "@/shadcnComponents/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/shadcnComponents/ui/card";
import { Label } from "@/shadcnComponents/ui/label";

interface WorkingHours {
  open: string;
  close: string;
}

interface Roles {
  admin: boolean;
  staff: boolean;
  client: boolean;
}

export default function SystemSettings() {
  const [workingHours, setWorkingHours] = useState<WorkingHours>({ open: "08:00", close: "18:00" });
  const [notifications, setNotifications] = useState<boolean>(true);
  const [roles, setRoles] = useState<Roles>({ admin: true, staff: false, client: false });

  const handleSaveSettings = () => {
    console.log("Configuración guardada:", { workingHours, notifications, roles });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Configuración del Sistema</h2>

      <Card>
        <CardHeader>
          <CardTitle>Horarios de Atención</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Label>Apertura</Label>
          <Input
            type="time"
            value={workingHours.open}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setWorkingHours({ ...workingHours, open: e.target.value })}
          />
          <Label>Cierre</Label>
          <Input
            type="time"
            value={workingHours.close}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setWorkingHours({ ...workingHours, close: e.target.value })}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notificaciones</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-2">
          <Label>Habilitar Notificaciones</Label>
          <Switch checked={notifications} onCheckedChange={setNotifications} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Roles de Usuario</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {Object.keys(roles).map((role) => (
            <div key={role} className="flex items-center gap-2">
              <Label>{role.charAt(0).toUpperCase() + role.slice(1)}</Label>
              <Switch
                checked={role in roles ? roles[role as keyof Roles] : false} // Verificación de clave aquí
                onCheckedChange={(checked: boolean) => setRoles({ ...roles, [role]: checked })}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Button onClick={handleSaveSettings}>Guardar Configuración</Button>
    </div>
  );
}