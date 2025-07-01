import Herosection from "./component/Herosection";
import Navbar from "./component/Navbar";
import Ourservices from "./component/Ourseervises";
import PopulerSection from "./component/populersection";

export default function Home() {
  return (
    <>
     <Navbar/>
     <Herosection/>
     <PopulerSection/>
     <Ourservices/>
    </>
  );
}
  