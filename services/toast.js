import { toast as toastify } from "react-toastify"

export const toast = (message, className) => {
  if (!message) return
  toastify.dark(message, { className })
}

export const success = message => {
  if (!message) return
  toastify.dark(message, { className: "success" })
}

export const error = message => {
  if (!message) return
  toastify.dark(message, { className: "error" })
}

export const clear = () => {
  toastify.dismiss()
}
