import { Metadata, ResolvingMetadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import { serialize } from 'next-mdx-remote/serialize'
import { remarkCodeHike } from '@code-hike/mdx'
import request, { gql } from 'graphql-request'
import { Markdown } from '@/components/markdown'
import { CameraIcon } from '@/components/icons/camera'
import { TimerIcon } from '@/components/icons/timer'
import { Hyperlink } from '@/components/hyperlink'
import { formatDate, formatTimeToX } from '@/utils/date'
import { urlToBaseURL } from '@/utils/toBase64'
import { Comment } from '@/components/comment'
import { Badge } from '@/components/badge'

type Props = {
  params: { slug: string }
  // searchParams: { [key: string]: string | string[] | undefined }
}

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const endpoint = process.env.CMS_HYGRAPH ?? ''

  const query = gql`
    query GetPosts {
      posts(stage: PUBLISHED) {
        slug
      }
    }
  `

  const data: {
    posts: { slug: string }[]
  } = await request(endpoint, query)

  return data.posts.map(post => ({
    slug: post.slug
  }))
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = params

  const endpoint = process.env.CMS_HYGRAPH ?? ''

  const query = gql`
    query GetSEO($slug: String!) {
      post(stage: PUBLISHED, where: { slug: $slug }) {
        createdAt
        createdBy {
          name
        }
        updatedAt
        seo {
          title
          description
          keywords
          noIndex
          image {
            fileName
            url
          }
        }
      }
    }
  `

  const variables = {
    slug
  }

  const data: {
    post: {
      createdAt: string
      createdBy: {
        name: string
      }
      updatedAt: string
      seo: {
        title: string
        description: string
        keywords: string[]
        noIndex: boolean
        image: {
          url: string
          fileName: string
        }
      }
    }
  } = await request(endpoint, query, variables)

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: `${data.post.seo.title} | Diego Gonçalves`,
    description: data.post.seo.description,
    keywords: data.post.seo.keywords,
    robots: {
      index: !data.post.seo.noIndex
    },
    openGraph: {
      title: data.post.seo.title,
      description: data.post.seo.description,
      type: 'article',
      authors: data.post.createdBy.name,
      publishedTime: data.post.createdAt,
      modifiedTime: data.post.updatedAt,
      siteName: 'Diego Gonçalves',
      url: `${process.env.DOMAIN}/artigo/${slug}`,
      images: [data.post.seo.image.url, ...previousImages]
    }
  }
}

async function getPost({ slug }: { slug: string }) {
  const endpoint = process.env.CMS_HYGRAPH ?? ''

  const query = gql`
    query GetPost($slug: String!) {
      post(stage: PUBLISHED, where: { slug: $slug }) {
        id
        title
        cover {
          id
          description
          photographer
          contact
          picture {
            url
            placeholder: url(
              transformation: {
                image: { resize: { height: 10, width: 10, fit: clip } }
              }
            )
            mimeType
          }
        }
        publishedAt
        createdAt
        updatedAt
        authors {
          id
          name
          email
        }
        content
        tags {
          id
          name
        }
      }
    }
  `

  const variables = {
    slug
  }

  const data: {
    post: {
      id: string
      title: string
      cover: {
        id: string
        description?: string
        photographer: string
        contact: string
        picture: {
          url: string
          placeholder: string
          mimeType: string
        }
      }
      createdAt: string
      publishedAt: string
      updatedAt: string
      authors: {
        id: string
        name: string
        email: string
      }[]
      content: string
      tags: {
        id: string
        name: string
      }[]
    }
  } = await request(endpoint, query, variables)

  return {
    id: data.post.id,
    title: data.post.title,
    cover: {
      ...data.post.cover,
      picture: {
        url: data.post.cover.picture.url,
        placeholder: await urlToBaseURL(
          data.post.cover.picture.placeholder,
          data.post.cover.picture.mimeType
        )
      }
    },
    createdAt: data.post.createdAt,
    publishedAt: data.post.publishedAt,
    updatedAt: data.post.updatedAt,
    authors: data.post.authors,
    tags: data.post.tags,
    content: data.post.content
  }
}

