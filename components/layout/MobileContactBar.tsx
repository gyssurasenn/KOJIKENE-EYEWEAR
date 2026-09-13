'use client';

import { useEffect, useState } from 'react';
import { MapPin, MessageCircle, Phone } from 'lucide-react';
import { useT } from '@/i18n/client';
import { address, contact } from '@/lib/site';

export function MobileContactBar({ menuOpen }: { menuOpen: boolean }) {
  const t = useT();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 280);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  const visible = scrolled && !menuOpen;
  return (
    <nav className="mobile-contact-bar" aria-label={t('common.mobileContact.label')}
      data-visible={visible || undefined} aria-hidden={!visible} inert={!visible ? true : undefined}>
      <a href={contact.lineUrl} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} aria-hidden="true" />{t('common.cta.line')}</a>
      <a href={`tel:${contact.phoneHref}`}><Phone size={18} aria-hidden="true" />{t('common.cta.call')}</a>
      <a href={address.mapsDirectionsUrl} target="_blank" rel="noopener noreferrer"><MapPin size={18} aria-hidden="true" />{t('common.mobileContact.map')}</a>
    </nav>
  );
}
