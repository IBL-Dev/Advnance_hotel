"use client";

import { useState, useEffect, useRef } from "react";
import Herosection from "./component/Herosection";
import Navbar from "./component/Navbar";
import Ourservices from "./component/Ourseervises";
import PopulerSection from "./component/populersection";
import Contactus from "./component/Contactus";

export default function Home() {
 
  return (
    <div>
      <Navbar/>
      <Herosection/>
      <PopulerSection/>
      <Ourservices/>
      <Contactus/>

      <div>
        
      </div>
      
    </div>
  );
}