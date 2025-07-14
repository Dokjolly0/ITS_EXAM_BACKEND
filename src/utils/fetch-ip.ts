import { Request } from "express";

export async function getIP(): Promise<string | undefined> {
  return fetch("https://api.ipify.org?format=json")
    .then((response) => response.json())
    .then((data) => {
      return data.ip;
    })
    .catch((error) => {
      console.error("Error fetching IP address:", error);
      return undefined;
    });
}

export function getClientIP(req: Request): string | undefined {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") {
    return forwarded.split(",")[0];
  }
  return req.socket.remoteAddress;
}
