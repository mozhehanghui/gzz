import { useRoutes } from 'react-router-dom'
import { routerConfig } from 'routes'

export default function App() {
  const routeList = useRoutes(routerConfig)
  return routeList
}
