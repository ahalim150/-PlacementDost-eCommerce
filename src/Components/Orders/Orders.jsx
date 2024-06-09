import React, { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { Helmet } from 'react-helmet';
import Bubbles from '../Bubbles/Bubbles';

export default function Orders() {

  let { userData } = useContext(AuthContext);
  
  return (
    <>
      <Helmet>
          <title>FreshCart - Orders</title>
      </Helmet>

      <Bubbles />

    </>
  )
}
