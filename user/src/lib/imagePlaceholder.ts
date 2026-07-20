// Base64 blur-up placeholder for remote (Cloudinary) images. Next only
// auto-generates blurDataURL for statically-imported local images —
// every real image here is a remote URL, so there's nothing to derive
// one from. This is a static rectangle in the real warm-beige design
// token rather than Next's generic gray, applied to the
// highest-repetition images (product/category cards, PDP gallery,
// category banner) — not every thumbnail, to keep the change
// proportionate to its actual perceptible benefit.
const shimmer = `<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="400" fill="#E8DCC8" /></svg>`;

const toBase64 = (str: string) =>
  typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str);

export const SHIMMER_DATA_URL = `data:image/svg+xml;base64,${toBase64(shimmer)}`;
