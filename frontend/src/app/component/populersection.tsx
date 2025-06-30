'use client'

import React from 'react'
import { DirectionAwareHoverDemo } from './Populercardsection'

const PopulerSection = () => {
  return (
    <section className="w-full min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
       
        <DirectionAwareHoverDemo />
      </div>
    </section>
  )
}

export default PopulerSection
