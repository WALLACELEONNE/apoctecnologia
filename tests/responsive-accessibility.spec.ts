import { test, expect } from '@playwright/test';

test.describe('Responsividade e Acessibilidade', () => {
  test('Deve exibir menu mobile em telas menores', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    await expect(page.locator('.nav-toggle')).toBeVisible();
    await page.click('.nav-toggle');
    await expect(page.locator('.nav-menu')).toBeVisible();
  });

  test('Deve exibir todas as seções em mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    const sections = ['#home', '#services', '#about', '#contact'];
    
    for (const section of sections) {
      const element = await page.locator(section);
      await expect(element).toBeVisible();
    }
  });

  test('Deve carregar todos os cards de serviço', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.services-grid');
    
    const serviceCards = await page.locator('.service-card');
    expect(await serviceCards.count()).toBe(6);
  });

  test('Deve carregar todos os diferenciais', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.differentials-grid');
    
    const differentialItems = await page.locator('.differential-item');
    expect(await differentialItems.count()).toBe(6);
  });

  test('Deve exibir o footer com todas as informações', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await expect(page.locator('.footer')).toBeVisible();
    await expect(page.locator('.footer-brand')).toBeVisible(); 
    await expect(page.locator('.footer-links')).toBeVisible();       
  });

  test('Deve exibir todos os links do footer', async ({ page }) => {
    await page.goto('/');
    const footerLinks = await page.locator('.footer-column a');
    expect(await footerLinks.count()).toBeGreaterThan(0);
  });
});
