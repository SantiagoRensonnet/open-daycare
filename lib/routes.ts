export const routes = {
  home: "/",
  postNew: "/posts/new",
  children: "/children",
  notifications: "/notifications",
  account: "/account",
  login: "/login",
  postDetail: (id: string) => `/posts/${id}`,
  postEdit: (id: string) => `/posts/${id}/edit`,
  postPhoto: (id: string) => `/posts/${id}/photo`,
} as const;
