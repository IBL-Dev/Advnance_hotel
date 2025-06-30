import Herosection from "./component/Herosection";
import Navbar from "./component/Navbar";
import {DirectionAwareHoverDemo} from "./component/Populercardsection";

export default function Home() {
  return (
    <>
     <Navbar/>
     <Herosection/>
     <DirectionAwareHoverDemo/>
    </>
  );
}
