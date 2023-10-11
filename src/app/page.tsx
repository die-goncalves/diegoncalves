import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import request, { gql } from 'graphql-request'
import clsx from 'clsx'
import { formatDate } from '@/utils/date'
import { urlToBaseURL } from '@/utils/toBase64'

export const metadata: Metadata = {
  title: 'Página inicial | Diego Gonçalves'
}

async function getLastPosts() {
  const endpoint = process.env.CMS_HYGRAPH ?? ''

  const query = gql`
    query GetLastPosts {
      posts(stage: PUBLISHED, last: 2) {
        id
        slug
        title
        createdAt
        updatedAt
      }
    }
  `

  const data: {
    posts: {
      id: string
      slug: string
      title: string
      createdAt: string
      updatedAt: string
    }[]
  } = await request(endpoint, query)

  return {
    oldPost: data.posts[0],
    newPost: data.posts[1]
  }
}

async function getAvatar() {
  const endpoint = process.env.CMS_HYGRAPH ?? ''

  const query = gql`
    query GetAvatar {
      assets(where: { fileName: "avatar.png" }) {
        id
        url
        blurDataURL: url(
          transformation: {
            image: { resize: { height: 10, width: 10, fit: clip } }
          }
        )
        mimeType
      }
    }
  `

  const data: {
    assets: {
      id: string
      url: string
      blurDataURL: string
      mimeType: string
    }[]
  } = await request(endpoint, query)

  return {
    url: data.assets[0].url,
    blurDataURL: await urlToBaseURL(
      data.assets[0].blurDataURL,
      data.assets[0].mimeType
    )
  }
}

export default async function Home() {
  const { newPost, oldPost } = await getLastPosts()
  const { url, blurDataURL } = await getAvatar()

  return (
    <main>
      <article className="mx-auto min-h-[calc(100vh-(88px+139px))] max-w-4xl px-4 pt-8 sm:min-h-[calc(100vh-(88px+88px))] sm:px-8">
        <div className="my-auto flex items-center justify-center">
          <div className="flex flex-col items-center gap-8 md:flex-row">
            <div className="relative aspect-video h-[300px] w-[225px]">
              <Image
                src={url}
                alt=""
                placeholder="blur"
                blurDataURL={blurDataURL}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-4 text-center md:text-start">
              <span>Oi, eu sou</span>
              <h1 className="mx-auto max-w-min text-3xl font-bold md:mx-0">
                Diego Gonçalves
              </h1>
              <span className="max-w-md">
                Crio e compartilho minhas aplicações web que integram design,
                codificação, interface/experiência do usuário e acessibilidade.
              </span>
            </div>
          </div>
        </div>

        {(newPost || oldPost) && (
          <div className="mx-auto mt-8 flex w-full flex-col gap-2 md:w-[705px]">
            <div className="border-gradient box-gradient"></div>
            <h2 className="text-base font-semibold">
              {newPost && oldPost ? 'Últimas públicações' : 'Última públicação'}
            </h2>
            <nav>
              <ul
                className={clsx(
                  'grid gap-4 md:grid-cols-2 md:grid-rows-1',
                  !(newPost && oldPost) ? 'grid-rows-1' : 'grid-rows-2'
                )}
              >
                {newPost && (
                  <li className="group flex h-fit flex-1">
                    <Link
                      href={`${process.env.DOMAIN}/artigo/${newPost.slug}`}
                      className={clsx(
                        'border-gradient group box-border grid flex-1 items-start overflow-visible p-4 [grid-template-rows:min-content_min-content]',
                        'outline-2 outline-offset-2 outline-black/92 focus-visible:outline dark:outline-white/92',
                        'duration-300 ease-out-quart [transition-property:background]',
                        'focus-visible:bg-black/8 group-hover:bg-black/8 group-active:bg-black/16 dark:focus-visible:bg-white/8 dark:group-hover:bg-white/8 dark:group-active:bg-white/16'
                      )}
                      aria-label={`Ir para a publicação anterior: `}
                    >
                      <p className="line-clamp-2 font-medium">
                        {newPost.title}
                      </p>
                      <p className="text-black/80 dark:text-white/80">
                        {formatDate({
                          date: newPost.updatedAt,
                          template: 'DD [de] MMMM [de] YYYY'
                        })}
                      </p>
                    </Link>
                  </li>
                )}

                {oldPost && (
                  <li className="group flex h-fit flex-1 md:col-start-2">
                    <Link
                      href={`${process.env.DOMAIN}/artigo/${oldPost.slug}`}
                      className={clsx(
                        'group grid flex-1 items-start p-4 [grid-template-rows:min-content_min-content]',
                        'outline-2 outline-offset-2 outline-black/92 focus-visible:outline dark:outline-white/92',
                        'duration-300 ease-out-quart [transition-property:background]',
                        'focus-visible:bg-black/8 group-hover:bg-black/8 group-active:bg-black/16 dark:focus-visible:bg-white/8 dark:group-hover:bg-white/8 dark:group-active:bg-white/16'
                      )}
                      aria-label={`Ir para a próxima publicação:`}
                    >
                      <p className="line-clamp-2 font-medium">
                        {oldPost.title}
                      </p>
                      <p className="text-black/80 dark:text-white/80">
                        {formatDate({
                          date: oldPost.updatedAt,
                          template: 'DD [de] MMMM [de] YYYY'
                        })}
                      </p>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        )}
      </article>
    </main>
  )
}
