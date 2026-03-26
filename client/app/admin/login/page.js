"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  EnvelopeSimple,
  LockSimple,
  ArrowRight,
  ShieldCheck,
} from "@phosphor-icons/react";
import { auth } from "@/lib/api";
import { setToken, setStoredUser } from "@/hooks/useAuth";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import FormField from "@/components/ui/FormField";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await auth.login(form.email, form.password);
      setToken(data.token);
      setStoredUser(data.user);
      router.push("/admin");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-slate-50">
      {/* Panel Izquierdo — Branding Premium */}
      <div className="hidden md:flex flex-col justify-between p-14 bg-slate-900 relative overflow-hidden">
        {/* Decoración de fondo muy sutil para quitar lo plano */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black opacity-80 pointer-events-none"></div>

        <div className="relative z-10">
          <span className="text-3xl font-bold tracking-tight text-white">
            Sbeltic.
          </span>
        </div>

        <div className="relative z-10 max-w-md">
          <h2 className="text-4xl font-light text-white leading-tight mb-5">
            Gestión clínica con <br />
            <span className="font-semibold">precisión absoluta.</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed font-light">
            Panel de administración centralizado para el control del catálogo de
            tratamientos y productos.
          </p>
        </div>

        <div className="relative z-10 flex items-center justify-between text-slate-500 text-sm">
          <p>© 2026 Sbeltic. Uso interno exclusivo.</p>
          <p>Vidix Studio</p>
        </div>
      </div>

      {/* Panel Derecho — Formulario de Login */}
      <div className="flex flex-col items-center justify-center px-8 py-12 md:px-16 bg-white shadow-[-20px_0_40px_-15px_rgba(0,0,0,0.05)] z-10 relative">
        <div className="w-full max-w-sm">
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-3xl font-semibold text-slate-900 mb-2 tracking-tight">
              Iniciar Sesión
            </h1>
            <p className="text-slate-500 text-base">
              Ingresa tus credenciales de administrador
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <FormField label="Correo electrónico" required>
              <div className="relative group">
                <EnvelopeSimple
                  size={20}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors duration-200 group-focus-within:text-slate-900 pointer-events-none"
                />
                <Input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="admin@sbeltic.com"
                  autoComplete="email"
                  required
                  className="pl-11 w-full border-slate-200 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors duration-150"
                />
              </div>
            </FormField>

            <FormField label="Contraseña" required>
              <div className="relative group">
                <LockSimple
                  size={20}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors duration-200 group-focus-within:text-slate-900 pointer-events-none"
                />
                <Input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                  className="pl-11 w-full border-slate-200 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors duration-150"
                />
              </div>
            </FormField>

            {error && (
              <div className="bg-red-50 border border-red-100 rounded-lg px-4 py-3 flex items-center gap-3 animate-in fade-in duration-200">
                <p className="text-sm text-red-600 font-medium">{error}</p>
              </div>
            )}

            <div className="pt-2">
              <Button
                type="submit"
                size="lg"
                loading={loading}
                className="w-full justify-center bg-slate-900 hover:bg-slate-800 text-white rounded-lg h-12 transition-colors duration-150"
              >
                {loading ? "Verificando..." : "Acceder al panel"}
                {!loading && <ArrowRight size={20} className="ml-2" />}
              </Button>
            </div>
          </form>

          {/* Sello de confianza para clínica */}
          <div className="mt-8 flex items-center justify-center gap-2 text-slate-400">
            <ShieldCheck size={18} />
            <span className="text-xs font-medium uppercase tracking-wider">
              Acceso encriptado y seguro
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
