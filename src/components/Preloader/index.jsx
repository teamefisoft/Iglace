import { BeatLoader } from 'react-spinners'

const Preloader = () => {
  return (
    <div className='h-screen w-full flex flex-col justify-center items-center'>
      <BeatLoader color='#8C461F' />
    </div>
  )
}

export default Preloader