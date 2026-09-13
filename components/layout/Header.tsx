'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { MobileContactBar } from '@/components/layout/MobileContactBar';
import { LogoLink } from '@/components/brand/Logo';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { useT } from '@/i18n/client';
import { localePath, stripLocale, type Locale } from '@/i18n/config';
import { contact, mainNav } from '@/lib/site';
import type { NavLink } from '@/types';

function isActive(pathname: string, href: string): boolean {
  const base = stripLocale(pathname);
  if (href === '/') return base === '/';
  return base === href || base.startsWith(`${href}/`);
}

export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? '/';
  const t = useT();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuToggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the panel whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll and support Escape while the panel is open.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const panel = document.getElementById('mobile-menu');
    const background = Array.from(document.querySelectorAll<HTMLElement>('main, body > footer, main ~ footer'));
    const previousInert = background.map(node => node.inert);
    background.forEach(node => { node.inert = true; });
    const focusFrame = requestAnimationFrame(() => panel?.querySelector<HTMLElement>('a[href]')?.focus());
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
      if (event.key === 'Tab') {
        const targets = [menuToggle.current, ...Array.from(panel?.querySelectorAll<HTMLElement>('a[href], button') ?? [])].filter((node): node is HTMLElement => Boolean(node));
        const index = targets.indexOf(document.activeElement as HTMLElement);
        if (event.shiftKey && index <= 0) { event.preventDefault(); targets.at(-1)?.focus(); }
        else if (!event.shiftKey && (index === targets.length - 1 || index < 0)) { event.preventDefault(); targets[0]?.focus(); }
      }
    };
    const onResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(focusFrame);
      background.forEach((node, index) => { node.inert = previousInert[index]; });
      if (panel?.contains(document.activeElement)) menuToggle.current?.focus();
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [menuOpen]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-3 focus:text-[0.6875rem] focus:uppercase focus:tracking-widest2 focus:text-paper"
      >
        {t('common.header.skip')}
      </a>

      {/* Utility bar — local trust signals, hidden on small screens. */}
      <div className="hidden border-b border-ink/10 bg-white md:block">
        <div className="shell flex h-9 items-center justify-between text-[0.6875rem] uppercase tracking-widest2 text-stone">
          <p>{t('common.header.tagline')}</p>
          <div className="flex items-center gap-6">
            <a href={`tel:${contact.phoneHref}`} className="link-underline transition-colors hover:text-ink">
              {contact.phone}
            </a>
            <a
              href={contact.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline transition-colors hover:text-ink"
            >
              LINE {contact.line}
            </a>
            <LanguageSwitcher current={locale} label={t('common.language.label')} />
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 bg-white transition-[border-color] duration-500 ease-editorial ${
          scrolled || menuOpen
            ? 'border-b border-ink/10'
            : 'border-b border-transparent'
        }`}
      >
        <div className="shell flex h-[var(--header-height)] items-center justify-between gap-6">
          <LogoLink locale={locale} onNavigate={() => setMenuOpen(false)} />

          <nav aria-label={t('common.header.mainNav')} className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {mainNav.map((item) => (
                <DesktopNavItem key={item.href} item={item} pathname={pathname} locale={locale} />
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={localePath(locale, '/contact')}
              className="hidden min-h-[2.5rem] items-center bg-brand px-5 text-[0.6875rem] font-medium uppercase tracking-widest2 text-ink transition-colors duration-500 ease-editorial hover:bg-brand-hover lg:inline-flex"
            >
              {t('common.cta.visitStore')}
            </Link>

            <LanguageSwitcher current={locale} label={t('common.language.label')} className="md:hidden" />

            <button
              ref={menuToggle}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="-mr-2 inline-flex h-11 w-11 items-center justify-center lg:hidden"
            >
              <span className="sr-only">
                {menuOpen ? t('common.header.closeMenu') : t('common.header.openMenu')}
              </span>
              <span aria-hidden="true" className="relative block h-3 w-6">
                <span
                  className={`absolute left-0 block h-px w-6 bg-ink transition-transform duration-300 ease-editorial ${
                    menuOpen ? 'top-1.5 rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-6 bg-ink transition-transform duration-300 ease-editorial ${
                    menuOpen ? 'top-1.5 -rotate-45' : 'top-3'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        pathname={pathname}
        locale={locale}
        onClose={() => setMenuOpen(false)}
      />
      <MobileContactBar menuOpen={menuOpen} />
    </>
  );
}

