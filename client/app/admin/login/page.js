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
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-bg">
      {/* Panel Izquierdo — Branding Premium */}
      <div className="hidden md:flex flex-col justify-between p-14 relative overflow-hidden" style={{ background: 'var(--sidebar-bg)' }}>
        {/* Decoración de fondo sutil */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-[#2A4A48] via-[#1E3332] to-[#0F1F1E] opacity-80 pointer-events-none"></div>

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
          <p className="text-lg leading-relaxed font-light" style={{ color: 'var(--sidebar-text)' }}>
            Panel de administración centralizado para el control del catálogo de
            tratamientos y productos.
          </p>
        </div>

        <div className="relative z-10 flex items-center justify-between text-sm" style={{ color: 'rgba(156, 171, 169, 0.6)' }}>
          <p>© 2026 Sbeltic. Uso interno exclusivo.</p>
          <p>Vidix Studio</p>
        </div>
      </div>

      {/* Panel Derecho — Formulario de Login */}
      <div className="flex flex-col items-center justify-center px-8 py-12 md:px-16 bg-surface shadow-[-20px_0_40px_-15px_rgba(0,0,0,0.05)] z-10 relative">
        <div className="w-full max-w-sm">
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-3xl font-semibold text-text mb-2 tracking-tight">
              Iniciar Sesión
            </h1>
            <p className="text-text-muted text-base">
              Ingresa tus credenciales de administrador
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <FormField label="Correo electrónico" required>
              <div className="relative group">
                <EnvelopeSimple
                  size={20}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-subtle transition-colors duration-200 group-focus-within:text-primary pointer-events-none"
                />
                <Input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="admin@sbeltic.com"
                  autoComplete="email"
                  required
                  className="pl-11 w-full border-border focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors duration-150"
                />
              </div>
            </FormField>

            <FormField label="Contraseña" required>
              <div className="relative group">
                <LockSimple
                  size={20}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-subtle transition-colors duration-200 group-focus-within:text-primary pointer-events-none"
                />
                <Input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                  className="pl-11 w-full border-border focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors duration-150"
                />
              </div>
            </FormField>

            {error && (
              <div className="bg-danger-light border border-danger/20 rounded-lg px-4 py-3 flex items-center gap-3 animate-in fade-in duration-200">
                <p className="text-sm text-danger font-medium">{error}</p>
              </div>
            )}

            <div className="pt-2">
              <Button
                type="submit"
                size="lg"
                loading={loading}
                className="w-full justify-center rounded-lg h-12 transition-colors duration-150"
              >
                {loading ? "Verificando..." : "Acceder al panel"}
                {!loading && <ArrowRight size={20} className="ml-2" />}
              </Button>
            </div>
          </form>

          {/* Sello de confianza */}
          <div className="mt-8 flex items-center justify-center gap-2 text-text-subtle">
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
