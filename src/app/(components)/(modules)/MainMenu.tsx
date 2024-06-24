'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import MenuItems from './MenuItems';

export const ItemsData = [
  {
    title: 'ABOUT',
    link: '/about',
    sub_menu: [
      {
        title: 'Overview',
        link: '/about#overview',
      },
      {
        title: 'Message From Executive Chairman',
        link: '/about#message',
      },
      {
        title: 'Board Of Directors',
        link: '/about#board_info',
      },
      {
        title: 'Crew',
        link: '/about#crew',
      },
      {
        title: 'Mission & Vision',
        link: '/about#mission&vision',
      },
      {
        title: 'Mission Statistics',
        link: '/about#statistics',
      },
    ],
  },
  {
    title: 'AREA OF OPERATION',
    link: '/blog',
    sub_menu: [
      {
        title: 'Overview',
        link: '/about#overview',
      },
    ],
  },
  {
    title: 'VOLUNTARY HAZARD',
    link: '/voluntary-hazard-report',
  },
  {
    title: 'FLEETS',
    link: '#',
    sub_menu: [
      {
        title: 'Overview',
        link: '/about#overview',
      },
      {
        title: 'Message From Executive Chairman',
        link: '/about#message',
      },
    ],
  },
  {
    title: 'GALLERY',
    link: '/gallery',
  },
  {
    title: 'NEWS',
    link: '/news',
  },
  {
    title: 'CONTACT',
    link: '/contact',
  },
];

interface BlogCategoriesType {
  slug: string;
  name: string;
}

interface ChoppersType {
  id: number;
  name: string;
}

const MainMenu = () => {
  const currentPath = usePathname();
  const [blogCategories, setBlogCategories] = useState<
    BlogCategoriesType[] | undefined
  >([]);
  const [choppers, setChoppers] = useState<ChoppersType[] | undefined>();
  const navActiveClass =
    'before:bg-white before:border-l-4 before:border-custom-blue';
  const navHoverClass =
    'before:absolute before:w-full before:h-full before:top-0 before:left-0 hover:before:bg-white/60 before:-skew-x-12 before:-z-10';
  return (
    <nav className="hidden lg:block">
      <ul className="flex justify-end h-full uppercase text-xs font-semibold text-custom-blue">
        {ItemsData && ItemsData.length > 0
          ? ItemsData.map((item, index) => (
              <MenuItems key={index}>
                <li
                  className={`relative px-5 group ${navHoverClass} ${currentPath === item.link ? navActiveClass : ''}`} // add active class letter
                >
                  <Link href={item.link} className="flex items-center h-full">
                    {item.title}
                  </Link>
                  {item.sub_menu && item?.sub_menu?.length > 0 ? (
                    <div className="hidden group-hover:block group-hover:shadow absolute top-full -left-[6px] min-w-full w-max bg-custom-blue/90">
                      <ul className="flex flex-col justify-end h-full uppercase text-xs font-semibold text-white">
                        {item.sub_menu.map((subItem, subIndex) => (
                          <li
                            key={subIndex}
                            className="relative hover:bg-custom-primary/30 before:absolute before:top-0 before:left-0 hover:before:bottom-0 hover:before:w-2 before:bg-custom-primary"
                          >
                            <Link
                              href={subItem.link}
                              className="flex items-center h-full py-2 px-3"
                            >
                              {subItem.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </li>
              </MenuItems>
            ))
          : null}
      </ul>
    </nav>
  );
};

export default MainMenu;

{
  /* <li className={`relative px-5 ${navHoverClass}`}>
<a href="#" className="flex items-center h-full">
About
</a>
</li>
<li className={`relative px-5 ${navActiveClass} ${navHoverClass}`}>
<a href="#" className="flex items-center h-full">
Area of Operation
</a>
</li>
<li className={`relative px-5 ${navHoverClass}`}>
<a href="#" className="flex items-center h-full">
Voluntary Hazard
</a>
</li>
<li className={`relative px-5 ${navHoverClass}`}>
<a href="#" className="flex items-center h-full">
Fleets
</a>
</li>
<li className={`relative px-5 ${navHoverClass}`}>
<a href="#" className="flex items-center h-full">
Gallery
</a>
</li>
<li className={`relative px-5 ${navHoverClass}`}>
<a href="#" className="flex items-center h-full">
News
</a>
</li>
<li className={`relative px-5 ${navHoverClass}`}>
<a href="#" className="flex items-center h-full">
Contact
</a>
</li> */
}
