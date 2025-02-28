import React from 'react'
import MedulancePage from '../components/MeduLancePage '
import WhyChooseUs from '../components/WhyChooseUs'
import ServiceCategories from '../components/ServiceCategories'
import Footer from '../components/Footer'
import AppFeatures from '../components/AppFeatures'
import MedulanceLogin from '../components/LoginForm'




function Home() {
  return (
    <>
    <MedulancePage/>
    <WhyChooseUs/>
    <AppFeatures/>
    <ServiceCategories/>
    <Footer/>
   
    
    </>
  )
}

export default Home