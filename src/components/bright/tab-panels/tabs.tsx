import { ReactNode } from 'react'
import { Code } from 'bright'
import { title, tabs } from './extension'
import { focus, highlight, collapse } from '../extension'

export function Tabs({ children }: { children: ReactNode }) {
  return (
    <Code extensions={[title, tabs, focus, highlight, collapse]}>
      {children}
    </Code>
  )
}
