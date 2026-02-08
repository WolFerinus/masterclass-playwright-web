// @ts-check
import { test, expect } from '@playwright/test';

const HOME_URL = 'https://automationpratice.com.br/register';

function gerarEmailUnico() {
  return `usuario.${Date.now()}-${Math.random().toString(16).slice(2)}@example.com`;
}

test('Teste cadastro Qazando - Preenchimento do cadastro', async ({ page }) => {
  await page.goto(HOME_URL);
  await page.locator('#user').fill('João');
  await page.locator('#email').fill(gerarEmailUnico());
  await page.locator('#password').fill('123456');
  await page.getByRole('button', { name: 'Cadastrar' }).click();
  await expect(page.getByRole('heading', { name: 'Cadastro realizado!' })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText('Bem-vindo João')).toBeVisible();
});

test('Teste cadastro Qazando - Negativo: enviar vazio (campos obrigatórios)', async ({ page }) => {
  await page.goto(HOME_URL);
  await page.getByRole('button', { name: 'Cadastrar' }).click();

  await expect(page.getByText('O campo nome deve ser prenchido')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Cadastro realizado!' })).not.toBeVisible();
});

test('Teste cadastro Qazando - Negativo: sem nome', async ({ page }) => {
  await page.goto(HOME_URL);
  await page.locator('#email').fill(gerarEmailUnico());
  await page.locator('#password').fill('123456');
  await page.getByRole('button', { name: 'Cadastrar' }).click();

  await expect(page.getByText('O campo nome deve ser prenchido')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Cadastro realizado!' })).not.toBeVisible();
});

test('Teste cadastro Qazando - Negativo: e-mail vazio', async ({ page }) => {
  await page.goto(HOME_URL);
  await page.locator('#user').fill('João');
  await page.locator('#password').fill('123456');
  await page.getByRole('button', { name: 'Cadastrar' }).click();

  await expect(page.getByText('O campo e-mail deve ser prenchido corretamente')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Cadastro realizado!' })).not.toBeVisible();
});

test('Teste cadastro Qazando - Negativo: e-mail inválido', async ({ page }) => {
  await page.goto(HOME_URL);
  await page.locator('#user').fill('João');
  await page.locator('#email').fill('email-invalido');
  await page.locator('#password').fill('123456');
  await page.getByRole('button', { name: 'Cadastrar' }).click();

  await expect(page.getByText('O campo e-mail deve ser prenchido corretamente')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Cadastro realizado!' })).not.toBeVisible();
});

test('Teste cadastro Qazando - Negativo: sem senha', async ({ page }) => {
  await page.goto(HOME_URL);
  await page.locator('#user').fill('João');
  await page.locator('#email').fill(gerarEmailUnico());
  await page.getByRole('button', { name: 'Cadastrar' }).click();

  await expect(page.getByText('O campo senha deve ter pelo menos 6 dígitos')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Cadastro realizado!' })).not.toBeVisible();
});