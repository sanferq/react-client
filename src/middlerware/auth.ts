import { createListenerMiddleware } from "@reduxjs/toolkit"
import { userApi } from "../app/services/userApi"

export const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
  matcher: userApi.endpoints.login.matchFulfilled,
  effect: async (activeAnimations, listenerApi) => {
    listenerApi.cancelActiveListeners()

    if (activeAnimations.payload.token) {
      localStorage.setItem("token", activeAnimations.payload.token)
    }
  },
})
