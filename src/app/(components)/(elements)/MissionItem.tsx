import useMediaQuery from '@/core/hooks/useMediaQuery';
import useScroll from '@/core/hooks/useScroll';
import Image from 'next/image';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface MissionItemProps {
  index: number;
  imageUrl: string;
  name: string;
  info: string;
  flyTo?: (coords: [number, number]) => void;
  readClicked: { clicked: boolean; clickedBy: number };
  setReadClicked: Dispatch<
    SetStateAction<{
      clicked: boolean;
      clickedBy: number;
    }>
  >;
  fadeClass?: boolean;
}

const MissionItem: React.FC<MissionItemProps> = ({
  index,
  imageUrl,
  name,
  info,
  flyTo,
  readClicked,
  setReadClicked,
  fadeClass,
}) => {
  const currElem = useRef<HTMLDivElement>(null);
  const { pos } = useScroll(currElem);
  const currState = useRef<boolean>(false);
  const mobileOnly = useMediaQuery('(max-width:768px)');
  const [onFocus, setOnFocus] = useState<boolean>(false);

  useEffect(() => {
    if (!mobileOnly) {
      checkOnFocus();
    }
  }, [pos]);

  useEffect(() => {
    if (mobileOnly) {
      return;
    }

    let timeout: number | null = null;

    const intervalId = setInterval(() => {
      if (timeout !== null) {
        return;
      }

      timeout = window.setTimeout(() => {
        if (currState.current === false) {
          return;
        }
        const boundingClientRect = currElem.current?.getBoundingClientRect();

        if (!boundingClientRect) {
          return;
        }

        const top = boundingClientRect.top + window.scrollY;
        window.scrollTo({ top: top - 225 });
        timeout = null;
      }, 50);
    }, 10);

    const scrollFunction = () => {
      if (timeout !== null) {
        window.clearTimeout(timeout);
        timeout = null;
      }
    };

    document.addEventListener('scroll', scrollFunction);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('scroll', scrollFunction);
    };
  }, []);

  const clickedHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setReadClicked((prevState) => ({
      clicked: !prevState.clicked,
      clickedBy: prevState.clicked ? -1 : index,
    }));
  };

  const checkOnFocus = () => {
    if (pos) {
      if (pos <= 230 && pos >= 110) {
        if (!readClicked.clicked) {
          // flyTo(coords);
          setOnFocus(true);
          currState.current = true;
        }
      } else if (readClicked.clicked && readClicked.clickedBy === index) {
        setOnFocus(true);
        currState.current = true;
      } else {
        setOnFocus(false);
        currState.current = false;
      }
    }
  };

  return (
    <div
      className={`mission-item ${onFocus ? 'focused' : ''} 
        ${readClicked.clicked && readClicked.clickedBy === index && !mobileOnly ? 'read-more-active' : ''}
        ${readClicked.clicked && readClicked.clickedBy === index && mobileOnly ? 'read-more-active-mobile' : ''}
        ${mobileOnly ? (fadeClass ? 'fade-in-one' : 'fade-in-two') : ''}
        `}
      ref={currElem}
      style={{
        display:
          readClicked.clicked && readClicked.clickedBy !== index
            ? 'none'
            : 'inherit',
      }}
      onClick={() => {
        let top =
          currElem.current?.getBoundingClientRect().top! + window.scrollY;
        window.scrollTo({ top: top - 225 });
      }}
    >
      <div className="list-decorator">
        <Image
          src="./images/icons/ring.svg"
          alt="List Decorator"
          style={{
            visibility:
              readClicked.clicked && readClicked.clickedBy === index
                ? 'hidden'
                : 'visible',
          }}
          width={100}
          height={100}
        />
      </div>

      <div className={`mission_content_wrapper`}>
        <Image
          src={imageUrl}
          alt={`Mission ${index}`}
          className="rescue_image"
          width={100}
          height={100}
        />
        <div className="info">
          <h3>{name}</h3>
          <p>{info}</p>
          <div className="button-container">
            <button className="button-fill" onClick={clickedHandler}>
              {!readClicked.clicked && readClicked.clickedBy !== index
                ? 'SHOW MORE'
                : 'SHOW LESS'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionItem;
