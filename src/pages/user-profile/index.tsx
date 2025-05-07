import { Button, Card, Image, useDisclosure } from "@heroui/react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { resetUser, selectCurrent } from "../../features/user/userSlice"
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "../../app/services/followsApi"
import {
  useGetUserByIdQuery,
  useLazyCurrentQuery,
  useLazyGetUserByIdQuery,
} from "../../app/services/userApi"
import { GoBack } from "../../components/go-back"
import { BASE_URL } from "../../constants"
import {
  MdOutlinePersonAddAlt1,
  MdOutlinePersonAddDisabled,
} from "react-icons/md"
import { CiEdit } from "react-icons/ci"
import { ProfileInfo } from "../../components/profile-info"
import { formatToClientDate } from "../../utils/format-to-client-date"
import { CountInfo } from "../../components/count-info"
import { EditProfile } from "../../components/edit-profile"

export const UserProfile = () => {
  const { id } = useParams<{ id: string }>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const currentUser = useSelector(selectCurrent)
  const { data, isLoading, error } = useGetUserByIdQuery(id ?? "")
  const [followUser] = useFollowUserMutation()
  const [unfollowUser] = useUnfollowUserMutation()
  const [triggerGetUserByIdQuery] = useLazyGetUserByIdQuery()
  const [triggerCurrentQuery] = useLazyCurrentQuery()

  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      dispatch(resetUser())
    }
  }, [dispatch])

  const handleFollow = async () => {
    try {
      if (!id) return

      if (data?.isFollowing) {
        await unfollowUser(id).unwrap()
      } else {
        await followUser({ followingId: id }).unwrap()
      }

      await triggerGetUserByIdQuery(id)
      await triggerCurrentQuery()
    } catch (error) {
      console.error("Follow error:", error)
    }
  }

  const handleClose = async () => {
    try {
      if (id) {
        await triggerGetUserByIdQuery(id)
        await triggerCurrentQuery()
      }
      onClose()
    } catch (err) {
      console.error("Close error:", err)
    }
  }

  if (isLoading) {
    return <div>Загрузка профиля...</div>
  }

  if (error) {
    return <div>Ошибка загрузки профиля</div>
  }

  if (!data) {
    return <div>Пользователь не найден</div>
  }

  return (
    <div className="p-4">
      <GoBack />
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <Card className="flex flex-col items-center text-center space-y-4 p-5 w-full md:w-auto">
          <div className="relative">
            <Image
              src={`${BASE_URL}${data.avatarUrl}`}
              alt={data.name}
              width={200}
              height={200}
              className="border-4 border-white rounded-full"
              isBlurred
            />
          </div>
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-2xl font-bold">{data.name}</h1>
            {currentUser?.id !== id ? (
              <Button
                color={data.isFollowing ? "default" : "primary"}
                variant="flat"
                className="gap-2"
                onPress={handleFollow}
                isLoading={isLoading}
                endContent={
                  data.isFollowing ? (
                    <MdOutlinePersonAddDisabled />
                  ) : (
                    <MdOutlinePersonAddAlt1 />
                  )
                }
              >
                {data.isFollowing ? "Отписаться" : "Подписаться"}
              </Button>
            ) : (
              <Button
                color="primary"
                variant="flat"
                endContent={<CiEdit />}
                onPress={onOpen}
              >
                Редактировать
              </Button>
            )}
          </div>
        </Card>

        <Card className="flex-1 p-5 space-y-4">
          <div className="space-y-4">
            <ProfileInfo title="Почта:" info={data.email} />
            <ProfileInfo title="Местоположение:" info={data.location} />
            <ProfileInfo
              title="Дата рождения:"
              info={formatToClientDate(data.dateOfBirth)}
            />
            <ProfileInfo title="Обо мне:" info={data.bio} />
          </div>

          <div className="flex gap-4 mt-4">
            <CountInfo count={data.followers.length} title="Подписчики" />
            <CountInfo count={data.following.length} title="Подписки" />
          </div>
        </Card>
      </div>

      <EditProfile isOpen={isOpen} onClose={handleClose} user={data} />
    </div>
  )
}
