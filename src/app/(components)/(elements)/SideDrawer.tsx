import { useEffect, useState } from 'react';
// import Portal from '../../hoc/Portal';
import axiosInstance from '@/core/utils/axoisInst';

export default function SideDrawer({ show }: { show: boolean }) {
  const [openAbout, setOpenAbout] = useState(false);
  const [openArea, setOpenArea] = useState(false);
  const [openHeli, setOpenHeli] = useState(false);
  const [choppers, setChoppers] = useState([]);
  const [blogCategories, setBlogCategories] = useState([]);

  const openAboutHandler = () => {
    setOpenAbout((prev) => !prev);
  };

  const openAreaHandler = () => {
    setOpenArea((prev) => !prev);
  };

  const openHeliHandler = () => {
    setOpenHeli((prev) => !prev);
  };

  useEffect(() => {
    axiosInstance.get('/category/').then((item) => {
      let newArray = item.data.data.filter((item: any) => {
        return item.status === true;
      });
      setBlogCategories(newArray);
    });

    axiosInstance.get('/chopper/').then((item) => {
      const chopperList = item.data.data;
      setChoppers(chopperList);
    });
  }, []);

  return (
    <>Side Drawer</>
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
