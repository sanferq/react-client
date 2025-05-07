import { useSelector } from "react-redux"
import { selectCurrent } from "../../features/user/userSlice"
import { BsPostcard } from "react-icons/bs"
import { FiUsers } from "react-icons/fi"
import { FaUsers } from "react-icons/fa"
import { NavButton } from "../nav-button"
import { Profile } from "../profile"
import { CompactCountInfo } from "../compact-count-info"

export const Navbar = () => {
  const currentUser = useSelector(selectCurrent)

  if (!currentUser) {
    return null
  }

  return (
    <nav>
      <ul className="flex flex-col gap-3">
        <li className="mb-1">
          <Profile />
        </li>

        <li>
          <NavButton href="/" icon={<BsPostcard />}>
            Посты
          </NavButton>
        </li>

        <li>
          <NavButton href="following" icon={<FiUsers />}>
            Подписки
            <CompactCountInfo count={currentUser.following?.length || 0} />
          </NavButton>
        </li>

        <li>
          <NavButton href="followers" icon={<FaUsers />}>
            Подписчики
            <CompactCountInfo count={currentUser.followers?.length || 0} />
          </NavButton>
        </li>
      </ul>
    </nav>
  )
}
