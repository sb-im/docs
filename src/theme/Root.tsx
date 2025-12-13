import React, {useEffect} from 'react';
import {useLocation} from '@docusaurus/router';

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function removeHighlights(root: Element) {
  const highlights = root.querySelectorAll<HTMLElement>('.search-text-highlight');
  highlights.forEach((highlight) => {
    const parent = highlight.parentNode;
    if (!parent) return;
    parent.replaceChild(
      document.createTextNode(highlight.textContent ?? ''),
      highlight,
    );
    parent.normalize();
  });
}

function shouldIgnoreTextNode(textNode: Text): boolean {
  const parent = textNode.parentElement;
  if (!parent) return true;

  if (parent.closest('.search-text-highlight')) return true;
  if (parent.closest('pre, code, kbd, samp')) return true;
  if (parent.closest('button, input, textarea, select')) return true;

  return false;
}

function getScrollBehavior(): ScrollBehavior {
  if (typeof window === 'undefined') return 'auto';
  return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    ? 'auto'
    : 'smooth';
}

function highlightTextNode(
  textNode: Text,
  matches: {index: number; text: string}[],
) {
  const parent = textNode.parentNode;
  if (!parent) return;

  const fullText = textNode.textContent ?? '';
  const fragment = document.createDocumentFragment();

  let lastIndex = 0;
  matches.forEach(({index, text}) => {
    if (index > lastIndex) {
      fragment.appendChild(
        document.createTextNode(fullText.slice(lastIndex, index)),
      );
    }

    const mark = document.createElement('mark');
    mark.className = 'search-text-highlight';
    mark.textContent = text;
    fragment.appendChild(mark);

    lastIndex = index + text.length;
  });

  if (lastIndex < fullText.length) {
    fragment.appendChild(document.createTextNode(fullText.slice(lastIndex)));
  }

  parent.replaceChild(fragment, textNode);
}

function pickScrollTarget(root: Element): HTMLElement | null {
  const highlights = Array.from(
    root.querySelectorAll<HTMLElement>('.search-text-highlight'),
  );
  if (highlights.length === 0) return null;

  // Docusaurus 文档的标题通常位于 <article><header> 中；尽量跳过标题命中，滚到正文里更直观
  const withoutHeader = highlights.find((el) => !el.closest('header'));
  return withoutHeader ?? highlights[0];
}

function ensureDetailsOpen(target: HTMLElement) {
  const details = target.closest('details');
  if (!details) return;
  details.open = true;
}

function highlightAndScroll(root: Element, keyword: string): boolean {
  const normalized = keyword.trim();
  if (!normalized) return false;

  const regex = new RegExp(escapeRegExp(normalized), 'gi');

  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node) => {
        const textNode = node as Text;
        if (shouldIgnoreTextNode(textNode)) return NodeFilter.FILTER_REJECT;
        const content = textNode.textContent ?? '';
        if (!content) return NodeFilter.FILTER_REJECT;
        if (!content.toLowerCase().includes(normalized.toLowerCase())) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    },
  );

  const nodesToHighlight: {node: Text; matches: {index: number; text: string}[]}[] =
    [];

  let found = false;
  let currentNode: Node | null;
  while ((currentNode = walker.nextNode())) {
    const textNode = currentNode as Text;
    const content = textNode.textContent ?? '';
    const matches: {index: number; text: string}[] = [];

    regex.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(content)) !== null) {
      found = true;
      matches.push({index: match.index, text: match[0]});
      if (match[0].length === 0) break;
    }

    if (matches.length > 0) {
      nodesToHighlight.push({node: textNode, matches});
    }
  }

  nodesToHighlight.forEach(({node, matches}) => {
    highlightTextNode(node, matches);
  });

  if (!found) return false;

  const targetHighlight = pickScrollTarget(root);
  if (!targetHighlight) return false;

  ensureDetailsOpen(targetHighlight);

  // 等待浏览器完成一次布局/绘制后再滚动，更稳定
  window.requestAnimationFrame(() => {
    targetHighlight.scrollIntoView({
      behavior: getScrollBehavior(),
      block: 'center',
    });
    targetHighlight.classList.add('search-text-highlight-pulse');
    window.setTimeout(() => {
      targetHighlight.classList.remove('search-text-highlight-pulse');
    }, 1800);
  });

  return true;
}

export default function Root({children}: {children: React.ReactNode}) {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const highlight = params.get('highlight') ?? '';

    let cancelled = false;
    let attempts = 0;
    const maxAttempts = 18;

    const run = () => {
      if (cancelled) return;

      const article = document.querySelector('article');
      if (!article) {
        attempts += 1;
        if (attempts <= maxAttempts) {
          window.setTimeout(run, 120);
        }
        return;
      }

      removeHighlights(article);

      if (!highlight) return;
      const ok = highlightAndScroll(article, highlight);
      if (!ok) {
        attempts += 1;
        if (attempts <= maxAttempts) {
          window.setTimeout(run, 120);
        }
      }
    };

    // 让 Docusaurus 完成一次导航滚动后再开始（并对懒渲染做重试）
    const timer = window.setTimeout(run, 250);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [location.pathname, location.search]);

  return <>{children}</>;
}
