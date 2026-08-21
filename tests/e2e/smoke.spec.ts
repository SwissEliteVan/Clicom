import { test, expect } from '@playwright/test';

const publicRoutes = [
  '/',
  '/services/',
  '/solutions/',
  '/contact/',
  '/creation-site-web/',
  '/secteurs/artisans/',
  '/realisations/nat-et-patoune/',
  '/blog/ameliorer-taux-conversion-site/',
];

test.describe('Smoke tests — Public routes', () => {
  for (const route of publicRoutes) {
    test(`route ${route} loads with 200 and valid h1`, async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });

      const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
      expect(response?.status()).toBe(200);

      // Verify single h1 is present
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBe(1);

      // Ensure no critical unhandled JS errors occurred on load
      expect(consoleErrors).toEqual([]);
    });
  }

  test('non-existing route returns 404 status', async ({ page }) => {
    const response = await page.goto('/page-inexistante-404');
    expect(response?.status()).toBe(404);
  });
});

test.describe('Navigation & Mobile menu', () => {
  test('mobile menu toggles and allows navigation at 375px viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const mobileMenu = page.locator('.mobile-menu');
    await expect(mobileMenu).toBeVisible();

    const summary = mobileMenu.locator('summary');
    await summary.click();

    const panel = mobileMenu.locator('.mobile-menu__panel');
    await expect(panel).toBeVisible();

    // Click on services link in mobile menu
    const servicesLink = panel.locator('a[href="/services"]').first();
    await servicesLink.click();

    await page.waitForURL('**/services**');
    expect(page.url()).toContain('/services');
  });
});

test.describe('Contact form workflow', () => {
  test('submits successfully with mocked API response', async ({ page }) => {
    await page.route('**/api/contact', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          message: 'Merci. Votre demande a bien été envoyée.',
        }),
      });
    });

    await page.goto('/contact/');

    const form = page.locator('form[data-contact-form]');
    await expect(form).toBeVisible();

    await form.locator('input[name="nom"]').fill('Sophie Martin');
    await form.locator('input[name="email"]').fill('sophie.martin@example.ch');
    await form.locator('textarea[name="objectif"]').fill('Refonte complète de notre site vitrine et accompagnement SEO cantonal.');

    const submitBtn = form.locator('button[type="submit"]');
    await submitBtn.click();

    const statusEl = form.locator('[data-form-status]');
    await expect(statusEl).toHaveClass(/is-success/);
    await expect(statusEl).toContainText('Merci. Votre demande a bien été envoyée.');
  });

  test('displays error message when API fails', async ({ page }) => {
    await page.route('**/api/contact', async (route) => {
      await route.fulfill({
        status: 502,
        contentType: 'application/json',
        body: JSON.stringify({
          success: false,
          message: 'Une erreur est survenue lors de l’envoi.',
        }),
      });
    });

    await page.goto('/contact/');

    const form = page.locator('form[data-contact-form]');
    await form.locator('input[name="nom"]').fill('Sophie Martin');
    await form.locator('input[name="email"]').fill('sophie.martin@example.ch');
    await form.locator('textarea[name="objectif"]').fill('Demande de devis pour un site e-commerce et campagnes publicitaires.');

    const submitBtn = form.locator('button[type="submit"]');
    await submitBtn.click();

    const statusEl = form.locator('[data-form-status]');
    await expect(statusEl).toHaveClass(/is-error/);
  });
});
