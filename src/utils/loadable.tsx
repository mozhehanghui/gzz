import { LoadingOutlined } from '@ant-design/icons'
import React, { lazy, Suspense } from 'react'
type Unpromisify<T> = T extends Promise<infer P> ? P : never

interface Args {
  fallback: React.ReactNode
}

export const lazyLoad = <
  T extends Promise<any>,
  K extends React.ComponentType<any>,
>(
  importFunc: () => T,
  selectorFunc?: (s: Unpromisify<T>) => K,

  args: Args = { fallback: null },
) => {
  let lazyFactory: () => Promise<{ default: K }> = importFunc

  if (selectorFunc) {
    lazyFactory = () =>
      importFunc().then(module => ({
        default: selectorFunc(module),
      }))
  }

  const LazyComponent = lazy(lazyFactory)

  return (props: React.ComponentProps<K>): JSX.Element => (
    <Suspense fallback={args.fallback!}>
      <LazyComponent {...props} />
    </Suspense>
  )
}

export const defaultLazyLoad = <
  T extends Promise<any>,
  K extends React.ComponentType<any>,
>(
  importFunc: () => T,
  selectorFunc?: (s: Unpromisify<T>) => K,

  args: Args = { fallback: <LoadingOutlined /> },
) => {
  return lazyLoad(importFunc, selectorFunc, args)
}
