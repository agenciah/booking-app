import { useState } from "react";
import { signIn } from "next-auth/react";
import { Input } from "@/shadcnComponents/ui/input";
import { Button } from "@/shadcnComponents/ui/button";
import { Card, CardContent } from "@/shadcnComponents/ui/card";

export default function AuthComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => { // Agrega el tipo aquí
    e.preventDefault();
    await signIn("credentials", { email, password, redirect: false });
  };

  return (
    <Card className="max-w-md mx-auto p-4">
      <CardContent>
        <h2 className="text-lg font-semibold mb-4">Iniciar Sesión</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" className="w-full">Iniciar Sesión</Button>
        </form>
        <div className="mt-4 text-center">
          <Button variant="outline" onClick={() => signIn("google")} className="w-full">
            Iniciar con Google
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
