import { IncomingMessage } from "http";
import { parse, serialize } from "cookie";

export function parseCookies(
  req?: IncomingMessage
): Record<string, string | undefined> {
  return parse(
    req?.headers.cookie ||
      (typeof document !== "undefined" ? document.cookie : "")
  );
}

interface CookieOptions {
  path?: string;
  maxAge?: number;
  expires?: Date;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
}

export function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {}
): void | string {
  const opts = { path: "/", ...options };
  if (typeof window === "undefined") {
    const serializedCookie = serialize(name, value, opts);
    return serializedCookie;
  } else {
    document.cookie = serialize(name, value, opts);
  }
}

export function removeCookie(name: string): void {
  setCookie(name, "", { maxAge: -1 });
}