async function serializeMDX({ content }: { content: string }) {
  const serialized = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [
        [
          remarkCodeHike,
          {
            lineNumbers: true,
            showCopyButton: true,
            autoImport: false,
            theme: 'material-from-css'
          }
        ]
      ],
      useDynamicImport: true
    }
  })
  return serialized
}

async function getPreviousNextPosts({ id }: { id: string }) {
  const endpoint = process.env.CMS_HYGRAPH ?? ''

  const query = gql`
    query getBeforePostAfter($id: ID, $before: String, $after: String) {
      post(stage: PUBLISHED, where: { id: $id }) {
        slug
        title
      }
      beforePost: posts(stage: PUBLISHED, last: 1, before: $before) {
        slug
        title
      }
      afterPost: posts(stage: PUBLISHED, first: 1, after: $after) {
        slug
        title
      }
    }
  `

  const variables = {
    id,
    before: id,
    after: id
  }

  const data: {
    beforePost: {
      slug: string
      title: string
    }[]
    afterPost: {
      slug: string
      title: string
    }[]
  } = await request(endpoint, query, variables)

  return {
    before: data.beforePost[0],
    after: data.afterPost[0]
  }
}

function readingTime({ content }: { content: string }) {
  const wordsPerMinute = 200
  const regex = /\w+/g
  const codeBlockRegex = /`{3}[\w\W]*?`{3}/gm
  const totalWords = content.match(regex)?.length ?? 0
  const totalCodeBlocks = content.match(codeBlockRegex)

  const wordsInCodeBlocks =
    totalCodeBlocks?.reduce((accumulator, currentValue) => {
      const wordCount = currentValue.match(regex)?.length ?? 0
      return accumulator + wordCount
    }, 0) ?? 0

  const time = Math.ceil((totalWords - wordsInCodeBlocks) / wordsPerMinute)

  return {
    time
  }
}

// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default async function Post({ params }: Props) {
  const { slug } = params
  const {
    id,
    title,
    cover,
    createdAt,
    publishedAt,
    updatedAt,
    authors,
    tags,
    content
  } = await getPost({ slug })

  const serialized = await serializeMDX({ content })

  const { before, after } = await getPreviousNextPosts({ id })

  const { time } = readingTime({ content })

  return (
    <main>
      <article className="bg-light text-black/92 dark:bg-dark dark:text-white/92">
        <header className="mx-auto mb-8 mt-8 max-w-4xl md:px-16">
          <figure>
            <div className="relative h-36 w-full sm:h-72">
              <Image
                src={cover.picture.url}
                alt={cover.description ?? ''}
                className="object-cover"
                fill
                placeholder="blur"
                blurDataURL={cover.picture.placeholder}
              />
            </div>
            {(cover.description || cover.photographer) && (
              <figcaption className="flex flex-wrap items-start px-4 py-1 md:px-0">
                <CameraIcon className="mr-2 hidden h-6 w-6 flex-none fill-black/16 align-text-top dark:fill-white/16 sm:inline" />
                <p className="text-sm">{cover.description}</p>
                {cover.description && cover.photographer && (
                  <p className="text-sm">&nbsp;--&nbsp;</p>
                )}
                {cover.photographer && <p className="text-sm">Foto:&nbsp;</p>}
                {cover.photographer &&
                  (cover.contact ? (
                    <Hyperlink
                      external
                      href={cover.contact}
                      className="text-sm"
                    >
                      {cover.photographer}
                    </Hyperlink>
                  ) : (
                    <p className="text-sm">{cover.photographer}</p>
                  ))}
              </figcaption>
            )}
          </figure>

          <div className="px-4 md:px-0">
            <h1 className="mb-4 mt-8 font-sans text-3xl font-bold">{title}</h1>
            <div>
              <p>
                Por{' '}
                {authors.map((author, index) => {
                  return (
                    <>
                      {index === authors.length - 1 && index !== 0 && (
                        <span> e </span>
                      )}
                      <span key={author.id}>{author.name}</span>
                      {index < authors.length - 2 && <span>, </span>}
                      {index === authors.length - 1 && <span>.</span>}
                    </>
                  )
                })}
              </p>

              <div className="flex flex-col md:flex-row">
                <span className="first-letter:capitalize">
                  <time>
                    {formatDate({
                      date: createdAt,
                      template:
                        'dddd, DD [de] MMMM [de] YYYY [-] hh[:]mm[:]ss a'
                    })}
                  </time>
                </span>

                <div className={clsx(updatedAt ? 'block' : 'hidden')}>
                  <span className="hidden md:inline">&nbsp;| &nbsp;</span>
                  <span>Atualizado&nbsp;</span>
                  <span>
                    <time>
                      {formatTimeToX({
                        previousDate: createdAt,
                        lastDate: updatedAt
                      })}
                    </time>
                  </span>
                </div>
              </div>

              <div className="flex items-center">
                <TimerIcon className="inline h-6 w-6 flex-none fill-black/16 align-text-top dark:fill-white/16" />
                &nbsp;
                <p>{time} minuto(s)</p>
              </div>
            </div>
          </div>

          <ul className="mt-3 flex flex-wrap gap-4">
            {tags.map(t => {
              return (
                <li key={t.id}>
                  <Badge label={t.name} />
                </li>
              )
            })}
          </ul>
        </header>

        <Markdown source={serialized} />

        <nav className="mx-auto my-12 max-w-4xl px-4 md:px-8">
          <ul
            className={clsx(
              'grid grid-rows-2 gap-4 md:grid-cols-2 md:grid-rows-1',
              !(before && after) && 'grid-rows-1'
            )}
          >
            {before && (
              <li className="group flex h-fit flex-1">
                <Link
                  href={`${before.slug}`}
                  className={clsx(
                    'group grid flex-1 items-start gap-4 p-4 [grid-template-columns:min-content_1fr] [grid-template-rows:min-content_1fr]',
                    'outline-2 outline-offset-2 outline-black/92 focus-visible:outline dark:outline-white/92',
                    'duration-300 ease-out-quart [transition-property:background]',
                    'focus-visible:bg-black/8 group-hover:bg-black/8 group-active:bg-black/16 dark:focus-visible:bg-white/8 dark:group-hover:bg-white/8 dark:group-active:bg-white/16'
                  )}
                  aria-label={`Ir para a publicação anterior: ${before.title}`}
                >
                  <div className="justify-self-start p-2">
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 256 256"
                    >
                      <rect width="256" height="256" fill="none" />
                      <polyline
                        points="160 208 80 128 160 48"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="16"
                      />
                    </svg>
                  </div>
                  <p className="my-auto">Publicação anterior</p>
                  <p className="col-start-2 font-medium">{before.title}</p>
                </Link>
              </li>
            )}
            {after && (
              <li className="group flex h-fit flex-1 md:col-start-2">
                <Link
                  href={`${after.slug}`}
                  className={clsx(
                    'group grid flex-1 items-start gap-4 p-4 text-right [grid-template-rows:min-content_1fr] [grid-template-columns:1fr_min-content] sm:p-4',
                    'outline-2 outline-offset-2 outline-black/92 focus-visible:outline dark:outline-white/92',
                    'duration-300 ease-out-quart [transition-property:background]',
                    'focus-visible:bg-black/8 group-hover:bg-black/8 group-active:bg-black/16 dark:focus-visible:bg-white/8 dark:group-hover:bg-white/8 dark:group-active:bg-white/16'
                  )}
                  aria-label={`Ir para a próxima publicação: ${after.title}`}
                >
                  <p className="my-auto">Próxima publicação</p>
                  <div className="justify-self-end p-2">
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 256 256"
                    >
                      <rect width="256" height="256" fill="none" />
                      <polyline
                        points="96 48 176 128 96 208"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="16"
                      />
                    </svg>
                  </div>
                  <p className="font-medium">{after.title}</p>
                </Link>
              </li>
            )}
          </ul>
        </nav>

        <div className="mx-auto my-12 flex max-w-4xl px-4 md:px-8">
          <Comment />
        </div>
      </article>
    </main>
  )
}
