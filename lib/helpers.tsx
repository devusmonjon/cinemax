export function isActive(pathname: string, path: string) {
  if (!path || !pathname) return false;

  // Root path uchun alohida tekshiruv
  if (path === "/") return pathname === "/";

  // Barcha path va pathname boshidagi va oxiridagi '/' belgilardan tozalash
  const cleanPath = path.replace(/^\/|\/$/g, "");
  const cleanPathname = pathname.replace(/^\/|\/$/g, "");

  // Pathname ning boshlanishini path bilan yoki pathning o'zini taqqoslash
  return (
    cleanPathname === cleanPath || cleanPathname.startsWith(`${cleanPath}/`)
  );
}
