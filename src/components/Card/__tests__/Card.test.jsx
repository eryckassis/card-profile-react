import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CardProfile from '../Card';

/**
 * Testes do CardProfile Component
 *
 * Analogia: Testamos como um USUÁRIO real usaria o componente
 * - Não testamos implementação (useState, useEffect)
 * - Testamos o que o usuário VÊ e FAZ
 * - Testamos acessibilidade
 */
describe('CardProfile', () => {
  /**
   * Props padrão para testes
   * Analogia: É como ter um "boneco de teste" pronto para usar
   */
  const defaultProps = {
    name: 'Eivor Ragnarson',
    description: 'Jomsviking da Noruega',
    followers: 15,
    dark: false,
    imageSource: '/viking.png',
    isFollowing: false,
    onToggle: vi.fn(), // Mock de função (espião)
  };

  /**
   * Teste 1: Renderização básica
   * Por quê? Garantir que todas as informações aparecem na tela
   */
  it('should render all profile information', () => {
    render(<CardProfile {...defaultProps} />);

    // Verifica se o nome aparece (heading)
    expect(screen.getByRole('heading', { name: /eivor ragnarson/i })).toBeInTheDocument();

    // Verifica se a descrição aparece
    expect(screen.getByText(/jomsviking da noruega/i)).toBeInTheDocument();

    // Verifica se os seguidores aparecem (15M)
    expect(screen.getByText(/15m/i)).toBeInTheDocument();
  });

  /**
   * Teste 2: Imagem com acessibilidade
   * Por quê? Alt text é crucial para leitores de tela
   */
  it('should render image with descriptive alt text', () => {
    render(<CardProfile {...defaultProps} />);

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/viking.png');
    expect(img).toHaveAttribute('alt', 'Perfil de Eivor Ragnarson');
  });

  /**
   * Teste 3: Dark mode
   * Por quê? Precisa aplicar a classe correta
   */
  it('should apply dark class when dark prop is true', () => {
    const { container } = render(<CardProfile {...defaultProps} dark={true} />);

    const article = container.querySelector('article');
    expect(article).toHaveClass('card', 'dark');
  });

  it('should not apply dark class when dark prop is false', () => {
    const { container } = render(<CardProfile {...defaultProps} dark={false} />);

    const article = container.querySelector('article');
    expect(article).toHaveClass('card');
    expect(article).not.toHaveClass('dark');
  });

  /**
   * Teste 4: Interação do botão
   * Por quê? É a funcionalidade principal do card
   */
  it('should call onToggle when button is clicked', async () => {
    const user = userEvent.setup();
    const handleToggle = vi.fn();

    render(<CardProfile {...defaultProps} onToggle={handleToggle} />);

    // Busca o botão pelo texto
    const button = screen.getByRole('button', { name: /seguir/i });

    // Simula clique do usuário
    await user.click(button);

    // Verifica se a função foi chamada
    expect(handleToggle).toHaveBeenCalledTimes(1);
  });

  /**
   * Teste 5: Texto do botão muda conforme estado
   * Por quê? Feedback visual para o usuário
   */
  it('should display "Seguir" when not following', () => {
    render(<CardProfile {...defaultProps} isFollowing={false} />);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Seguir');
  });

  it('should display "Unfollow" when following', () => {
    render(<CardProfile {...defaultProps} isFollowing={true} />);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Unfollow');
  });

  /**
   * Teste 6: Classe CSS do botão muda conforme estado
   * Por quê? Estilo visual diferente quando já está seguindo
   */
  it('should apply "following" class when isFollowing is true', () => {
    render(<CardProfile {...defaultProps} isFollowing={true} />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('following');
  });

  it('should not apply "following" class when isFollowing is false', () => {
    render(<CardProfile {...defaultProps} isFollowing={false} />);

    const button = screen.getByRole('button');
    expect(button).not.toHaveClass('following');
  });

  /**
   * Teste 7: Acessibilidade - aria-label
   * Por quê? Leitores de tela precisam dessa informação
   */
  it('should have aria-label for followers count', () => {
    render(<CardProfile {...defaultProps} followers={15} />);

    // Busca pelo aria-label
    expect(screen.getByLabelText(/15 milhões de seguidores/i)).toBeInTheDocument();
  });

  /**
   * Teste 8: Ícone decorativo tem aria-hidden
   * Por quê? Ícones decorativos não devem ser lidos por leitores de tela
   */
  it('should hide decorative icon from screen readers', () => {
    const { container } = render(<CardProfile {...defaultProps} />);

    const icon = container.querySelector('i.fa-user');
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });

  /**
   * Teste 9: Renderiza com diferentes números de seguidores
   * Por quê? Garantir que funciona com vários valores
   */
  it('should display different follower counts correctly', () => {
    const { rerender } = render(<CardProfile {...defaultProps} followers={1} />);
    expect(screen.getByText(/1m/i)).toBeInTheDocument();

    rerender(<CardProfile {...defaultProps} followers={999} />);
    expect(screen.getByText(/999m/i)).toBeInTheDocument();
  });

  /**
   * Teste 10: Botão tem type="button"
   * Por quê? Previne submit acidental em forms
   */
  it('should have button type as "button"', () => {
    render(<CardProfile {...defaultProps} />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'button');
  });

  /**
   * Teste 11: Estrutura semântica HTML
   * Por quê? SEO e acessibilidade dependem de tags corretas
   */
  it('should use semantic HTML elements', () => {
    const { container } = render(<CardProfile {...defaultProps} />);

    // Verifica se usa <article>
    expect(container.querySelector('article')).toBeInTheDocument();

    // Verifica se usa <header>
    expect(container.querySelector('header')).toBeInTheDocument();

    // Verifica se usa <footer>
    expect(container.querySelector('footer')).toBeInTheDocument();

    // Verifica se usa <section>
    expect(container.querySelector('section')).toBeInTheDocument();
  });
});
