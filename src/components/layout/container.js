// import { useSelector } from "react-redux"
import { Footer, Header } from "./"
// import Loader from "../loader"

export default function Container({ children }) {
  // const { isLoading } = useSelector(state => state.global)

  return (
    <main>
      <div className="min-h-screen bg-gray-800">
        <div className="relative flex flex-col min-h-screen justify-between gap-6 lg:mx-auto lg:w-full lg:max-w-screen-lg">
          <Header />
          <div className="flex flex-grow">{children}</div>
          {/* {isLoading && <Loader />} */}
          <Footer />
        </div>
        <div id="modal-root"></div>
      </div>
    </main>
  )
}
