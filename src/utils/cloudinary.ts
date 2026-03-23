// utils/cloudinary.ts
export function cldUrl(publicId: string, opts: {
  w?: number; h?: number; fit?: 'fill'|'fill_pad'|'fit'|'crop';
  q?: string; f?: string; dpr?: string;
  cloudName?: string; folder?: string;
} = {}) {
  const {
    w, h, fit = 'fill',
    q = 'auto:eco',
    f = 'auto',
    dpr = 'auto',
    cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME!,
    folder,
  } = opts;

  const base = `https://res.cloudinary.com/${cloudName}/image/upload/`;
  const tx = [
    `f_${f}`, `q_${q}`, `dpr_${dpr}`,
    w ? `w_${w}` : null,
    h ? `h_${h}` : null,
    fit ? `c_${fit},g_auto` : null,
  ].filter(Boolean).join(',');

  const pid = folder ? `${folder}/${publicId}` : publicId;

  return `${base}${tx}/${pid}`;
}
