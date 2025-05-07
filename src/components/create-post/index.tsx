import { Controller, useForm } from "react-hook-form"
import {
  useCreatePostMutation,
  useLazyGetAllPostsQuery,
} from "../../app/services/postsApi"
import { Button, Textarea } from "@heroui/react"
import { ErrorMessage } from "../error-message"
import { IoMdCreate } from "react-icons/io"

export const CreatePost = () => {
  const [createPost] = useCreatePostMutation()
  const [triggerAllPosts] = useLazyGetAllPostsQuery()

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm()

  const error = errors?.post?.message as string

  const onSubmit = handleSubmit(async data => {
    try {
      await createPost({ content: data.post }).unwrap()
      setValue("post", "")
      await triggerAllPosts().unwrap()
    } catch (error) {
      console.error("Ошибка при создании поста:", error)
    }
  })

  return (
    <form className="flex-grow" onSubmit={onSubmit}>
      <Controller
        name="post"
        control={control}
        defaultValue=""
        rules={{
          required: "Обязательное поле",
        }}
        render={({ field }) => (
          <Textarea
            {...field}
            labelPlacement="outside"
            placeholder="О чем думайте?🤔"
            className="mb-5"
          />
        )}
      />
      {errors && <ErrorMessage error={error} />}
      <Button
        color="secondary"
        className="flex-end mb-5"
        endContent={<IoMdCreate />}
        type="submit"
      >
        Добавить пост
      </Button>
    </form>
  )
}