function DesktopNavItem({
  item,
  pathname,
  locale,
}: {
  item: NavLink;
  pathname: string;
  locale: Locale;
}) {
  const t = useT();
  const active = isActive(pathname, item.href);

  const linkClass = `link-underline text-[0.6875rem] font-medium uppercase tracking-widest2 transition-colors duration-300 ${
    active ? 'text-ink' : 'text-stone hover:text-ink'
  }`;

  if (!item.children) {
    return (
      <li>
        <Link
          href={localePath(locale, item.href)}
          className={linkClass}
          aria-current={active ? 'page' : undefined}
        >
          {t(`common.nav.${item.key}`)}
        </Link>
      </li>
    );
  }

  return (
    <li className="group relative">
      <Link
        href={localePath(locale, item.href)}
        className={linkClass}
        aria-current={active ? 'page' : undefined}
      >
        {t(`common.nav.${item.key}`)}
      </Link>
      <div className="invisible absolute left-1/2 top-full z-10 -translate-x-1/2 pt-5 opacity-0 transition-[opacity,visibility] duration-300 ease-editorial group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <ul className="min-w-[15rem] border border-ink/10 bg-white p-2 shadow-[0_18px_50px_-30px_rgba(22,20,15,0.5)]">
          {item.children.map((child) => (
            <li key={child.href}>
              <Link
                href={localePath(locale, child.href)}
                className="block px-4 py-3 text-sm text-graphite transition-colors duration-300 hover:bg-bone hover:text-ink"
              >
                {t(`common.nav.${child.key}`)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

function MobileMenu({
  open,
  pathname,
  locale,
  onClose,
}: {
  open: boolean;
  pathname: string;
  locale: Locale;
  onClose: () => void;
}) {
  const t = useT();

  return (
    // The `hidden` attribute alone is not enough: Tailwind's `flex`
    // utility would override the user-agent `[hidden] { display: none }`
    // and leave the panel permanently open. The class decides visibility.
    <div
      id="mobile-menu"
      hidden={!open}
      className={`fixed inset-x-0 bottom-0 top-[var(--header-height)] z-40 flex-col overflow-y-auto bg-white lg:hidden ${
        open ? 'flex' : 'hidden'
      }`}
    >
      <nav aria-label={t('common.header.mobileNav')} className="shell flex-1 pb-10 pt-8">
        <ul className="divide-y divide-ink/10 border-y border-ink/10">
          {mainNav.map((item) => (
            <li key={item.href} className="py-1">
              <Link
                href={localePath(locale, item.href)}
                onClick={onClose}
                className={`flex items-center justify-between py-4 font-display text-2xl font-light ${
                  isActive(pathname, item.href) ? 'text-ink' : 'text-charcoal'
                }`}
              >
                {t(`common.nav.${item.key}`)}
                <span aria-hidden="true" className="text-sm text-mist">
                  →
                </span>
              </Link>
              {item.children ? (
                <ul className="mb-3 space-y-2 pl-1">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={localePath(locale, child.href)}
                        onClick={onClose}
                        className="block py-1.5 text-sm text-stone"
                      >
                        {t(`common.nav.${child.key}`)}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>

        <div className="mt-10 space-y-4">
          <Link
            href={localePath(locale, '/contact')}
            onClick={onClose}
            className="flex min-h-[3.25rem] w-full items-center justify-center bg-brand px-8 text-[0.6875rem] font-medium uppercase tracking-widest2 text-ink hover:bg-brand-hover"
          >
            {t('common.cta.visitStore')}
          </Link>
          <div className="grid grid-cols-2 gap-4">
            <a
              href={`tel:${contact.phoneHref}`}
              className="flex min-h-[3.25rem] items-center justify-center border border-ink/20 px-4 text-[0.6875rem] font-medium uppercase tracking-widest2 text-ink"
            >
              {t('common.cta.call')}
            </a>
            <a
              href={contact.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[3.25rem] items-center justify-center border border-ink/20 px-4 text-[0.6875rem] font-medium uppercase tracking-widest2 text-ink"
            >
              {t('common.cta.line')}
            </a>
          </div>
          <p className="pt-2 text-[0.6875rem] uppercase tracking-widest2 text-stone">
            {t('common.header.mobileFooter', { phone: contact.phone })}
          </p>
        </div>
      </nav>
    </div>
  );
}
