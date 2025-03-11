import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/shadcnComponents/ui/input";
import { Button } from "@/shadcnComponents/ui/button";
import { Label } from "@/shadcnComponents/ui/label";

const bookingSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio"),
  email: z.string().email("Correo inválido"),
  phone: z.string().min(8, "Número inválido"),
  notes: z.string().optional(),
});

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  notes?: string;
}

interface BookingFormProps {
  onSubmit: (data: BookingFormData) => void;
}

export default function BookingForm({ onSubmit }: BookingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label>Nombre</Label>
        <Input {...register("name")} placeholder="Tu nombre" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <Label>Correo Electrónico</Label>
        <Input {...register("email")} placeholder="tu@email.com" type="email" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <Label>Teléfono</Label>
        <Input {...register("phone")} placeholder="1234567890" type="tel" />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
      </div>

      <div>
        <Label>Notas Adicionales</Label>
        <Input {...register("notes")} placeholder="Detalles opcionales" />
      </div>

      <Button type="submit" className="w-full">Reservar Cita</Button>
    </form>
  );
}