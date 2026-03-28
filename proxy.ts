import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['pt', 'en']
const defaultLocale = 'pt'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if path already starts with a valid locale
  const pathnameLocale = locales.find(
    locale => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  )

  if (!pathnameLocale) {
    // Redirect to default locale
    const url = request.nextUrl.clone()
    url.pathname = `/${defaultLocale}${pathname}`
    return NextResponse.redirect(url)
  }

  // Pass locale via header so root layout can set lang attr
  const response = NextResponse.next()
  response.headers.set('x-locale', pathnameLocale)
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images|api).*)'],
}
