import { Directory, Filesystem } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

import { isNative } from './runtime';

export interface ShareTextPayload {
  title?: string;
  text?: string;
  url?: string;
}

export interface ShareImagePayload {
  filename: string;
  blob: Blob;
  title?: string;
  text?: string;
}

export async function shareText(payload: ShareTextPayload): Promise<void> {
  if (isNative()) {
    await Share.share(payload);
    return;
  }
  if (typeof navigator !== 'undefined' && navigator.share) {
    await navigator.share(payload);
    return;
  }
  throw new Error('Share API not available');
}

export async function shareImage(payload: ShareImagePayload): Promise<void> {
  if (isNative()) {
    const base64 = await blobToBase64(payload.blob);
    const writeResult = await Filesystem.writeFile({
      path: payload.filename,
      data: base64,
      directory: Directory.Cache,
    });
    await Share.share({
      title: payload.title,
      text: payload.text,
      files: [writeResult.uri],
    });
    return;
  }
  if (typeof navigator !== 'undefined' && navigator.canShare) {
    const file = new File([payload.blob], payload.filename, {
      type: payload.blob.type,
    });
    if (navigator.canShare({ files: [file] })) {
      await navigator.share({
        title: payload.title,
        text: payload.text,
        files: [file],
      });
      return;
    }
  }
  throw new Error('Image share not supported on this platform');
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const comma = result.indexOf(',');
      resolve(comma === -1 ? result : result.slice(comma + 1));
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}
