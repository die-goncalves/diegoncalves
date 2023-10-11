import { Metadata } from 'next'
import { ProjectCard } from '@/components/project-card'
import { request, gql } from 'graphql-request'
import { formatDate } from '@/utils/date'

export const metadata: Metadata = {
  title: 'Projetos | Diego Gonçalves'
}

type ProjectResponse = {
  projects: {
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
  }[]
}

async function getProjects() {
  const endpoint = process.env.CMS_HYGRAPH ?? ''

  const query = gql`
    query GetProjects {
      projects(stage: PUBLISHED) {
        id
        title
        description
        publicationDate
        github
        web
        video {
          id
          fileName
          mimeType
          url
        }
        tags {
          id
          name
        }
      }
    }
  `

  const data: ProjectResponse = await request(endpoint, query)

  const projects = data.projects.map(project => {
    return {
      id: project.id,
      title: project.title,
      description: project.description,
      publicationDate: formatDate({
        date: project.publicationDate,
        template: 'dddd, DD [de] MMMM [de] YYYY [-] hh[:]mm[:]ss a'
      }),
      github: project.github,
      web: project.web,
      tags: project.tags,
      video: project.video
    }
  })

  return projects
}

export default async function ProjectPage() {
  const projects = await getProjects()

  return (
    <main>
      <article className="mx-auto min-h-[calc(100vh-(88px+139px))] max-w-4xl px-4 py-8 md:min-h-[calc(100vh-(88px+88px))] md:px-8">
        <h1 className="mb-8 text-center text-2xl font-bold">Projetos</h1>

        <ul>
          {projects.map(p => {
            return (
              <li key={p.id} className="[&+li]:mt-4 md:[&+li]:mt-8">
                <ProjectCard project={p} />
              </li>
            )
          })}
        </ul>
      </article>
    </main>
  )
}
