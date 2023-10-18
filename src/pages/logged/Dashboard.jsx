import React, { useEffect, useState } from 'react'
import { getOrderCount, getUser } from '../../services/api/Handler';
import { Typography } from '@mui/material'
import { useAuthHook } from '../../hooks/useAuthHook';

function Dashboard() {

  const [user, setUser] = useState(null)
  const [count, setCount] = useState()
  const { token } = useAuthHook();

	useEffect(() => {
		getUser({}).then(res => {
			if (res.status) {
				setUser(res.data.userData)
			}
		})
    getOrderCount({}).then(res=>{
      if(res.status){
        setCount(res.data.order_count)
      }
    })
	}, [])

  console.log(user)
  return (
    <>
    {token ? <><Typography variant="h5" sx={{ padding: "20px", mt:"70px" }}>
      Hii {user?.first_name}
    </Typography>
    <Typography variant="h5" sx={{ padding: "20px" }}>
      Order Count: {count}
    </Typography></> : <> <Typography variant="h5" sx={{ padding: "20px", mt:"70px" }}>
      Welcome to Logo
    </Typography></> }
      
    </>
  )
}

export default Dashboard