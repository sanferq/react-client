import { useSelector } from "react-redux"
import { selectCurrent } from "../../features/user/userSlice"
import { NavButton } from "../nav-button"
import { Image } from "@heroui/react"
import { BASE_URL } from "../../constants"

export const Profile = () => {
  const current = useSelector(selectCurrent)

  if (!current) {
    return null
  }

  return (
    <NavButton
      href={`/users/${current.id}`}
      icon={
        <Image
          alt="User avatar"
          className="object-cover rounded-full w-8 h-8"
          src={`${BASE_URL}${current.avatarUrl}`}
          width={32}
          height={32}
        />
      }
    >
      {current.name}
    </NavButton>
  )
}
