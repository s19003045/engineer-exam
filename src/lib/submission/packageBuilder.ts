import { zipSync, strToU8 } from "fflate";
import type { SubmissionArtifact } from "../../types/domain";

export function checksum(content: Uint8Array): string {
  let hash = 0;
  for (let i = 0; i < content.length; i += 1) {
    hash = (hash * 31 + content[i]) >>> 0;
  }
  return hash.toString(16).padStart(8, "0");
}

export function buildChecksums(files: Record<string, Uint8Array>): string {
  return Object.entries(files)
    .map(([name, bytes]) => `${checksum(bytes)}  ${name}`)
    .join("\n");
}

export function buildSubmissionPackage(files: Record<string, Uint8Array>, filename: string): SubmissionArtifact {
  const withChecksums = {
    ...files,
    "checksums.txt": strToU8(buildChecksums(files)),
  };
  const zipBytes = zipSync(withChecksums, { level: 6 });
  return {
    filename,
    files: {
      ...withChecksums,
      [filename]: zipBytes,
    },
  };
}

export function downloadBytes(filename: string, bytes: Uint8Array, mime = "application/octet-stream"): void {
  const blob = new Blob([bytes], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
