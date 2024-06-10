import Enquiry from '../(components)/(elements)/Enquiry';
import About from '../(components)/(sections)/(landing)/About';
import Gallery from '../(components)/(sections)/(landing)/Gallery';
import GetInTouch from '../(components)/(sections)/(landing)/GetInTouch';
import Highlights from '../(components)/(sections)/(landing)/Highlights';
import Landing from '../(components)/(sections)/(landing)/Landing';
import Missions from '../(components)/(sections)/(landing)/Missions';
import News from '../(components)/(sections)/(landing)/News';
import Reviews from '../(components)/(sections)/(landing)/Reviews';
import Services from '../(components)/(sections)/(landing)/Services';

export default function Home() {
  return (
    <>
      <Enquiry />
      <Landing />
      <Highlights />
      <Services />
      <About />
      <Missions />
      <News />
      <Gallery />
      <Reviews />
      <GetInTouch />
    </>
  );
}
