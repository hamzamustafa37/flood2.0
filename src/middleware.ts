import { NextResponse, type NextRequest } from "next/server";
import {
  appRoute,
  protectedRoutes,
  unProtectedRoutes,
} from "./utils/constants";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.pathname;

  const isProtected = protectedRoutes.includes(url);
  const isUnprotected = unProtectedRoutes.includes(url);

  if (isProtected && !token) {
    return NextResponse.redirect(new URL(appRoute.default, req.url));
  }

  if (isUnprotected && token) {
    return NextResponse.redirect(
      new URL(appRoute.contractorDashboard, req.url)
    );
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    "/",
    "/book",
    "/contractor-dashboard",
    "/contractor-settings",
    "/signup",
  ],
};
