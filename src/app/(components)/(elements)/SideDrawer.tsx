// import Portal from '../../hoc/Portal';

import Image from 'next/image';
import Link from 'next/link';
import { ItemsData } from '../(modules)/MainMenu';

export default function SideDrawer({ show }: { show: boolean }) {
  const toggleOpen = 'left-0';
  const toggleClose = '-left-60';

  const menuItems = ItemsData;

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-screen w-full z-0 bg-black/75 transition-all delay-300 ${show ? 'fixed ' : 'hidden'}`}
      ></div>
      <div
        className={`fixed top-0 max-w-60 w-full h-screen transition-all delay-300 ease-in-out bg-white/90 backdrop-blur-2xl ${show ? toggleOpen : toggleClose}`}
      >
        <div className="bg-white w-full flex justify-center">
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
        {menuItems && menuItems.length > 0 ? (
          <nav>
            <ul className="flex flex-col">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link href={item.link ?? '#'}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </div>
    </>
    // <>Side Drawer</>
    // <Portal id="sidedrawer">
    //   {show ? <Backdrop remove={close} /> : null}
    //   <div className="side_drawer_container">
    //     <div className="cross_container">
    //       <div className="drawer_logo_container">
    //         <Link href="/">
    //           <Image
    //             src="/images/inverse-logo.webp"
    //             alt="side drawer logo"
    //             onClick={close}
    //             height={100}
    //             width={100}
    //           />
    //         </Link>
    //       </div>
    //       <div className="drawer_cross_container" onClick={close}>
    //         <div></div>
    //         <div></div>
    //       </div>
    //     </div>
    //     <div className="drawer_links_container">
    //       <ul className="drawer_unlist">
    //         <li>
    //           <div className="arrow_link" onClick={openAboutHandler}>
    //             <Link href={'/about'}>
    //               <a>ABOUT</a>
    //             </Link>
    //             <Image
    //               src="/icons/arrow.svg"
    //               alt="arrow svg"
    //               className={openAbout ? 'i-arrow-rotate' : 'i-arrow-revert'}
    //               height={100}
    //               width={100}
    //             />
    //           </div>
    //           <div
    //             className={
    //               openAbout
    //                 ? 'drawer_sub_menu sub-menu-show-area'
    //                 : 'drawer_sub_menu sub-menu-hide-area'
    //             }
    //           >
    //             <ul>
    //               <li>
    //                 <Link href={'/about#overview'}>
    //                   <a>Overview</a>
    //                 </Link>
    //               </li>
    //               <li>
    //                 <Link href={'/about#message'}>
    //                   <a>Message From Executive Chairman</a>
    //                 </Link>
    //               </li>
    //               <li>
    //                 <Link href={'/about#board_info'}>
    //                   <a>Board Of Directors</a>
    //                 </Link>
    //               </li>
    //               <li>
    //                 <Link href={'/about#crew'}>
    //                   <a>Crew</a>
    //                 </Link>
    //               </li>
    //               <li>
    //                 <Link href={'/about#statistics'}>
    //                   <a>Mission Statistics</a>
    //                 </Link>
    //               </li>
    //               <li>
    //                 <Link href={'/about#mission&vision'}>
    //                   <a>Mission & Vision</a>
    //                 </Link>
    //               </li>
    //             </ul>
    //           </div>
    //         </li>
    //         <li>
    //           <div className="arrow_link" onClick={openAreaHandler}>
    //             <Link href={'/blog'}>
    //               <a className="header_link">AREA OF OPERATION</a>
    //             </Link>
    //             <Image
    //               src="/icons/arrow.svg"
    //               alt="arrow svg"
    //               className={openArea ? 'i-arrow-rotate' : 'i-arrow-revert'}
    //               height={100}
    //               width={100}
    //             />
    //           </div>
    //           <div
    //             className={
    //               openArea
    //                 ? 'drawer_sub_menu sub-menu-show-area'
    //                 : 'drawer_sub_menu sub-menu-hide-area'
    //             }
    //           >
    //             <ul>
    //               {blogCategories.map((item) => {
    //                 return (
    //                   <li key={item.slug}>
    //                     <Link href={`/blog?category=${item.slug}`}>
    //                       <a>{item.name}</a>
    //                     </Link>
    //                   </li>
    //                 );
    //               })}
    //             </ul>
    //           </div>
    //         </li>
    //         <li>
    //           <Link href="/voluntary-hazard-report">
    //             <a>VOLUNTARY HAZARD</a>
    //           </Link>
    //         </li>
    //         <li>
    //           <div className="arrow_link" onClick={openHeliHandler}>
    //             <a>FLEETS</a>
    //             <Image
    //               src="/icons/arrow.svg"
    //               alt="arrow svg"
    //               className={openHeli ? 'i-arrow-rotate' : 'i-arrow-revert'}
    //               height={100}
    //               width={100}
    //             />
    //           </div>
    //           <div
    //             className={
    //               openHeli
    //                 ? 'drawer_sub_menu sub-menu-show-area'
    //                 : 'drawer_sub_menu sub-menu-hide-area'
    //             }
    //           >
    //             <ul>
    //               {choppers.map((item) => {
    //                 return (
    //                   <li key={item.id}>
    //                     <Link href={`/description/${item.id}`}>
    //                       <a>{item.name}</a>
    //                     </Link>
    //                   </li>
    //                 );
    //               })}
    //             </ul>
    //           </div>
    //         </li>

    //         <li>
    //           <Link href="/gallery">
    //             <a>GALLERY</a>
    //           </Link>
    //         </li>
    //         <li>
    //           {' '}
    //           <Link href="/news">
    //             <a className="header_link">NEWS</a>
    //           </Link>
    //         </li>
    //         <li>
    //           <Link href="/contact">
    //             <a className="header_link">CONTACT</a>
    //           </Link>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </Portal>
  );
}
