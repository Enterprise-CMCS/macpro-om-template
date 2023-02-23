import {
  DefaultGenerics,
  Outlet,
  ReactLocation,
  Route,
  Router,
} from "@tanstack/react-location";
import * as Page from "./pages";
import { Header } from "./components";
import { useQueryClient } from "@tanstack/react-query";
import { getPosts } from "./hooks/queries/useGetPosts";
import { getPostById } from "./hooks/queries/useGetPostById";

const location = new ReactLocation();

export const AppRouter = () => {
  const queryClient = useQueryClient();

  const routes: Route<DefaultGenerics>[] = [
    {
      path: "/",
      element: <Page.Home />,
    },
    {
      path: "/posts",
      element: <Page.Posts />,
      loader: () =>
        queryClient.getQueryData(["posts"]) ??
        queryClient.fetchQuery(["posts"], getPosts),
      children: [
        {
          path: "/",
          element: <h1>Select a post</h1>,
        },
        {
          path: ":postId",
          loader: ({ params: { postId } }) =>
            queryClient.getQueryData(["posts", postId]) ??
            queryClient.fetchQuery(["posts", postId], () =>
              getPostById(postId)
            ),
          element: <Page.Post />,
        },
      ],
    },
  ];

  return (
    <>
      <Router location={location} routes={routes}>
        <Header />
        <Outlet />
      </Router>
    </>
  );
};
