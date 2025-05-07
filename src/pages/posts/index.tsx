import { useGetAllPostsQuery } from "../../app/services/postsApi"
import { Card } from "../../components/card"
import { CreatePost } from "../../components/create-post"

export const Posts = () => {
  const { data } = useGetAllPostsQuery()

  return (
    <div className="mb-10 w-full">
      <CreatePost />

      {data && data.length > 0
        ? data.map(
            ({
              content,
              author,
              id,
              authorId,
              comments,
              likes,
              likedByUser,
              createdAt,
            }) => (
              <Card
                key={id}
                avatarUrl={author.avatarUrl ?? ""}
                content={content}
                name={author.name ?? ""}
                commentsCount={comments.length}
                likesCount={likes.length} 
                authorId={authorId}
                id={id}
                likedByUser={likedByUser}
                createdAt={createdAt}
                cardFor="post"
              />
            ),
          )
        : null}
    </div>
  )
}
