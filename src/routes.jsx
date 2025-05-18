import { Posts } from "./components/posts/posts.jsx";
import { FeedPage } from "./pages/feed/feed.jsx";
import { NotFoundPage } from "./pages/NotFound/notFound.jsx";
import {HomePage} from './pages/home/home.jsx'

export const routes = [
  {
    path: '/feed',
    element: <FeedPage />,
    children: [
      {
        index: true,
        element: <p>Bienvenido al feed, selecciona una opción</p>
      },
      {
        path: 'posts',
        element: <Posts />
      }
    ]
  },
  {
    path: '*',
    element: <NotFoundPage />
  },
  {path: '/',
    element: <HomePage/>
  }
]
