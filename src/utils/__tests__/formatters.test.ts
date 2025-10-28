import { describe, it, expect } from 'vitest';
import { formatFollowers } from '../formatters';

/**
 * Testes para formatFollowers
 *
 * Analogia: Testamos se uma calculadora funciona corretamente
 * - Damos inputs conhecidos
 * - Verificamos se o output é o esperado
 * - Testamos casos extremos (edge cases)
 */
describe('formatFollowers', () => {
  /**
   * Teste 1: Números em milhões
   * Por quê? É o caso mais comum (influencers grandes)
   */
  it('should format numbers in millions correctly', () => {
    expect(formatFollowers(15000000)).toBe('15.0M');
    expect(formatFollowers(1500000)).toBe('1.5M');
    expect(formatFollowers(1000000)).toBe('1.0M');
  });

  /**
   * Teste 2: Números em milhares
   * Por quê? Influencers médios têm milhares de seguidores
   */
  it('should format numbers in thousands correctly', () => {
    expect(formatFollowers(15000)).toBe('15.0K');
    expect(formatFollowers(1500)).toBe('1.5K');
    expect(formatFollowers(1000)).toBe('1.0K');
  });

  /**
   * Teste 3: Números pequenos
   * Por quê? Iniciantes têm poucos seguidores
   */
  it('should return small numbers as strings', () => {
    expect(formatFollowers(999)).toBe('999');
    expect(formatFollowers(100)).toBe('100');
    expect(formatFollowers(0)).toBe('0');
  });

  /**
   * Teste 4: Edge cases (casos extremos)
   * Por quê? Precisamos garantir que não quebra com inputs inesperados
   */
  it('should handle edge cases correctly', () => {
    // Números decimais (arredondamento)
    expect(formatFollowers(1567)).toBe('1.6K');
    expect(formatFollowers(1234567)).toBe('1.2M');

    // Número muito grande
    expect(formatFollowers(999999999)).toBe('1000.0M');
  });

  /**
   * Teste 5: Limites entre categorias
   * Por quê? Garantir transição suave entre K e M
   */
  it('should handle boundary values correctly', () => {
    expect(formatFollowers(999999)).toBe('1000.0K'); // Quase 1M
    expect(formatFollowers(1000000)).toBe('1.0M'); // Exatamente 1M
    expect(formatFollowers(999)).toBe('999'); // Abaixo de 1K
    expect(formatFollowers(1000)).toBe('1.0K'); // Exatamente 1K
  });
});
