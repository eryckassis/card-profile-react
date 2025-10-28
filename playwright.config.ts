import { defineConfig, devices } from '@playwright/test';

// Verificar se está rodando no CI
const isCI = !!process.env.CI;

/**
 * Configuração do Playwright para testes E2E
 *
 * Analogia: É como configurar um robô que vai usar seu site
 * - Ele abre o navegador (Chrome, Firefox, Safari)
 * - Clica em botões
 * - Preenche formulários
 * - Verifica se tudo funciona
 */
export default defineConfig({
  // Pasta onde ficam os testes E2E
  testDir: './e2e',

  // Timeout por teste (30 segundos)
  timeout: 30 * 1000,

  // Configurações globais
  fullyParallel: true, // Roda testes em paralelo (mais rápido)
  forbidOnly: isCI, // Impede .only() no CI
  retries: isCI ? 2 : 0, // 2 tentativas no CI, 0 localmente
  workers: isCI ? 1 : undefined, // 1 worker no CI, auto localmente

  // Reporter: como os resultados são mostrados
  reporter: isCI
    ? [['html'], ['github'], ['json', { outputFile: 'test-results.json' }]]
    : [['html'], ['list']],

  // Configuração compartilhada entre todos os testes
  use: {
    // URL base da aplicação
    baseURL: 'http://localhost:5173',

    // Screenshots apenas quando falhar
    screenshot: 'only-on-failure',

    // Vídeos apenas quando falhar
    video: 'retain-on-failure',

    // Traces para debug
    trace: 'on-first-retry',
  },

  // Projetos: diferentes navegadores para testar
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Descomente para testar em mais navegadores
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

  // Servidor de desenvolvimento
  // Playwright inicia automaticamente antes dos testes
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !isCI,
    timeout: 120 * 1000,
  },
});
