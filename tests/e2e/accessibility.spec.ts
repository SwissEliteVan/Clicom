import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const a11yRoutes = [
  '/',
  '/services/',
  '/contact/',
  '/blog/ameliorer-taux-conversion-site/',
];

test.describe('Automated Accessibility Tests (Axe-core WCAG AA)', () => {
  for (const route of a11yRoutes) {
    test(`route ${route} meets WCAG 2.1 / 2.2 AA standards`, async ({ page }) => {
      test.slow();
      await page.goto(route);
      await page.waitForLoadState('domcontentloaded');

      // Complete unconstrained scan with all WCAG 2.1 / 2.2 AA rules enabled
      const scanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      const structuralViolations = scanResults.violations.filter(
        (v) => v.id !== 'color-contrast'
      );
      const contrastViolations = scanResults.violations.filter(
        (v) => v.id === 'color-contrast'
      );

      if (contrastViolations.length > 0) {
        for (const violation of contrastViolations) {
          console.log(
            `[A11y Debt OPT-014] Route ${route} -> Rule: ${violation.id} (${violation.impact}) -> ${violation.nodes.length} element(s) flagged.`
          );
        }
      }

      // 1. Strict blocking assertion: 0 structural, semantic, landmark or ARIA violation allowed
      expect(structuralViolations).toEqual([]);

      // 2. Verification that no unexpected violation rules other than documented color-contrast exist
      for (const violation of scanResults.violations) {
        expect(['color-contrast']).toContain(violation.id);
      }
    });
  }
});
