import { Code, type Extension } from 'bright'
import { TabsContent, TabsList, TabsRoot } from './tab-panels'

export const title: Extension = {
  name: 'title',
  beforeHighlight: (props, annotations) => {
    if (annotations.length > 0) {
      return { ...props, title: annotations[0].query }
    }
  }
}

export const tabs: Extension = {
  name: 'tabs',
  Root: props => {
    const { subProps, title } = props

    const titles = subProps?.length
      ? subProps.map(subProp => subProp.title)
      : [title]

    const NewRoot = Code.Root as unknown as any
    return (
      <TabsRoot defaultValue={titles[0]}>
        <NewRoot {...props} />
      </TabsRoot>
    )
  },
  TitleBarContent: props => {
    const { subProps, title, code } = props

    const panels = subProps?.length
      ? subProps.map(subProp => subProp.title)
      : [title]
    const codes = subProps?.length ? subProps?.map(sub => sub.code) : [code]
    const childProps = subProps?.length ? subProps : [props]

    return (
      <>
        <TabsList panels={panels} codes={codes}>
          {panels.map((panel, i) => (
            <span key={panel}>{childProps[i].title}</span>
          ))}
        </TabsList>
      </>
    )
  },
  Pre: props => {
    const { subProps } = props
    const propsList = subProps?.length ? subProps : [props]

    const NewPre = Code.Pre as unknown as any
    return (
      <>
        {propsList.map(props => (
          <TabsContent key={props.title} value={props.title!}>
            <NewPre {...props} />
          </TabsContent>
        ))}
      </>
    )
  }
}
