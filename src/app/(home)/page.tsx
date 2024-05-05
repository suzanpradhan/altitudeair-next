import Enquiry from '../(components)/(elements)/Enquiry';
import About from '../(components)/(sections)/(landing)/About';
import Highlights from '../(components)/(sections)/(landing)/Highlights';
import Landing from '../(components)/(sections)/(landing)/Landing';
import Services from '../(components)/(sections)/(landing)/Services';

export default function Home() {
  return (
    <>
      <Enquiry />
      <Landing />
      <Highlights />
      <Services />
      <About />
    </>
  );
}
