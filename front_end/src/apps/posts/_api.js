import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// https://9dv4p-4001.sse.codesandbox.io/api/comments-per-user
export const postsApi = createApi({
  reducerPath: "posts",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://9dv4p-4001.sse.codesandbox.io/api"
  }),
  tagTypes: ["posts"],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "public-posts-some-comments/",
      providesTags: ({ data }) =>
        data
          ? [
              ...data.map(({ id, type, attributes }) => ({ type: type, id })),
              { type: data.type, id: "LIST" }
            ]
          : [{ type: data.type, id: "LIST" }]
    }),
    getPost: builder.query({
      query: (id) => `posts/${id}/`,
      providesTags: (result, error, id) => [{ type: "Posts", id }]
    }),
    addPost: builder.mutation({
      query(body) {
        return {
          url: `posts/`,
          method: "POST",
          body
        };
      },
      invalidatesTags: [{ type: "Posts", id: "LIST" }]
    }),
    editPost: builder.mutation({
      query(data) {
        const { id, body } = data;
        return {
          url: `posts/${id}/`,
          method: "PUT",
          body: body
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Posts", id }]
    }),
    deletePost: builder.mutation({
      query(id) {
        return {
          url: `posts/${id}/`,
          method: "DELETE"
        };
      },
      invalidatesTags: (result, error, id) => [{ type: "Posts", id }]
    })
  })
});

export const {
  useGetPostQuery,
  useGetPostsQuery,
  useAddPostMutation,
  useEditPostMutation,
  useDeletePostMutation
} = postsApi;