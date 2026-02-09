import { test, expect } from '@playwright/test';
const { abrirPagina,
        digitarEmail,
        digitarSenha,
        clicarBotaoLogin,
        validarLoginRealizado,
        validarLoginNegado,
      } = require('./page-login');


function gerarEmailUnico() {
  return `usuario.${Date.now()}-${Math.random().toString(20).slice(2)}@example.com`;
}

test('Teste Login Qazando - Login Com Sucesso', async ({ page }) => {
  await abrirPagina(page);
  const email = gerarEmailUnico();
  await digitarEmail(page, email);
  await digitarSenha(page, '123456');
  await clicarBotaoLogin(page);
  await validarLoginRealizado(page, email);
});

test('Teste Login Qazando - Negativo: enviar vazio', async ({ page }) => {
  await abrirPagina(page);
  await clicarBotaoLogin(page);

  await validarLoginNegado(page, 'E-mail inválido.');
});

test('Teste Login Qazando - Negativo: e-mail inválido', async ({ page }) => {
  await abrirPagina(page);
  await digitarEmail(page, 'email-invalido');
  await digitarSenha(page, '123456');
  await clicarBotaoLogin(page);

  await validarLoginNegado(page, 'E-mail inválido.');
});

test('Teste Login Qazando - Negativo: senha vazia', async ({ page }) => {
  await abrirPagina(page);
  await digitarEmail(page, gerarEmailUnico());
  await clicarBotaoLogin(page);

  await validarLoginNegado(page, 'Senha inválida.');
});

test('Teste Login Qazando - Negativo: senha curta', async ({ page }) => {
  await abrirPagina(page);
  await digitarEmail(page, gerarEmailUnico());
  await digitarSenha(page, '123');
  await clicarBotaoLogin(page);

  await validarLoginNegado(page, 'Senha inválida.');
});
