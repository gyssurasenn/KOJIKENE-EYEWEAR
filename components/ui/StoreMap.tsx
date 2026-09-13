import { address } from '@/lib/site';

export function StoreMap({ title, className }: { title: string; className?: string }) {
  return (
    <iframe
      src={address.mapsEmbedUrl}
      title={title}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className={className}
    />
  );
}
