import { toast as toastify } from "react-toastify"

export const toast = (message, className) => {
  toastify.dark(message, { className })
}

export const success = message => {
  toastify.dark(message, { className: "success" })
}

export const error = message => {
  toastify.dark(message, { className: "error" })
}
