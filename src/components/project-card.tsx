import Link from 'next/link'
import clsx from 'clsx'
import { VideoPlayer } from './video-player'
import { Badge } from './badge'
import { GithubIcon } from './icons/github'
import { PublicIcon } from './icons/public'

type Project = {
  id: string
  title: string
  description: string
  publicationDate: string
  github: string
  web: string
  video: {
    id: string
    fileName: string
    mimeType: string
    url: string
  }
  tags: {
    id: string
    name: string
  }[]
}

interface IProjectCard {
  project: Project
}
export function ProjectCard({ project }: IProjectCard) {
  return (
    <div
      className={clsx(
        'bg-light shadow-base-wh dark:bg-dark dark:shadow-base-bk',
        'duration-300 ease-out-quart [transition-property:box-shadow]',
        'focus-within:shadow-lg-wh hover:shadow-lg-wh dark:focus-within:shadow-lg-bk dark:hover:shadow-lg-bk'
      )}
    >
      <VideoPlayer video={project.video} title={project.title} />

      <div className="flex flex-col gap-4 p-4 md:p-8">
        <div>
          <h2 className="text-xl font-bold">{project.title}</h2>

          <p className="text-sm text-black/80 first-letter:capitalize dark:text-white/80">
            <time>{project.publicationDate}</time>
          </p>
        </div>

        <p>{project.description}</p>

        <div className="flex gap-8">
          <Link
            className={clsx(
              'relative flex h-10 w-10 items-center justify-center p-2',
              'outline-2 outline-offset-2 outline-black/92 focus-visible:outline dark:outline-white/92',
              'duration-300 ease-out-quart [transition-property:background]',
              'hover:bg-black/8 focus-visible:bg-black/8 active:bg-black/16 dark:hover:bg-white/8 dark:focus-visible:bg-white/8 dark:active:bg-white/16'
            )}
            aria-label={`Repositório do projeto ${project.title}`}
            href={project.github}
            target="_blank"
          >
            <GithubIcon className="h-6 w-6 fill-black/92 dark:fill-white/92" />
          </Link>
          {project.web && (
            <Link
              className={clsx(
                'relative flex h-10 w-10 items-center justify-center p-2',
                'outline-2 outline-offset-2 outline-black/92 focus-visible:outline dark:outline-white/92',
                'duration-300 ease-out-quart [transition-property:background]',
                'hover:bg-black/8 focus-visible:bg-black/8 active:bg-black/16 dark:hover:bg-white/8 dark:focus-visible:bg-white/8 dark:active:bg-white/16'
              )}
              aria-label={`Website do projeto ${project.title}`}
              href={project.web}
              target="_blank"
            >
              <PublicIcon className="h-6 w-6 fill-black/92 dark:fill-white/92" />
            </Link>
          )}
        </div>

        <ul className="flex flex-wrap gap-4">
          {project.tags.map(t => {
            return (
              <li key={t.id}>
                <Badge label={t.name} />
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
