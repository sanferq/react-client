import { useEffect, useState } from "react"
import { FaArrowUp } from "react-icons/fa"
import { Button } from "@heroui/react"

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return isVisible ? (
    <Button
      isIconOnly
      aria-label="Наверх"
      className="fixed bottom-5 right-5 z-50 shadow-lg"
      color="default"
      onPress={scrollToTop}
    >
      <FaArrowUp size={20} />
    </Button>
  ) : null
}
