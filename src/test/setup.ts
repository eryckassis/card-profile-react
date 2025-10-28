import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

/**
 * Limpa o DOM após cada teste
 * Analogia: É como limpar a mesa antes de preparar o próximo prato
 */
afterEach(() => {
  cleanup();
});

/**
 * Mock do IntersectionObserver
 * Por quê? jsdom não implementa APIs do navegador que não são DOM puro
 * Usado para: lazy loading, scroll animations, etc.
 */
globalThis.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  disconnect: vi.fn(),
  unobserve: vi.fn(),
  root: null,
  rootMargin: '',
  thresholds: [],
  takeRecords: vi.fn().mockReturnValue([]),
}));

/**
 * Mock do matchMedia
 * Por quê? Usado para media queries (responsive design, dark mode)
 * Exemplo: window.matchMedia('(prefers-color-scheme: dark)')
 */
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated mas ainda pode ser usado
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

/**
 * Mock do ResizeObserver (se necessário no futuro)
 * Descomente se seus componentes usarem resize detection
 */
// globalThis.ResizeObserver = vi.fn().mockImplementation(() => ({
//   observe: vi.fn(),
//   unobserve: vi.fn(),
//   disconnect: vi.fn(),
// }));
