import React from 'react'
import Home from '@/components/Home'
import CombineText from '@/components/CombineText'
import SlideText from '@/components/SlideText'
import BlurRevealText from '@/components/BlurRevealText'
import Footer from '@/components/Footer'

const MainScreen = () => {
  return (
    <div className='w-full font-[dm_sans]'>
      <Home />
      <CombineText />
      <SlideText />
      <BlurRevealText />
      <Footer />
    </div>
  )
}

export default MainScreen