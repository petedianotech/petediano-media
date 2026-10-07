"use client";

import { useState, useRef } from "react";

export default function Home() {
  const [previews, setPreviews] = useState<{ id: string; url: string; name: string }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const newItems = Array.from(files).map((file) => ({
      id: Math.random().toString(36).slice(2),
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setPreviews((prev) => [...newItems, ...prev]);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    alert("URL copied! (This is a local preview URL for now)");
  };

  return (
    <main style={{ maxWidth: 480, margin: "0 auto", padding: "24px 16px 80px" }}>
      <header style={{ textAlign: "center", marginBottom: 32 }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 20,
            background: "linear-gradient(135deg, #7c5cfc 0%, #00d4aa 100%)",
            margin: "0 auto 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            boxShadow: "0 8px 32px rgba(124, 92, 252, 0.35)",
          }}
        >
          📷
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.5, color: "#f0f0f5" }}>
          Petediano Media
        </h1>
        <p style={{ color: "#8888a0", fontSize: 14, marginTop: 6 }}>
          Simple image host for your social posts
        </p>
      </header>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        style={{
          border: "2px dashed rgba(124, 92, 252, 0.4)",
          borderRadius: 20,
          padding: "40px 20px",
          textAlign: "center",
          background: "linear-gradient(135deg, rgba(124, 92, 252, 0.15) 0%, rgba(0, 212, 170, 0.1) 100%)",
          cursor: "pointer",
          marginBottom: 28,
        }}
      >
        <div style={{ fontSize: 40, marginBottom: 12 }}>⬆️</div>
        <p style={{ fontWeight: 600, marginBottom: 4, color: "#f0f0f5" }}>Tap or drop images here</p>
        <p style={{ color: "#8888a0", fontSize: 13 }}>
          PNG, JPG, WebP • Ready for storage connection
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      <div
        style={{
          background: "#141422",
          borderRadius: 16,
          padding: 16,
          marginBottom: 24,
          border: "1px solid rgba(124, 92, 252, 0.15)",
        }}
      >
        <p style={{ fontSize: 13, color: "#8888a0", lineHeight: 1.5 }}>
          <strong style={{ color: "#00d4aa" }}>Status:</strong> UI is ready.
          Next step is connecting a storage (Vercel Blob, Cloudinary or Supabase).
          After that, every upload will give a permanent public URL for Buffer.
        </p>
      </div>

      {previews.length > 0 && (
        <section>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, color: "#f0f0f5" }}>
            Preview ({previews.length})
          </h2>
          <div style={{ display: "grid", gap: 12 }}>
            {previews.map((item) => (
              <div
                key={item.id}
                style={{
                  background: "#141422",
                  borderRadius: 16,
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <img
                  src={item.url}
                  alt={item.name}
                  style={{ width: "100%", height: 180, objectFit: "cover", display: "block" }}
                />
                <div style={{ padding: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 13, color: "#8888a0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 180 }}>
                    {item.name}
                  </span>
                  <button
                    onClick={() => copyUrl(item.url)}
                    style={{
                      background: "linear-gradient(135deg, #7c5cfc 0%, #00d4aa 100%)",
                      border: "none",
                      color: "#fff",
                      padding: "6px 12px",
                      borderRadius: 8,
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Copy URL
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <nav
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "rgba(10, 10, 18, 0.92)",
          backdropFilter: "blur(12px)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "12px 16px calc(12px + env(safe-area-inset-bottom))",
          display: "flex",
          justifyContent: "center",
          gap: 40,
        }}
      >
        <button style={{ background: "none", border: "none", color: "#7c5cfc", fontSize: 13, fontWeight: 600 }}>
          Gallery
        </button>
        <button style={{ background: "none", border: "none", color: "#8888a0", fontSize: 13 }}>
          Settings
        </button>
      </nav>
    </main>
  );
}
