import { Footer, Header } from "./"

const Container = ({ children }) => (
  <main>
    <div className="min-h-screen bg-gray-800">
      <div className="relative flex flex-col min-h-screen justify-between gap-6 lg:mx-auto lg:w-full lg:max-w-screen-lg">
        <Header />
        <div className="flex flex-grow">{children}</div>
        <Footer />
      </div>
    </div>
  </main>
)

export default Container
