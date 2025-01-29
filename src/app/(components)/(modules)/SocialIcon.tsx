import { Whatsapp } from 'iconsax-react';
import Link from 'next/link';
const SocialIcon = () => {
  return (
    <div className="fixed bottom-5 right-5 flex flex-col gap-3 z-50">
      <Link
        href="https://web.whatsapp.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-yellow-400 p-3 rounded-full shadow-lg transition-all hover:bg-slate-200 "
      >
        <Whatsapp size="32" color="black" />
      </Link>
      {/* 
      <Link
        href="https://m.me/yourmessengerid"
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 bg-yellow-400 rounded-full shadow-lg transition-all hover:bg-slate-200"
      >
        <Messenger size="32" color="black" />
      </Link> */}
    </div>
  );
};

export default SocialIcon;
