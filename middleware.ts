import {clerkMiddleware, createRouteMatcher} from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/events",
  "/events/:id",
  "/api/webhook/clerk",
  "/api/webhook/stripe",
  "/api/uploadthing",
]);

export default clerkMiddleware((auth, req) => {
  if (isPublicRoute(req)) return; // if it's a public route, do nothing
  auth().protect(); // for any other route, require auth
});

// ignoredRoutes: [
//   "/api/webhook/clerk",
//   "/api/webhook/stripe",
//   "/api/uploadthing",

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
