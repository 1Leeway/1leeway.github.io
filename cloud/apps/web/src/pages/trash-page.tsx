import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import type { CloudFile } from "@/types/api";

export const TrashPage = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState<CloudFile[]>([]);
  const [search, setSearch] = useState("");
  const [isGrid, setIsGrid] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    api
      .get("/auth/me")
      .then(() => setAuthChecked(true))
      .catch(() => navigate("/"));
  }, [navigate]);

  useEffect(() => {
    if (!authChecked) return;

    api
      .get<{ files: CloudFile[] }>("/files/trash")
      .then((response) => setFiles(response.data.files))
      .catch(() => setFiles([]));
  }, [authChecked]);

  const filtered = files.filter((file) =>
    search.trim() ? file.originalName.toLowerCase().includes(search.toLowerCase()) : true
  );

  const handleRestore = async (id: string) => {
    try {
      await api.post(`/files/${id}/restore`);
      setFiles((current) => current.filter((file) => file.id !== id));
    } catch {
      // Keep UI stable on errors.
    }
  };

  if (!authChecked) {
    return <main className="grid min-h-screen place-items-center bg-background text-zinc-300">Verification de session...</main>;
  }

  return (
    <main className="min-h-screen bg-background p-4 text-white md:p-6">
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-[280px_1fr]">
        <Sidebar />
        <section className="space-y-4">
          <Topbar
            isGrid={isGrid}
            onToggleView={() => setIsGrid((value) => !value)}
            search={search}
            onSearchChange={setSearch}
          />

          <div className="rounded-2xl border border-white/10 bg-card/80 p-4">
            <p className="mb-4 text-sm text-zinc-300">{filtered.length} elements dans la corbeille</p>

            <div className="space-y-2">
              {filtered.map((file) => (
                <div
                  key={file.id}
                  className="grid grid-cols-[1.5fr_0.8fr_0.6fr_0.35fr] items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 text-sm text-zinc-200"
                >
                  <span className="truncate">{file.originalName}</span>
                  <span className="text-zinc-400">{new Date(file.createdAt).toLocaleDateString()}</span>
                  <span className="text-zinc-400">{Math.ceil(Number(file.sizeBytes) / 1024)} KB</span>
                  <div className="justify-self-end">
                    <Button size="sm" variant="outline" onClick={() => handleRestore(file.id)}>
                      <RotateCcw size={14} />
                      <span className="ml-2">Restaurer</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
