import React from 'react'

export interface ITaiItem {
  title: string
  description: string
  actions: React.ReactNode
  footers?: React.ReactNode
  clickHandle?: (values: any) => void
}
