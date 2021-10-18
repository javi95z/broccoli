import { toast as toastify } from "react-toastify"

const toast = (message, className) => {
  toastify.dark(message, { className })
}

export default toast
