import './globals.css'
import 'vidstack/styles/base.css'
import type { Metadata } from 'next'
import clsx from 'clsx'
import { erode, iosevka, tasa_explorer } from './fonts'
import { Providers } from './providers'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={clsx(
          `${tasa_explorer.variable} ${erode.variable} ${iosevka.variable}`
        )}
      >
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
