export default function BriefcaseIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
      <rect
        x="32"
        y="128"
        width="448"
        height="320"
        rx="48"
        ry="48"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="32"
      />
      <path
        d="M144 128V96a32 32 0 0132-32h160a32 32 0 0132 32v32m112 112H32m288 0v24a8 8 0 01-8 8H200a8 8 0 01-8-8v-24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
    </svg>
  )
}
