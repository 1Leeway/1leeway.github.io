import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownUp, CheckSquare, FolderPlus, FolderTree, Square, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { Button } from "@/components/ui/button";
import { FileCard } from "@/components/files/file-card";
import { FileListRow } from "@/components/files/file-list-row";
import { FolderCard } from "@/components/files/folder-card";
import { FolderListRow } from "@/components/files/folder-list-row";
import { UploadDropzone } from "@/components/files/upload-dropzone";
import { api } from "@/lib/api";
import type { CloudFile, Folder } from "@/types/api";

const sorters = [
  { key: "name", label: "Nom" },
  { key: "createdAt", label: "Date" },
  { key: "sizeBytes", label: "Taille" },
  { key: "mimeType", label: "Type" }
] as const;

export const CloudPage = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState<CloudFile[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<(typeof sorters)[number]["key"]>("createdAt");
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [moveTargetFolderId, setMoveTargetFolderId] = useState<string>("root");
  const [isGrid, setIsGrid] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);
  const [authChecked, setAuthChecked] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    api
      .get("/auth/me")
      .then(() => setAuthChecked(true))
      .catch(() => {
        navigate("/");
      });
  }, [navigate]);

  useEffect(() => {
    if (!authChecked) return;

    api
      .get<{ files: CloudFile[] }>("/files", {
        params: {
          search,
          folderId: currentFolderId ?? "root",
          sortBy,
          order: "desc"
        }
      })
      .then((response) => setFiles(response.data.files))
      .catch(() => {
        setFiles([]);
      });
  }, [search, sortBy, reloadKey, authChecked, currentFolderId]);

  useEffect(() => {
    if (!authChecked) return;

    api
      .get<{ folders: Folder[] }>("/folders")
      .then((response) => setFolders(response.data.folders))
      .catch(() => {
        setFolders([]);
      });
  }, [authChecked, reloadKey]);

  useEffect(() => {
    setSelectedIds((current) => current.filter((id) => files.some((file) => file.id === id)));
  }, [files]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "a") {
        event.preventDefault();
        setSelectedIds((current) =>
          current.length === files.length ? [] : files.map((file) => file.id)
        );
      }
    };

    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [files]);

  const sortedCount = files.length;
  const selectedCount = selectedIds.length;
  const allSelected = files.length > 0 && selectedCount === files.length;

  const folderById = new Map(folders.map((folder) => [folder.id, folder]));
  const currentFolder = currentFolderId ? folderById.get(currentFolderId) ?? null : null;
  const subFolders = folders.filter((folder) => folder.parentId === currentFolderId);

  const breadcrumb = (() => {
    if (!currentFolder) return [] as Folder[];
    const chain: Folder[] = [];
    const guard = new Set<string>();
    let cursor: Folder | null = currentFolder;
    while (cursor && !guard.has(cursor.id)) {
      chain.unshift(cursor);
      guard.add(cursor.id);
      cursor = cursor.parentId ? folderById.get(cursor.parentId) ?? null : null;
    }
    return chain;
  })();

  const handleDelete = async (id: string) => {
    const file = files.find((entry) => entry.id === id);
    if (file?.isFavorite) return;

    try {
      await api.delete(`/files/${id}`);
      setFiles((current) => current.filter((file) => file.id !== id));
      setSelectedIds((current) => current.filter((selectedId) => selectedId !== id));
    } catch {
      // Keep UI stable even if delete fails.
    }
  };

  const handleDeleteFolder = async (id: string) => {
    const folder = folders.find((entry) => entry.id === id);
    if (folder?.isFavorite) return;

    try {
      await api.delete(`/folders/${id}`);
      setFolders((current) => current.filter((folder) => folder.id !== id));
      setReloadKey((value) => value + 1);
    } catch {
      // Keep UI stable even if delete fails.
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((selectedId) => selectedId !== id) : [...current, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedIds((current) => (current.length === files.length ? [] : files.map((file) => file.id)));
  };

  const handleClearSelection = () => {
    setSelectedIds([]);
  };

  const handleCreateFolder = async () => {
    const folderName = window.prompt("Nom du dossier a creer");
    if (!folderName?.trim()) return;

    try {
      await api.post("/folders", {
        name: folderName.trim(),
        parentId: currentFolderId
      });
      setReloadKey((value) => value + 1);
    } catch {
      // Keep UI stable on errors.
    }
  };

  const handleMoveSelected = async () => {
    if (selectedIds.length === 0) return;

    try {
      await Promise.all(
        selectedIds.map((id) =>
          api.patch(`/files/${id}`, {
            folderId: moveTargetFolderId === "root" ? null : moveTargetFolderId
          })
        )
      );
      setSelectedIds([]);
      setReloadKey((value) => value + 1);
    } catch {
      // Keep UI stable on errors.
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return;

    const deletableIds = selectedIds.filter((id) => !files.find((file) => file.id === id)?.isFavorite);
    if (deletableIds.length === 0) return;

    try {
      await Promise.all(deletableIds.map((id) => api.delete(`/files/${id}`)));
      setFiles((current) => current.filter((file) => !deletableIds.includes(file.id)));
      setSelectedIds([]);
    } catch {
      // Keep UI stable on errors.
    }
  };

  const handleToggleFavoriteFile = async (id: string, nextValue: boolean) => {
    try {
      await api.patch(`/files/${id}`, { isFavorite: nextValue });
      setFiles((current) =>
        current.map((file) => (file.id === id ? { ...file, isFavorite: nextValue } : file))
      );
    } catch {
      // Keep UI stable on errors.
    }
  };

  const handleToggleFavoriteFolder = async (id: string, nextValue: boolean) => {
    try {
      await api.patch(`/folders/${id}`, { isFavorite: nextValue });
      setFolders((current) =>
        current.map((folder) => (folder.id === id ? { ...folder, isFavorite: nextValue } : folder))
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="rounded-2xl border border-white/10 bg-card/80 p-4"
          >
            <div className="mb-4 grid gap-3 xl:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <p className="mb-2 text-xs uppercase tracking-wide text-zinc-400">Chemin</p>
                <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-300">
                  <button
                    type="button"
                    className="rounded-lg border border-white/10 px-2 py-1 hover:bg-white/5"
                    onClick={() => setCurrentFolderId(null)}
                  >
                    Racine
                  </button>
                  {breadcrumb.map((folder) => (
                    <button
                      key={folder.id}
                      type="button"
                      className="rounded-lg border border-white/10 px-2 py-1 hover:bg-white/5"
                      onClick={() => setCurrentFolderId(folder.id)}
                    >
                      / {folder.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <p className="mb-2 text-xs uppercase tracking-wide text-zinc-400">Dossiers</p>
                <div className="flex flex-wrap items-center gap-2">
                  <Button size="sm" variant="outline" onClick={handleCreateFolder}>
                    <FolderPlus size={15} />
                    <span className="ml-2">Creer dossier</span>
                  </Button>

                  <select
                    value={moveTargetFolderId}
                    onChange={(event) => setMoveTargetFolderId(event.target.value)}
                    className="h-9 rounded-lg border border-white/10 bg-background px-3 text-sm text-zinc-200"
                  >
                    <option value="root">Racine</option>
                    {folders.map((folder) => (
                      <option key={folder.id} value={folder.id}>
                        {folder.path}
                      </option>
                    ))}
                  </select>

                  <Button size="sm" variant="outline" onClick={handleMoveSelected}>
                    <FolderTree size={15} />
                    <span className="ml-2">Deplacer selection</span>
                  </Button>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <p className="mb-2 text-xs uppercase tracking-wide text-zinc-400">Selection & Tri</p>
                <div className="flex flex-wrap items-center gap-2">
                  <Button size="sm" variant="outline" onClick={handleSelectAll}>
                    <CheckSquare size={15} />
                    <span className="ml-2">{allSelected ? "Tout deselectionner" : "Tout selectionner"}</span>
                  </Button>
                  <Button size="sm" variant="ghost" onClick={handleClearSelection}>
                    <Square size={15} />
                    <span className="ml-2">Clear</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-400/40 bg-red-500/10 text-red-200 hover:bg-red-500/20"
                    onClick={handleDeleteSelected}
                  >
                    <Trash2 size={15} />
                    <span className="ml-2">Poubelle selection</span>
                  </Button>
                </div>
              </div>
            </div>

            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm text-zinc-300">
                {sortedCount} fichiers · {subFolders.length} dossiers · {selectedCount} selectionnes
              </p>
              <div className="flex items-center gap-2">
                <span className="rounded-lg border border-white/10 px-2 py-1 text-xs text-zinc-400">
                  Raccourci: Ctrl/Cmd + A
                </span>
                <ArrowDownUp size={15} className="text-zinc-400" />
                {sorters.map((sort) => (
                  <Button
                    key={sort.key}
                    variant={sortBy === sort.key ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSortBy(sort.key)}
                  >
                    {sort.label}
                  </Button>
                ))}
              </div>
            </div>

            {isGrid ? (
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {subFolders.map((folder) => (
                  <FolderCard
                    key={folder.id}
                    folder={folder}
                    onOpen={setCurrentFolderId}
                    onDelete={handleDeleteFolder}
                    onToggleFavorite={handleToggleFavoriteFolder}
                  />
                ))}
                {files.map((file) => (
                  <FileCard
                    key={file.id}
                    file={file}
                    onDelete={handleDelete}
                    onToggleFavorite={handleToggleFavoriteFile}
                    isSelected={selectedIds.includes(file.id)}
                    onToggleSelect={handleToggleSelect}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {subFolders.map((folder) => (
                  <FolderListRow
                    key={folder.id}
                    folder={folder}
                    onOpen={setCurrentFolderId}
                    onDelete={handleDeleteFolder}
                    onToggleFavorite={handleToggleFavoriteFolder}
                  />
                ))}
                {files.map((file) => (
                  <FileListRow
                    key={file.id}
                    file={file}
                    onDelete={handleDelete}
                    onToggleFavorite={handleToggleFavoriteFile}
                    isSelected={selectedIds.includes(file.id)}
                    onToggleSelect={handleToggleSelect}
                  />
                ))}
              </div>
            )}
          </motion.div>

          <UploadDropzone onUploadSuccess={() => setReloadKey((value) => value + 1)} />
        </section>
      </div>
    </main>
  );
};
