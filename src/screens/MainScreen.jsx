import React from 'react'
import Home from '@/components/Home'
import CombineText from '@/components/CombineText'
import SlideText from '@/components/SlideText'
import BlurRevealText from '@/components/BlurRevealText'
import Footer from '@/components/Footer'

const MainScreen = () => {
  return (
    <div className='w-full overflow-hidden font-[dm_sans] selection:bg-redy selection:text-whitey'>
      <Home />
      <CombineText />
      <SlideText />
      <BlurRevealText />
      <Footer />
      <button className="text-redy border border-redy py-2 px-4 rounded-md cursor-pointer fixed bottom-5 right-5 z-50 uppercase">prolingualhub</button>
    </div>
  )
}

export default MainScreen