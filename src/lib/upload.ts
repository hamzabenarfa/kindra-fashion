import { put } from "@vercel/blob";
import { uploadFileToBucket, getFileUrl } from "./files";
import { env } from "@/env";

export type StorageProvider = "r2" | "vercel-blob";

export async function uploadImage(
  file: File,
  options: {
    provider: StorageProvider;
    folder?: string;
    name?: string;
  }
): Promise<{ imageId: string; imageUrl: string; provider: StorageProvider }> {
  const filename = options.name || file.name;
  const key = options.folder ? `${options.folder}/${filename}` : filename;

  if (options.provider === "vercel-blob") {
    if (!env.BLOB_READ_WRITE_TOKEN) {
      throw new Error("BLOB_READ_WRITE_TOKEN is not configured");
    }
    
    const { url } = await put(key, file, {
      access: "public",
      token: env.BLOB_READ_WRITE_TOKEN,
    });
    
    // For Blob, the URL is the ID effectively, or we can parse it
    return { 
      imageId: url, 
      imageUrl: url,
      provider: "vercel-blob"
    };
  } else {
    // R2
    await uploadFileToBucket(file, key);
    const url = await getFileUrl({ key });
    
    return {
      imageId: key,
      imageUrl: url,
      provider: "r2"
    };
  }
}
