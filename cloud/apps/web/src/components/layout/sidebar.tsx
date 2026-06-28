import {
  House,
  FolderOpen,
  Star,
  Share2,
  Trash2,
  Settings,
  UserRound
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const links = [
  { label: "Accueil", icon: House, to: "/cloud" },
  { label: "Mes fichiers", icon: FolderOpen, to: "/cloud" },
  { label: "Favoris", icon: Star, to: "/favorites" },
  { label: "Partages", icon: Share2, to: "/cloud" },
  { label: "Corbeille", icon: Trash2, to: "/trash" },
  { label: "Parametres", icon: Settings, to: "/cloud" },
  { label: "Profil", icon: UserRound, to: "/cloud" }
];

export const Sidebar = () => {
  return (
    <aside className="w-full rounded-2xl border border-white/10 bg-sidebar/95 p-4 md:w-72">
      <div className="mb-6 px-2">
        <p className="font-display text-lg font-semibold tracking-tight text-white">Nebula Cloud.</p>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">Private Developper Storage</p>
      </div>

      <nav className="space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-medium text-zinc-400 transition hover:bg-white/5 hover:text-white",
                  isActive && "border border-white/15 bg-white/[0.06] text-white"
                )
              }
            >
              <Icon size={16} />
              {link.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};
