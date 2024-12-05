export function isActive(path: string, pathname: string) {
  if (!path || !pathname) return false;

  // Root path uchun alohida tekshiruv
  if (path === "/") return pathname === "/";

  // Barcha path va pathname boshidagi va oxiridagi '/' belgilardan tozalash
  const cleanPath = path.replace(/^\/|\/$/g, "");
  const cleanPathname = pathname.replace(/^\/|\/$/g, "");

  // Pathname ning boshlanishini path bilan taqqoslash
  return cleanPathname.startsWith(cleanPath);
}
