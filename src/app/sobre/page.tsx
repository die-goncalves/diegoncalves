import { Metadata } from 'next'
import clsx from 'clsx'
import { Hyperlink } from '@/components/hyperlink'
import { PDFIcon } from '@/components/icons/pdf'

export const metadata: Metadata = {
  title: 'Sobre | Diego Gonçalves'
}

export default function AboutPage() {
  return (
    <main>
      <article className="mx-auto min-h-[calc(100vh-(88px+139px))] max-w-4xl px-4 py-8 md:min-h-[calc(100vh-(88px+88px))] md:px-8">
        <h1 className="mb-8 text-center text-2xl font-bold">Sobre</h1>

        <p className="mb-4">
          Sou desenvolvedor front-end, formado em engenharia da computação e
          minha primeira experiência com desenvolvimento de aplicações foi na
          universidade e nos últimos anos trabalhando para aprender sobre as
          últimas tendências no desenvolvimento web e design com cursos e
          bootcamps. Gosto de enfrentar desafios ao desenvolver projetos,
          corrigir erros, proporcionar bom desempenho e do sentimento de
          realização que advinha do lançamento de um projeto.
        </p>

        <p className="mb-4">
          As principais tecnologias que utilizo no meu cotidiano para a
          construção dos meus projetos são o{' '}
          <Hyperlink external href="https://react.dev/">
            React
          </Hyperlink>{' '}
          e o{' '}
          <Hyperlink external href="https://nextjs.org/">
            Next.js
          </Hyperlink>{' '}
          para criar de interfaces para o usuário, o{' '}
          <Hyperlink external href="https://tailwindcss.com/">
            tailwindcss
          </Hyperlink>{' '}
          e{' '}
          <Hyperlink external href="https://styled-components.com/">
            styled-components
          </Hyperlink>{' '}
          para estilização e o{' '}
          <Hyperlink external href="https://www.figma.com/">
            figma
          </Hyperlink>{' '}
          para planejamento, conceituação, prototipação e design. Também já
          trabalhei com{' '}
          <Hyperlink external href="https://supabase.com/">
            supabase
          </Hyperlink>{' '}
          e{' '}
          <Hyperlink external href="https://firebase.google.com/">
            firebase
          </Hyperlink>
          , integração com backends,{' '}
          <Hyperlink external href="https://graphql.org/">
            graphql
          </Hyperlink>
          ,{' '}
          <Hyperlink external href="https://www.prisma.io/">
            prisma
          </Hyperlink>
          , processamento de pagamentos com{' '}
          <Hyperlink external href="https://stripe.com/">
            stripe
          </Hyperlink>{' '}
          e CMS( Sistema de Gerenciamento de Conteúdo) com{' '}
          <Hyperlink external href="https://prismic.io/">
            prismic
          </Hyperlink>{' '}
          e{' '}
          <Hyperlink external href="https://hygraph.com/">
            hygraph
          </Hyperlink>
          .
        </p>

        <p className="mb-4">
          Meu objetivo é sempre criar algo simples, com uma interface amigável
          para os usuários, accessível e responsiva.
        </p>

        <p className="mb-4">
          Estou sempre à procura de formas de melhorar as minhas competências e
          de aprender e adotar novas tecnologias e bibliotecas relevantes na
          comunidade web em meu processo de desenvolvimento.
        </p>

        <p className="mb-4">
          Se quiser trabalhar comigo, sinta-se à vontade para entrar em contato.
        </p>

        <div className="my-8 flex items-center justify-center">
          <button
            className={clsx(
              'relative flex h-10 items-center justify-center gap-2 px-2',
              'border-2 border-brand',
              'outline-2 outline-offset-2 outline-black/92 focus-visible:outline dark:outline-white/92',
              'duration-300 ease-out-quart [transition-property:background]',
              'hover:bg-black/8 focus-visible:bg-black/8 active:bg-black/16 dark:hover:bg-white/8 dark:focus-visible:bg-white/8 dark:active:bg-white/16'
            )}
          >
            <span>Baixar currículo</span>
            <PDFIcon className="h-6 w-6 fill-black/92 dark:fill-white/92" />
          </button>
        </div>
      </article>
    </main>
  )
}
