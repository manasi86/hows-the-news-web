import type { NextConfig } from "next";

const API_BASE = (
  process.env.API_BASE_URL ?? "http://127.0.0.1:8000"
).replace(/\/+$/, "");

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      { source: "/summarize", destination: `${API_BASE}/summarize` },
      { source: "/analyse", destination: `${API_BASE}/analyse` },
    ];
  },
};

export default nextConfig;
