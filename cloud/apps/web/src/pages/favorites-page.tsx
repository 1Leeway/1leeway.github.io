import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { FileCard } from "@/components/files/file-card";
import { FileListRow } from "@/components/files/file-list-row";
import { api } from "@/lib/api";
import type { CloudFile } from "@/types/api";

export const FavoritesPage = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState<CloudFile[]>([]);
  const [search, setSearch] = useState("");
  const [isGrid, setIsGrid] = useState(true);
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
      .get<{ files: CloudFile[] }>("/files/favorites")
      .then((response) => setFiles(response.data.files))
      .catch(() => setFiles([]));
  }, [authChecked]);

  const filtered = files.filter((file) =>
    search.trim() ? file.originalName.toLowerCase().includes(search.toLowerCase()) : true
  );

  const handleToggleFavorite = async (id: string, nextValue: boolean) => {
    try {
      await api.patch(`/files/${id}`, { isFavorite: nextValue });
      setFiles((current) =>
        nextValue ? current.map((file) => (file.id === id ? { ...file, isFavorite: true } : file)) : current.filter((file) => file.id !== id)
      );
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
            <p className="mb-4 text-sm text-zinc-300">{filtered.length} fichiers favoris</p>

            {isGrid ? (
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((file) => (
                  <FileCard
                    key={file.id}
                    file={file}
                    onDelete={() => {}}
                    onToggleFavorite={handleToggleFavorite}
                    isSelected={false}
                    onToggleSelect={() => {}}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filtered.map((file) => (
                  <FileListRow
                    key={file.id}
                    file={file}
                    onDelete={() => {}}
                    onToggleFavorite={handleToggleFavorite}
                    isSelected={false}
                    onToggleSelect={() => {}}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};
