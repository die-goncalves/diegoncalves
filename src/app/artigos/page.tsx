import { Metadata } from 'next'
import { request, gql } from 'graphql-request'
import { formatDate } from '@/utils/date'
import Link from 'next/link'
import clsx from 'clsx'
import { time } from '@/utils/reading-time'

export const metadata: Metadata = {
  title: 'Artigos | Diego Gonçalves'
}

type PostResponse = {
  posts: {
    id: string
    slug: string
    content: string
    title: string
    createdAt: string
    updatedAt: string
  }[]
}

async function getPosts() {
  const endpoint = process.env.CMS_HYGRAPH ?? ''

  const query = gql`
    query GetPosts {
      posts(stage: PUBLISHED, orderBy: createdAt_DESC) {
        id
        slug
        title
        content
        createdAt
        updatedAt
      }
    }
  `

  const data: PostResponse = await request(endpoint, query)

  const projects = data.posts.map(post => {
    return {
      id: post.id,
      slug: post.slug,
      title: post.title,
      createdAt: formatDate({
        date: post.createdAt,
        template: 'DD[/]MM[/]YYYY'
      }),
      updatedAt: formatDate({
        date: post.updatedAt,
        template: 'DD[/]MM[/]YYYY'
      }),
      time: time(post.content)
    }
  })

  return projects
}

export default async function PostsPage() {
  const posts = await getPosts()

  return (
    <main>
      <article className="mx-auto min-h-[calc(100vh-(88px+139px))] max-w-4xl px-4 py-8 md:min-h-[calc(100vh-(88px+88px))] md:px-8">
        <h1 className="mb-8 text-center text-2xl font-bold">Artigos</h1>

        <ul>
          {posts.map(p => {
            return (
              <li
                key={p.id}
                className="flex flex-col [&+li]:before:my-4 [&+li]:before:border-b-[1px] [&+li]:before:border-black/16 [&+li]:dark:before:border-white/16"
              >
                <Link
                  href={`artigo/${p.slug}`}
                  className={clsx(
                    'group flex flex-col py-2',
                    'outline-2 outline-offset-2 outline-black/92 focus-visible:outline dark:outline-white/92'
                  )}
                >
                  <p
                    className={clsx(
                      'underline decoration-solid decoration-auto underline-offset-2',
                      'font-medium text-light/link-primary group-visited:text-light/link-secondary dark:text-dark/link-primary dark:group-visited:text-dark/link-secondary',
                      'group-hover:no-underline group-focus-visible:no-underline'
                    )}
                  >
                    {p.title}
                  </p>
                  <div className="flex">
                    <p className="text-sm">{p.createdAt}</p>
                    <p className="mx-4 text-sm text-black/16 dark:text-white/16">
                      |
                    </p>
                    <p className="text-sm">{p.time} minuto de leitura</p>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </article>
    </main>
  )
}
