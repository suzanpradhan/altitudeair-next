import Image from 'next/image';
import Link from 'next/link';
import MainMenu from './MainMenu';
import MobileNav from './MobileNav';

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 h-16 w-full z-50 bg-white/60 backdrop-blur-md">
      <div className="lg:container mx-auto">
        <div className="flex justify-between">
          <div className="bg-white w-24 flex justify-center">
            <Link href="/" className="flex items-center relative h-16 w-16">
              <Image
                alt="altitude-air-logo"
                src="/images/inverse-logo.webp"
                width={100}
                height={100}
                quality={75}
                sizes="(max-width: 768px) 75vw, 33vw"
                className="object-contain"
              />
            </Link>
          </div>
          <MainMenu />
          <MobileNav />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
