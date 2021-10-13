const BackgroundImage = ({ image, width = 100, height = 100 }) => {
  return (
    <div className="absolute opacity-60 right-2 -bottom-3">
      <img src={image} width={width} height={height} />
    </div>
  )
}
export default BackgroundImage
