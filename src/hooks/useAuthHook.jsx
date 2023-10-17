import  { useContext } from 'react'
import { AuthContext } from '../context/Auth'

export const useAuthHook =()=>{
    return useContext(AuthContext)
}
