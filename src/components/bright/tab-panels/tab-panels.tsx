'use client'

import React, { ComponentProps, ReactNode, useState } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { Copy } from '../copy'
import clsx from 'clsx'

type TabsRootProps = ComponentProps<typeof Tabs.Root>
export function TabsRoot({ children, defaultValue }: TabsRootProps) {
  return <Tabs.Root defaultValue={defaultValue}>{children}</Tabs.Root>
}

type TabsListProps = ComponentProps<typeof Tabs.List> & {
  panels: (string | undefined)[]
  codes: (string | undefined)[]
}
export function TabsList(props: TabsListProps) {
  const [activePanel, setActivePanel] = useState('')

  const tabs = React.Children.toArray(props.children)
  const filteredPanels = props.panels.filter(panel => panel) as string[]
  const filteredCodes = props.codes.filter(panel => panel) as string[]

  let codeId = filteredPanels.findIndex(panel => panel === activePanel)
  codeId = codeId < 0 ? 0 : codeId

  let code = filteredCodes[codeId]

  return (
    <Tabs.List className="flex w-full flex-wrap gap-x-4 bg-white dark:bg-[#0d1117] [&+div]:!h-0">
      {filteredPanels.map((panel, i) => {
        return (
          <Trigger key={panel} panel={panel} onActive={setActivePanel}>
            {tabs[i]}
          </Trigger>
        )
      })}

      <Copy classNames="ml-auto" code={code} />
    </Tabs.List>
  )
}

type TabsTriggerProps = ComponentProps<typeof Tabs.Trigger>
export function TabsTrigger(props: TabsTriggerProps) {
  return <Tabs.Trigger asChild {...props} />
}

type TabsContentProps = ComponentProps<typeof Tabs.Content>
export function TabsContent(props: TabsContentProps) {
  return <Tabs.Content className="outline-none" tabIndex={-1} {...props} />
}

function Trigger({
  panel,
  children,
  onActive
}: {
  panel: string
  children: ReactNode
  onActive: React.Dispatch<React.SetStateAction<string>>
}) {
  return (
    <Tabs.Trigger
      value={panel}
      title={panel}
      onFocus={() => onActive(panel)}
      className={clsx(
        'flex h-10 max-w-full items-center !border-2 !border-transparent outline-none ![padding:0_1em] focus:!border-brand data-[state=active]:!border-b-brand',
        '[&_span]:truncate [&_span]:break-keep',
        'duration-300 ease-out-quart [transition-property:background]',
        'hover:bg-black/8 focus-visible:bg-black/8 active:bg-black/16 dark:hover:bg-white/8 dark:focus-visible:bg-white/8 dark:active:bg-white/16'
      )}
    >
      {children}
    </Tabs.Trigger>
  )
}
