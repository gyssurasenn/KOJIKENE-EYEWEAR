import Image from 'next/image';
import Link from 'next/link';
import { Fragment, type ReactNode } from 'react';
import { localePath, type Locale } from '@/i18n/config';
import { slugify } from '@/lib/utils';
import type { ArticleBlock } from '@/types';

const INLINE_LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

/**
 * Renders inline links written as [label](/path) in the article body.
 * Internal paths are unprefixed in the source and get the locale added
 * here, so the same body works in both languages. External links open
 * in a new tab.
 */
function inline(text: string, locale: Locale): ReactNode {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  INLINE_LINK.lastIndex = 0;
  while ((match = INLINE_LINK.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const [, label, href] = match;
    const isInternal = href.startsWith('/');

    nodes.push(
      isInternal ? (
        <Link
          key={`${href}-${match.index}`}
          href={localePath(locale, href)}
          className="underline decoration-ink/30 underline-offset-4 transition-colors duration-300 hover:decoration-ink"
        >
          {label}
        </Link>
      ) : (
        <a
          key={`${href}-${match.index}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-ink/30 underline-offset-4 transition-colors duration-300 hover:decoration-ink"
        >
          {label}
        </a>
      ),
    );

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes.map((node, index) => <Fragment key={index}>{node}</Fragment>);
}

/** H2 headings, for the in-page contents list. */
export function extractHeadings(body: ArticleBlock[]) {
  return body
    .filter((block): block is Extract<ArticleBlock, { type: 'heading' }> => block.type === 'heading')
    .filter((block) => (block.level ?? 2) === 2)
    .map((block) => ({ id: slugify(block.text), text: block.text }));
}

export function RichText({ blocks, locale }: { blocks: ArticleBlock[]; locale: Locale }) {
  return (
    <div className="max-w-prose2">
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'heading': {
            const level = block.level ?? 2;
            const id = slugify(block.text);
            return level === 2 ? (
              <h2
                key={index}
                id={id}
                className="mt-16 font-display text-display-sm font-light text-balance first:mt-0"
              >
                {block.text}
              </h2>
            ) : (
              <h3 key={index} id={id} className="mt-10 font-display text-xl font-normal">
                {block.text}
              </h3>
            );
          }

          case 'paragraph':
            return (
              <p key={index} className="mt-6 text-[1.0625rem] leading-[1.8] text-charcoal text-pretty">
                {inline(block.text, locale)}
              </p>
            );

          case 'list': {
            const items = block.items.map((item, itemIndex) => (
              <li key={itemIndex} className="pl-1 leading-[1.8] text-charcoal marker:text-mist">
                {inline(item, locale)}
              </li>
            ));
            return block.ordered ? (
              <ol key={index} className="mt-6 list-decimal space-y-3 pl-5 text-[1.0625rem]">
                {items}
              </ol>
            ) : (
              <ul key={index} className="mt-6 list-disc space-y-3 pl-5 text-[1.0625rem]">
                {items}
              </ul>
            );
          }

          case 'callout':
            return (
              <aside key={index} className="mt-10 border-l-2 border-ink/25 bg-bone/70 px-6 py-6">
                {block.title ? <p className="eyebrow mb-3">{block.title}</p> : null}
                <p className="text-[1.0625rem] leading-[1.75] text-charcoal text-pretty">
                  {inline(block.text, locale)}
                </p>
              </aside>
            );

          case 'quote':
            return (
              <blockquote key={index} className="mt-12 border-t border-ink/15 pt-8">
                <p className="font-display text-2xl font-light leading-snug text-balance md:text-3xl">
                  “{block.text}”
                </p>
              </blockquote>
            );

          case 'image':
            return (
              <figure key={index} className="mt-12">
                <div className="relative aspect-[3/2] w-full overflow-hidden bg-sand">
                  <Image
                    src={block.image.src}
                    alt={block.image.alt}
                    fill
                    sizes="(min-width: 768px) 68ch, 100vw"
                    className="object-cover"
                  />
                </div>
                {block.caption ? (
                  <figcaption className="mt-3 text-[0.8125rem] text-stone">{block.caption}</figcaption>
                ) : null}
              </figure>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
