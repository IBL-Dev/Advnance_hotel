'use client'

import React from 'react'
import { DirectionAwareHoverDemo } from './Populercardsection'

const PopulerSection = () => {
  return (
    <section 
      id="places" 
      data-section="places" 
      className="w-full min-h-screen bg-white py-12"
    >
      <div className="max-w-7xl mx-auto w-full ">
        <DirectionAwareHoverDemo />
      </div>
    </section>
  )
}

export default PopulerSection