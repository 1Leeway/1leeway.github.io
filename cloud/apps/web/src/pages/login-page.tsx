import { motion } from "framer-motion";
import { ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const LoginPage = () => {
  const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

  return (
    <main className="relative min-h-screen overflow-hidden bg-background px-6 py-10 text-white">
      <div className="pointer-events-none absolute left-[-140px] top-[-120px] h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-120px] right-[-120px] h-80 w-80 rounded-full bg-white/5 blur-3xl" />

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto mt-20 max-w-xl rounded-3xl border border-white/10 bg-white/[0.02] p-8 shadow-glass backdrop-blur"
      >
        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-300">
          <Sparkles size={13} /> Personal Cloud Workspace
        </p>
        <h1 className="font-display text-4xl font-semibold tracking-tight">Nebula Cloud.</h1>
        <p className="mt-4 text-zinc-300">
          Stock, organise and share your files in a clean interface focused on clarity,
          motion, and detail.
        </p>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-sm text-zinc-300">
          <p className="inline-flex items-center gap-2 text-zinc-200">
            <ShieldCheck size={14} /> Connexion OAuth2 Discord uniquement
          </p>
          <p className="mt-2 text-xs">Aucun mot de passe local. Compte cree automatiquement.</p>
        </div>

        <Button className="mt-8 w-full" size="lg" asChild>
          <a href={`${apiUrl}/auth/discord`}>Se connecter avec Discord</a>
        </Button>
      </motion.section>
    </main>
  );
};
