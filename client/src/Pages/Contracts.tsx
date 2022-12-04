import axios from 'axios'
import React, {  useEffect, useState} from 'react'
import Navbar from '../components/generalComp/Navbar'
import { BASE_URL, contractEnd } from '../utils/APIRoutes'
import { localStorageUser, userProps } from '../utils/GlobalContants'
import { getHeaders } from '../utils/helperFunction'

const Contracts = () => {

  const [userData, setUserData] = useState<userProps>({});
  const [contracts, setContracts] = useState<Array<any>>([])

  useEffect(() => {
    async function fetchUserData() {
      const data = await JSON.parse(
        localStorage.getItem(localStorageUser) || "{}"
      );
      setUserData(data);
    }
    fetchUserData();
  }, [])
  

  async function fetchContracts () {
    const { data } = await axios.get(`${BASE_URL}${contractEnd}`, {
      headers: getHeaders(userData.token ?? '')
    })
    console.log(data);
    setContracts(data.userContract);
  }

  useEffect(() => {   
    console.log(userData);
    if (Object.keys(userData).length !== 0) {
      fetchContracts()
    } 
  }, [userData])
  
  return (
    <>
    <Navbar/>
    <div>Contracts</div>
    </>
  )
}

export default Contracts