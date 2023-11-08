import { Code, type Extension } from 'bright'
import { CollapseAnnotation } from './collapse'
import { Copy } from './copy'
import { Title } from './title-bar'
import clsx from 'clsx'

export const collapse: Extension = {
  name: 'collapse',
  MultilineAnnotation: ({ children, query }) => (
    <CollapseAnnotation query={query!}>{children}</CollapseAnnotation>
  )
}

export const highlight: Extension = {
  name: 'highlight',
  MultilineAnnotation: props => {
    return (
      <span className="block !bg-[#00000005] shadow-mark [box-shadow:inset_2px_0_0_0_var(--tw-shadow-color)] dark:!bg-[#FFFFFF05]">
        {props.children}
      </span>
    )
  },
  InlineAnnotation: ({ children }) => {
    return <span className="bg-mark [&_span]:!text-black/92">{children}</span>
  }
}

export const focus: Extension = {
  name: 'focus',
  MultilineAnnotation: ({ children }) => (
    <div style={{ filter: 'opacity(0.2)' }}>{children}</div>
  ),
  InlineAnnotation: ({ children }) => (
    <span style={{ filter: 'opacity(0.2)' }}>{children}</span>
  ),
  beforeHighlight: (props, focusAnnotations) => {
    if (focusAnnotations.length === 0) return props

    const lineCount = props.code.split('\n').length

    const ranges = focusAnnotations.flatMap(a => a.ranges)

    let newRanges: (
      | {
          fromLineNumber: number
          toLineNumber: number
        }
      | {
          lineNumber: number
          fromColumn: number
          toColumn: number
        }
    )[] = [{ fromLineNumber: 1, toLineNumber: lineCount }]

    for (const range of ranges) {
      newRanges = newRanges.flatMap(r => {
        if ('fromLineNumber' in r && 'fromLineNumber' in range) {
          if (
            r.fromLineNumber > range.toLineNumber ||
            r.toLineNumber < range.fromLineNumber
          )
            return [r]

          if (
            r.fromLineNumber >= range.fromLineNumber &&
            r.toLineNumber <= range.toLineNumber
          )
            return []

          if (
            r.fromLineNumber < range.fromLineNumber &&
            r.toLineNumber > range.toLineNumber
          )
            return [
              {
                fromLineNumber: r.fromLineNumber,
                toLineNumber: range.fromLineNumber - 1
              },
              {
                fromLineNumber: range.toLineNumber + 1,
                toLineNumber: r.toLineNumber
              }
            ]

          if (r.fromLineNumber < range.fromLineNumber)
            return [
              {
                fromLineNumber: r.fromLineNumber,
                toLineNumber: range.fromLineNumber - 1
              }
            ]

          if (r.toLineNumber > range.toLineNumber)
            return [
              {
                fromLineNumber: range.toLineNumber + 1,
                toLineNumber: r.toLineNumber
              }
            ]
        }

        if ('fromLineNumber' in r && 'lineNumber' in range) {
          const line = props.code.split('\n')[range.lineNumber]

          if (
            r.fromLineNumber > range.lineNumber ||
            r.toLineNumber < range.lineNumber
          )
            return [r]

          if (
            r.fromLineNumber >= range.lineNumber &&
            r.toLineNumber <= range.lineNumber
          )
            return []

          if (
            r.fromLineNumber < range.lineNumber &&
            r.toLineNumber > range.lineNumber
          )
            return [
              {
                fromLineNumber: r.fromLineNumber,
                toLineNumber: range.lineNumber - 1
              },
              {
                lineNumber: range.lineNumber,
                fromColumn: 1,
                toColumn: range.fromColumn - 1
              },
              {
                lineNumber: range.lineNumber,
                fromColumn: range.toColumn + 1,
                toColumn: line.length
              },
              {
                fromLineNumber: range.lineNumber + 1,
                toLineNumber: lineCount
              }
            ]

          if (r.fromLineNumber < range.lineNumber)
            return [
              {
                fromLineNumber: r.fromLineNumber,
                toLineNumber: range.lineNumber - 1
              }
            ]

          if (
            r.fromLineNumber === range.lineNumber &&
            r.toLineNumber > range.lineNumber
          )
            return [
              {
                lineNumber: range.lineNumber,
                fromColumn: 1,
                toColumn: range.fromColumn - 1
              },
              {
                lineNumber: range.lineNumber,
                fromColumn: range.toColumn + 1,
                toColumn: line.length
              },
              {
                fromLineNumber: range.lineNumber + 1,
                toLineNumber: lineCount
              }
            ]
        }

        if ('lineNumber' in r && 'lineNumber' in range) {
          if (
            r.lineNumber === range.lineNumber &&
            r.toColumn < range.fromColumn
          )
            return [r]

          if (
            r.lineNumber === range.lineNumber &&
            r.toColumn > range.fromColumn
          )
            return [
              {
                lineNumber: range.lineNumber,
                fromColumn: r.fromColumn,
                toColumn: range.fromColumn - 1
              },
              {
                lineNumber: range.lineNumber,
                fromColumn: range.toColumn + 1,
                toColumn: r.toColumn
              }
            ]

          if (r.lineNumber < range.lineNumber) return [r]
        }

        return [r]
      })
    }

    const newAnnotations = props.annotations.filter(a => a.name !== 'focus')
    newAnnotations.push({
      name: 'focus',
      ranges: newRanges
    })
    return { ...props, annotations: newAnnotations }
  }
}

export const titleBar = {
  name: 'titleBar',
  TitleBarContent: Title
}

export const copy: Extension = {
  name: 'copy',
  Root: ({ ...props }) => {
    const NewRoot = Code.Root as unknown as any
    return (
      <>
        {!props.title && props.mode !== 'dark' && (
          <Copy
            classNames={clsx(
              'absolute right-[30px] top-[10px] md:right-[46px]'
            )}
            code={props.code}
          />
        )}
        <NewRoot {...props} />
      </>
    )
  }
}
