import type { ReactNode } from "react";

/**
 * Entrada animada 100% via CSS (animation-fill-mode: both).
 * O elemento já nasce com o estado inicial correto no HTML/CSS, sem depender
 * do JS carregar/hidratar para ficar visível — evita o "flash" de conteúdo
 * invisível em conexões lentas.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div className={`${className} animate-rise`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
