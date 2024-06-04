//import { useQuery } from 'react-query'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Preloader from '../Preloader'
//import { getCurrentUser } from '../../features/user/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useState } from 'react'

const AuthCheck = () => {

 const dispatch = useDispatch()
  const { authorizing } = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(getCurrentUser())
  }, [])

  if (authorizing) {
    return (
      <>
        <Preloader />
      </>
    )
  }

  return (
    <>
      <Outlet />
    </>
  )
}

export default AuthCheck
