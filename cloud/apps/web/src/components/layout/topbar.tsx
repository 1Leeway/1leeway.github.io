import { LayoutGrid, List, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TopbarProps {
  isGrid: boolean;
  onToggleView: () => void;
  search: string;
  onSearchChange: (value: string) => void;
}

export const Topbar = ({ isGrid, onToggleView, search, onSearchChange }: TopbarProps) => {
  return (
    <header className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-card/80 p-4 backdrop-blur md:flex-row md:items-center md:justify-between">
      <div className="relative w-full md:max-w-md">
        <Search className="pointer-events-none absolute left-3 top-2.5 text-zinc-600" size={16} />
        <Input
          className="pl-9"
          placeholder="Search files..."
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onToggleView}>
          {isGrid ? <List size={16} /> : <LayoutGrid size={16} />}
          <span className="ml-2">{isGrid ? "Liste" : "Grille"}</span>
        </Button>
      </div>
    </header>
  );
};
