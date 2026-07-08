const baseUrl = import.meta.env.BASE_URL;
const originUrl = import.meta.env.SITE ?? "https://akamarchitects.com";

export function withBase(path = "/") {
  if (/^(?:[a-z][a-z\d+\-.]*:|#)/i.test(path)) {
    return path;
  }

  const base = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  if (cleanPath === "/") {
    return baseUrl;
  }

  if (base && cleanPath.startsWith(`${base}/`)) {
    return cleanPath;
  }

  return `${base}${cleanPath}`;
}

export function absoluteUrl(path = "/") {
  return new URL(withBase(path), originUrl).toString();
}
