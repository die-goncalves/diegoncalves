'use client'

import Giscus from '@giscus/react'
import { useTheme } from 'next-themes'

export function Comment() {
  const { theme } = useTheme()

  return (
    <Giscus
      repo={
        (process.env.NEXT_PUBLIC_GISCUS_REPO as `${string}/${string}`) ?? '/'
      }
      repoId={process.env.NEXT_PUBLIC_GISCUS_REPO_ID ?? ''}
      category={process.env.NEXT_PUBLIC_GISCUS_CATEGORY}
      categoryId={process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID}
      mapping="og:title"
      strict="1"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={theme === 'dark' ? 'noborder_dark' : 'noborder_light'}
      lang="pt"
      loading="lazy"
    />
  )
}
