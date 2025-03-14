import { appRoute, protectedRoutes, unProtectedRoutes } from "./utils";
import { NextResponse, type NextRequest } from "next/server";
import { hasCookie } from "cookies-next";

// export const config = {
//   matcher: appRoute,
// };
export function middleware(req: NextRequest): NextResponse {
  const token = hasCookie("token", {
    req,
  });
  //   const url = req.nextUrl.pathname;
  //   if (protectedRoutes.includes(url) && !token) {
  //     return NextResponse.redirect(new URL(appRoute.default, req.url));
  //   }
  //   if (unProtectedRoutes.includes(url) && token) {
  //     return NextResponse.redirect(new URL(appRoute.dashboard, req.url));
  //   }
  return NextResponse.next();
}
