import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), ".questify", "data");

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function filePath(id: string): string {
  return path.join(DATA_DIR, `${id}.json`);
}

export function saveDoc(id: string, data: unknown): void {
  ensureDir();
  fs.writeFileSync(filePath(id), JSON.stringify(data, null, 2), "utf-8");
}

export function getDoc<T>(id: string): T | null {
  const fp = filePath(id);
  if (!fs.existsSync(fp)) return null;
  return JSON.parse(fs.readFileSync(fp, "utf-8")) as T;
}

export function getAllDocs<T>(): Array<{ id: string; data: T }> {
  ensureDir();
  const files = fs.readdirSync(DATA_DIR).filter((f) => f.endsWith(".json"));
  return files.map((f) => {
    const id = f.replace(/\.json$/, "");
    return { id, data: JSON.parse(fs.readFileSync(path.join(DATA_DIR, f), "utf-8")) as T };
  });
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
