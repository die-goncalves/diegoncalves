import { Fragment } from 'react'
import Image, { ImageProps } from 'next/image'
import { CameraIcon } from './icons/camera'
import { Hyperlink } from './hyperlink'

export type IPicture = ImageProps & {
  photographer?: string
  contact?: string
  fallback?: string
}
export async function Picture({
  photographer,
  contact,
  fallback,
  ...props
}: IPicture) {
  const { placeholder, blurDataURL, alt, src, ...rest } = props
  return (
    <Fragment>
      <div className="relative aspect-video w-full">
        <Image
          src={src}
          alt={alt ?? ''}
          fill
          className="object-cover"
          {...(fallback && {
            placeholder: 'blur',
            blurDataURL: fallback
          })}
          {...rest}
        />
      </div>
      {(alt || photographer) && (
        <div className="flex flex-wrap items-start px-4 py-1 md:px-0">
          <CameraIcon className="mr-2 hidden h-6 w-6 flex-none fill-black/16 align-text-top dark:fill-white/16 sm:inline" />
          <p className="text-sm">{alt}</p>
          {alt && photographer && <p className="text-sm">&nbsp;--&nbsp;</p>}
          {photographer && <p className="text-sm">Foto:&nbsp;</p>}
          {photographer &&
            (contact ? (
              <Hyperlink external href={contact} className="text-sm">
                {photographer}
              </Hyperlink>
            ) : (
              <p className="text-sm">{photographer}</p>
            ))}
        </div>
      )}
    </Fragment>
  )
}
