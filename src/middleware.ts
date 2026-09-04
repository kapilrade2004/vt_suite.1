import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes (except /admin/login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const adminToken = request.cookies.get('admin_token')?.value;

    // Note: Client-side AdminAuthContext also verifies sessionStorage/localStorage.
    // If no cookie is present, redirect unauthenticated request away from bundle.
    if (!adminToken) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/(protected)/:path*', '/admin/dashboard', '/admin/companies', '/admin/invoices', '/admin/tickets', '/admin/audit-logs']
};
