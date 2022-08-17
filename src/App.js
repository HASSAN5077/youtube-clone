import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'

import Header from './components/header/Header'
import Sidebar from './components/sidebar/Sidebar'
import HomeScreen from './screens/homeScreen/HomeScreen'
import LoginScreen from './screens/loginScreen/LoginScreen'

import {  Route, Routes, useNavigate } from 'react-router-dom'

import './_app.scss'
import { useSelector } from 'react-redux'
import WatchScreen from './screens/watchScreen/WatchScreen'
import SearchScreen from './screens/SearchScreen'
import SubscriptionsScreen from './screens/subscriptionsScreen/SubscriptionsScreen'
import ChannelScreen from './screens/channelScreen/ChannelScreen'

const Layout = ({ children }) => {
   const [sidebar, toggleSidebar] = useState(false)

   const handleToggleSidebar = () => toggleSidebar(value => !value)

   return (
      <>
         <Header handleToggleSidebar={handleToggleSidebar} />
         <div className='app__container'>
            <Sidebar
               sidebar={sidebar}
               handleToggleSidebar={handleToggleSidebar}
            />
            <Container fluid className='app__main '>
               {children}
            </Container>
         </div>
      </>
   )
}

const App = () => {
   const { accessToken, loading } = useSelector(state => state.auth)

   const history = useNavigate()

   // useEffect(() => {
   //    if (!loading && !accessToken) {
   //       history('/auth')
   //    }
   // }, [accessToken, loading, history])

   return (
      <Routes>
         <Route path='/' exact element={<Layout><HomeScreen/></Layout>}/>
         <Route path='/auth' exact element={<Layout><LoginScreen/></Layout>}/>
         <Route path='/search/:query' exact element={<Layout><SearchScreen/></Layout>}/>
         <Route path='//watch/:id' exact element={<Layout><WatchScreen/></Layout>}/>
         <Route path='/feed/subscriptions' exact element={<Layout><SubscriptionsScreen/></Layout>}/>
         <Route path='//channel/:channelId' exact element={<Layout><ChannelScreen/></Layout>}/>
      </Routes>
   )
}

export default App
