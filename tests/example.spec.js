// @ts-check
import { test, expect } from '@playwright/test';

const HOME_URL = 'https://playwright.dev/';

/**
 * @param {import('@playwright/test').Page} page
 * @returns {Promise<void>}
 */
async function gotoHome(page) {
  const response = await page.goto(HOME_URL, { waitUntil: 'domcontentloaded' });
  expect(response, 'Expected navigation response to be available').not.toBeNull();
  expect(
    response.ok(),
    `Expected navigation to succeed, but got HTTP ${response.status()}`
  ).toBeTruthy();
}

test.describe('Playwright.dev - Home', () => {
  test('loads successfully', async ({ page }) => {
    await gotoHome(page);
    await expect(page).toHaveURL(/^https:\/\/playwright\.dev\/?$/);
  });

  test('has title containing Playwright', async ({ page }) => {
    await gotoHome(page);
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('renders the main H1 hero heading', async ({ page }) => {
    await gotoHome(page);
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: /Playwright enables reliable end-to-end testing for modern web apps\./i,
      })
    ).toBeVisible();
  });

  test('shows a Skip to main content link', async ({ page }) => {
    await gotoHome(page);
    await expect(page.getByRole('link', { name: /skip to main content/i })).toBeVisible();
  });

  test('hero GET STARTED link is visible and points to docs intro', async ({ page }) => {
    await gotoHome(page);
    const getStarted = page.getByRole('link', { name: /^get started$/i });
    await expect(getStarted).toBeVisible();
    await expect(getStarted).toHaveAttribute('href', /\/docs\/intro/);
  });

  test('GET STARTED navigates to Installation page', async ({ page }) => {
    await gotoHome(page);

    await page.getByRole('link', { name: /^get started$/i }).click();
    await expect(page).toHaveURL(/\/docs\/intro/);
    await expect(page.getByRole('heading', { level: 1, name: 'Installation' })).toBeVisible();
  });

  test('GitHub star link points to microsoft/playwright', async ({ page }) => {
    await gotoHome(page);
    const link = page.getByRole('link', { name: /star microsoft\/playwright on github/i });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', 'https://github.com/microsoft/playwright');
  });

  test('shows stargazers link', async ({ page }) => {
    await gotoHome(page);
    const link = page.getByRole('link', { name: /stargazers on github/i });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', /github\.com\/microsoft\/playwright\/stargazers/);
  });

  test('shows browsers image in hero section', async ({ page }) => {
    await gotoHome(page);
    await expect(page.getByRole('img', { name: /browsers/i })).toBeVisible();
  });

  test('cross-language links are present', async ({ page }) => {
    await gotoHome(page);

    const languageLinks = [
      { name: 'TypeScript', href: /\/docs\/intro/ },
      { name: 'JavaScript', href: /\/docs\/intro/ },
      { name: 'Python', href: /\/python\/docs\/intro/ },
      { name: '.NET', href: /\/dotnet\/docs\/intro/ },
      { name: 'Java', href: /\/java\/docs\/intro/ },
    ];

    for (const { name, href } of languageLinks) {
      const link = page.getByRole('link', { name, exact: true });
      await expect(link, `Expected ${name} link to be visible`).toBeVisible();
      await expect(link, `Expected ${name} link href to match`).toHaveAttribute('href', href);
    }
  });

  test('powerful tooling links are present', async ({ page }) => {
    await gotoHome(page);

    const toolingLinks = [
      { name: /codegen\./i, href: /(^|\/)docs\/codegen/ },
      { name: /playwright inspector\./i, href: /(^|\/)docs\/debug/ },
      { name: /trace viewer\./i, href: /(^|\/)docs\/trace-viewer-intro/ },
    ];

    for (const { name, href } of toolingLinks) {
      const link = page.getByRole('link', { name });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('href', href);
    }
  });

  test('company links section contains VS Code and Bing', async ({ page }) => {
    await gotoHome(page);
    await expect(page.getByRole('link', { name: 'VS Code', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Bing', exact: true })).toBeVisible();
  });

  test('footer Learn links are present with expected URLs', async ({ page }) => {
    await gotoHome(page);
    const learn = [
      { name: 'Getting started', href: /\/docs\/intro/ },
      {
        name: 'Playwright Training',
        href: /learn\.microsoft\.com\/en-us\/training\/modules\/build-with-playwright/i,
      },
      { name: 'Learn Videos', href: /\/community\/learn-videos/ },
      { name: 'Feature Videos', href: /\/community\/feature-videos/ },
    ];

    for (const { name, href } of learn) {
      const link = page.getByRole('link', { name, exact: true });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('href', href);
    }
  });

  test('footer Community links are present with expected URLs', async ({ page }) => {
    await gotoHome(page);
    const community = [
      { name: 'Stack Overflow', href: /stackoverflow\.com\/questions\/tagged\/playwright/i },
      { name: 'Discord', href: /aka\.ms\/playwright\/discord/i },
      { name: 'Twitter', href: /twitter\.com\/playwrightweb/i },
      { name: 'LinkedIn', href: /linkedin\.com\/company\/playwrightweb/i },
    ];

    for (const { name, href } of community) {
      const link = page.getByRole('link', { name, exact: true });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('href', href);
    }
  });

  test('footer More links are present with expected URLs', async ({ page }) => {
    await gotoHome(page);
    const more = [
      { name: 'GitHub', href: 'https://github.com/microsoft/playwright' },
      { name: 'YouTube', href: /youtube\.com\/channel\//i },
      { name: 'Blog', href: /dev\.to\/playwright/i },
      { name: 'Ambassadors', href: /\/community\/ambassadors/ },
    ];

    for (const { name, href } of more) {
      const link = page.getByRole('link', { name, exact: true });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('href', href);
    }
  });

  test('does not emit pageerror during load', async ({ page }) => {
    const pageErrors = [];
    page.on('pageerror', (err) => pageErrors.push(err));

    await gotoHome(page);
    expect(pageErrors, `Unexpected pageerror(s): ${pageErrors.map(String).join('\n')}`).toHaveLength(0);
  });

  test('does not emit console.error during load', async ({ page }) => {
    const consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await gotoHome(page);
    expect(consoleErrors, `Unexpected console.error(s): ${consoleErrors.join('\n')}`).toHaveLength(0);
  });

  test('has at least one <main> landmark', async ({ page }) => {
    await gotoHome(page);
    const main = page.getByRole('main');
    await expect(main).toBeVisible();
  });

  test('has at least one visible heading (h2)', async ({ page }) => {
    await gotoHome(page);
    await expect(page.getByRole('heading', { level: 2 }).first()).toBeVisible();
  });

  test('all visible links have a non-empty href', async ({ page }) => {
    await gotoHome(page);

    const badHrefs = await page.evaluate(() => {
      const anchors = Array.from(document.querySelectorAll('a'));
      const visible = anchors.filter((a) => {
        const style = window.getComputedStyle(a);
        const rect = a.getBoundingClientRect();
        return style.visibility !== 'hidden' && style.display !== 'none' && rect.width > 0 && rect.height > 0;
      });

      return visible
        .map((a) => a.getAttribute('href'))
        .filter((href) => href === null || href.trim() === '');
    });

    expect(badHrefs, 'Found visible <a> elements without href').toEqual([]);
  });

  test('internal docs intro page loads directly', async ({ page }) => {
    const response = await page.goto('https://playwright.dev/docs/intro', { waitUntil: 'domcontentloaded' });
    expect(response).not.toBeNull();
    expect(
      response.ok(),
      `Expected navigation to succeed, but got HTTP ${response.status()}`
    ).toBeTruthy();
    await expect(page.getByRole('heading', { level: 1, name: 'Installation' })).toBeVisible();
  });
});
