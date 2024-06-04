import { useState } from 'react'
import { useDispatch } from 'react-redux'
import imperial from '../../asset/imperial.jpeg'
import { ToastContainer } from 'react-toastify'
import { toast } from 'react-toastify'
import { loginUser } from '../../features/user/actions'
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

  const dispatch = useDispatch()

  const [login, setLogin] = useState('')
  const [pwd, setPwd] = useState('')
  const [loading, setLoading] = useState(false)
  

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(loginUser({ login, pwd })).unwrap();
   
    } catch (error) {
      toast.error(`${error}`, {
        toastId: 'errorToast',
        position: 'top-right',
        autoClose: 5000,
        style: { fontSize: '14px' }, // Ajustez la taille de la police ici
      });
    } finally {
      setLoading(false);
    }
  };
 

  return (
    <section className=" w-full h-screen bg-[#D2B48C]">
      <div className="w-full  px-[10%] h-full flex flex-col items-center justify-center">
        <div className="text-center">
          <img className="mx-auto w-40 h-[10rem] rounded-full" src={imperial} alt="logo" />
          <h4 className="text-xl font-semibold mt-3 mb-6 pb-1 text-white">
            IMPERIAL CREAM
          </h4>
        </div>
        <form className=""  onSubmit={submit} >
          <p className="mb-2"></p>
          <div className="mb-2">
      <input
       type="text"
       pattern="[0-9]{0,10}"
       maxLength={10}
       className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-[#8C461F] focus:outline-none"
       id="exampleFormControlInput1"
       placeholder="Numéro"
        value={login}
       onChange={(e) => setLogin(e.target.value)}
       required
/>
</div>
          <div className="mb-2">
         <input
  type="password"
  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-[#8C461F] focus:outline-none"
  id="exampleFormControlInput2"
  placeholder="Mot de passe"
  value={pwd}
  onChange={(e) => setPwd(e.target.value)}
  required
/>
          </div>
          <div className="text-center pt-1 mb-4 pb-1">
            {loading ? (
              <div role="status" className="flex items-center justify-center">
                <svg
                  ariaHidden="true"
                  className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-[#8C461F]"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">loading...</span>
              </div>
            ) : (
              <button
                className="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full "
                type="submit"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                style={{
                  background: `linear-gradient(
                    to right,
                    #8C461F,
                    #8C461F
                  )`,
                }}
              >
                Login
              </button>
            )}
          </div>
        </form>
      </div>

     
    </section>
  )
}

export default Login
