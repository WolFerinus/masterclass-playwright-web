// @ts-check
import { test, expect } from '@playwright/test';
const { abrirPagina,
        digitarEmail,
        clicarBotaoCadastrar,
        validarCadastroRealizado,
        validarCadastroNegado,
        digitarSenha
      } = require('./page-cadastro');

function gerarEmailUnico() {
  return `usuario.${Date.now()}-${Math.random().toString(16).slice(2)}@example.com`;
}

test('Teste cadastro Qazando - Preenchimento do cadastro', async ({ page }) => {
  await abrirPagina(page);
  await page.locator('#user').fill('João');
  await digitarEmail(page, gerarEmailUnico());
  await digitarSenha(page, '123456');
  await clicarBotaoCadastrar(page);
  await validarCadastroRealizado(page, 'João');
});

test('Teste cadastro Qazando - Negativo: enviar vazio (campos obrigatórios)', async ({ page }) => {
  await abrirPagina(page);
  await clicarBotaoCadastrar(page);

  await validarCadastroNegado(page, 'O campo nome deve ser prenchido');
});

test('Teste cadastro Qazando - Negativo: sem nome', async ({ page }) => {
  await abrirPagina(page);
  await digitarEmail(page, gerarEmailUnico());
  await digitarSenha(page, '123456');
  await clicarBotaoCadastrar(page);

  await validarCadastroNegado(page, 'O campo nome deve ser prenchido');
});

test('Teste cadastro Qazando - Negativo: e-mail vazio', async ({ page }) => {
  await abrirPagina(page);
  await page.locator('#user').fill('João');
  await digitarSenha(page, '123456');
  await clicarBotaoCadastrar(page);

  await validarCadastroNegado(page, 'O campo e-mail deve ser prenchido corretamente');
});


test('Teste cadastro Qazando - Negativo: e-mail inválido', async ({ page }) => {
  await abrirPagina(page);
  await page.locator('#user').fill('João');
  await digitarEmail(page, 'email-invalido');
  await digitarSenha(page, '123456');
  await clicarBotaoCadastrar(page);

  await validarCadastroNegado(page, 'O campo e-mail deve ser prenchido corretamente');
});

test('Teste cadastro Qazando - Negativo: sem senha', async ({ page }) => {
  await abrirPagina(page);
  await page.locator('#user').fill('João');
  await digitarEmail(page, gerarEmailUnico());
  await clicarBotaoCadastrar(page);

  await validarCadastroNegado(page, 'O campo senha deve ter pelo menos 6 dígitos');
});