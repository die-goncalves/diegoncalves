import { Metadata } from 'next'
import { Hyperlink } from '@/components/hyperlink'

export const metadata: Metadata = {
  title: 'Contato | Diego Gonçalves'
}

export default function ContactPage() {
  return (
    <main>
      <article className="mx-auto min-h-[calc(100vh-(88px+139px))] max-w-4xl px-4 py-8 sm:min-h-[calc(100vh-(88px+88px))] md:px-8">
        <h1 className="mb-8 text-center text-2xl font-bold">Contato</h1>
        <p className="mx-auto max-w-xl text-center">
          Você pode me encontrar no{' '}
          <Hyperlink
            external
            href="https://www.linkedin.com/in/diego-goncalves1990"
          >
            linkedin
          </Hyperlink>{' '}
          e deixar uma mensagem ou enviar um e-mail para{' '}
          <Hyperlink href="mailto:die.goncalves1990@gmail.com">
            die.goncalves1990@gmail.com
          </Hyperlink>
        </p>
      </article>
    </main>
  )
}
