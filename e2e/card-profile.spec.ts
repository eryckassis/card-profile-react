import { test, expect } from '@playwright/test';

/**
 * Testes E2E do Card Profile
 *
 * Analogia: É como um usuário real testando seu site
 * - Abre o navegador
 * - Navega pelo site
 * - Clica em botões
 * - Verifica se tudo funciona como esperado
 */

test.describe('Card Profile - User Experience', () => {
  test.beforeEach(async ({ page }) => {
    // Vai para a página inicial antes de cada teste
    await page.goto('/');
  });

  test('should load the page successfully', async ({ page }) => {
    // Verifica se o título da página está correto
    await expect(page).toHaveTitle(/card-viking-react/i);
  });

  test('should display profile card', async ({ page }) => {
    // Verifica se o card está visível
    const card = page.locator('[class*="card"]').first();
    await expect(card).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Simula mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Verifica se o card ainda está visível
    const card = page.locator('[class*="card"]').first();
    await expect(card).toBeVisible();
  });

  test('should have correct meta tags for SEO', async ({ page }) => {
    // Verifica viewport meta tag
    const viewport = page.locator('meta[name="viewport"]');
    await expect(viewport).toHaveAttribute('content', /width=device-width/);

    // Verifica charset
    const charset = page.locator('meta[charset]');
    await expect(charset).toHaveCount(1);
  });

  test('should load external resources', async ({ page }) => {
    // Verifica Font Awesome
    const fontAwesomeLink = page.locator('link[href*="font-awesome"]');
    await expect(fontAwesomeLink).toHaveCount(1);
  });
});
