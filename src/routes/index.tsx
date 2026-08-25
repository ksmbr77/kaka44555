import { createFileRoute } from "@tanstack/react-router";

import { Reveal } from "@/components/Reveal";
import { useClickSound } from "@/hooks/useClickSound";

const banner1 = { url: "/images/banner-1.jpg" };
const banner2 = { url: "/images/banner-2.jpg" };
const banner3 = { url: "/images/banner-3.jpg" };
const banner4 = { url: "/images/banner-4.jpg" };
const banner5 = { url: "/images/banner-5.jpg" };
const perfil = { url: "/images/perfil-kaka.jpg" };

const CANDIDATO = {
  nome: "Kaká Santos",
  nomeDestaque: "Kaká Santos 🟠4️⃣4️⃣5️⃣5️⃣5️⃣",
  cargo: "Deputado Estadual",
  numero: "44555",
  slogan: "O novo que deu certo!",
  cidade: "Sergipe",
  bio: "O novo que deu certo! Deputado Estadual por Sergipe.",
  whatsapp: "https://chat.whatsapp.com/DQcAVOYCjoZHBXKixZJ2gE?mode=gi_t",
};

const ACOES = [
  {
    label: "Personalize seu perfil",
    arte: banner1.url,
    href: "https://apoio.top/q/kaka44555",
  },
  {
    label: "Material de campanha",
    arte: banner2.url,
    href: "https://drive.google.com/drive/folders/1OvA7dl1T9XT8fpfnBHfN1h0ZhN3QTOSQ?usp=sharing",
  },
  {
    label: "Músicas",
    arte: banner3.url,
    href: "https://open.spotify.com/intl-pt/artist/5Z1bKzhjP6CZfPbfNVHXu2",
  },
  {
    label: "Figurinhas",
    arte: banner4.url,
    href: "https://sticker.ly/user/kaka44555",
  },
  {
    label: "Participe do grupo",
    arte: banner5.url,
    href: CANDIDATO.whatsapp,
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${CANDIDATO.nome} ${CANDIDATO.numero} — ${CANDIDATO.cargo}` },
      {
        name: "description",
        content: `Bio oficial de ${CANDIDATO.nome}, candidato a ${CANDIDATO.cargo} em ${CANDIDATO.cidade}. Material de campanha, músicas, figurinhas e grupo no WhatsApp.`,
      },
      { property: "og:title", content: `${CANDIDATO.nome} ${CANDIDATO.numero}` },
      {
        property: "og:description",
        content: `${CANDIDATO.slogan} Tudo da campanha em um só lugar.`,
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: BioSite,
});

function BioSite() {
  const playClick = useClickSound();

  return (
    <main className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-28 top-20 h-80 w-80 rounded-full bg-highlight/20 blur-3xl animate-drift" />
        <div className="absolute right-[-7rem] top-[30rem] h-96 w-96 rounded-full bg-primary/30 blur-3xl animate-drift [animation-delay:3s]" />
      </div>

      <div className="relative mx-auto w-full max-w-3xl px-4 pb-24 pt-10 sm:px-6 sm:pt-14">
        <header className="text-center">
          <Reveal>
            <div className="relative mx-auto h-40 w-40 sm:h-48 sm:w-48">
              <div className="absolute inset-0 -z-10 rounded-full bg-primary/40 blur-2xl animate-breathe" />
              <img
                src={perfil.url}
                alt={`${CANDIDATO.nome}, candidato a ${CANDIDATO.cargo}`}
                width={500}
                height={500}
                loading="eager"
                decoding="async"
                className="h-40 w-40 rounded-full object-cover shadow-[0_18px_40px_rgba(0,0,0,0.45)] sm:h-48 sm:w-48 animate-breathe"
              />
            </div>
            <h1 className="mt-5 font-sans text-3xl font-bold normal-case tracking-normal sm:text-4xl">
              {CANDIDATO.nomeDestaque}
            </h1>
            <p className="mx-auto mt-2 max-w-md text-base leading-relaxed text-foreground/90 sm:text-lg">
              {CANDIDATO.bio}
            </p>
          </Reveal>
        </header>

        {/* CARDS DA CAMPANHA */}
        <section aria-label="Links da campanha" className="mt-10 space-y-6 sm:mt-14 sm:space-y-8">
          {ACOES.map((acao, i) => (
            <Reveal key={acao.label} delay={i * 110}>
              <a
                href={acao.href}
                target={acao.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={acao.label}
                onPointerDown={playClick}
                className="group block overflow-hidden rounded-3xl surface-card press"
              >
                <img
                  src={acao.arte}
                  alt={acao.label}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  width={1600}
                  height={524}
                  className="w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </a>
            </Reveal>
          ))}
        </section>
      </div>
    </main>
  );
}
