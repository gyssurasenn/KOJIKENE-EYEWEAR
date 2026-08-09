import { NextResponse, type NextRequest } from 'next/server';
import { LOCALE_COOKIE, defaultLocale, isLocale, locales } from '@/i18n/config';

/**
 * Locale routing.
 *
 *   /eyewear     → rewritten to /th/eyewear   (Thai, the default, stays clean)
 *   /en/eyewear  → served as-is               (English)
 *   /th/eyewear  → redirected to /eyewear     (one canonical URL per page)
 *
 * A visitor is only ever redirected to another language when they have
 * explicitly chosen one (the switcher sets NEXT_LOCALE). Accept-Language
 * is deliberately not used to redirect: it would bounce crawlers around
 * and split indexing between the two languages.
 */
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const segment = pathname.split('/')[1];

  // Collapse an explicit /th prefix onto the clean Thai URL.
  if (segment === defaultLocale) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || '/';
    return NextResponse.redirect(url, 308);
  }

  // Already an English URL — nothing to do.
  if (isLocale(segment)) {
    return NextResponse.next();
  }

  // Unprefixed URL. Honour a remembered choice, otherwise serve Thai.
  const remembered = request.cookies.get(LOCALE_COOKIE)?.value;
  if (remembered && isLocale(remembered) && remembered !== defaultLocale) {
    const url = request.nextUrl.clone();
    url.pathname = `/${remembered}${pathname === '/' ? '' : pathname}`;
    return NextResponse.redirect(url);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`;
  url.search = search;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, metadata routes and anything with a file extension.
  matcher: ['/((?!_next/|api/|images/|favicon|robots\\.txt|sitemap\\.xml|.*\\..*).*)'],
};

export { locales };
