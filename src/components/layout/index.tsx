import { Header } from "../header"
import { Container } from "../container"
import { Navbar } from "../nav-bar"
import { Outlet, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectIsAuthenticated } from "../../features/user/userSlice"

import { ScrollToTopButton } from "../scroll-top"
import { useEffect } from "react"

export const Layout = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth")
    }
  }, [])

  return (
    <>
      <Header />
      <Container>
        <div className="flex-2 p-4">
          <Navbar />
        </div>
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </Container>
      <ScrollToTopButton />
    </>
  )
}
