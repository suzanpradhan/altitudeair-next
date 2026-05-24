import useMediaQuery from '@/core/hooks/useMediaQuery';
import { Coordinates } from '@/modules/rescue_mission/rescue_missionType';
import Image from 'next/image';
import React, { Dispatch, SetStateAction } from 'react';

interface MissionItemProps {
  index: number;
  imageUrl: string;
  name: string;
  info: string;
  coords: Coordinates;
  selected: boolean;
  onSelect: () => void;
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
  selected,
  onSelect,
  readClicked,
  setReadClicked,
  fadeClass,
}) => {
  const mobileOnly = useMediaQuery('(max-width:900px)');
  const isExpanded = readClicked.clicked && readClicked.clickedBy === index;

  const clickedHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onSelect();
    setReadClicked((prevState) => ({
      clicked: !prevState.clicked,
      clickedBy: prevState.clicked ? -1 : index,
    }));
  };

  if (readClicked.clicked && readClicked.clickedBy !== index) {
    return null;
  }

  return (
    <div
      className={`mission-item min-h-32 ${selected ? 'focused' : ''} 
        ${isExpanded && !mobileOnly ? 'read-more-active' : ''}
        ${isExpanded && mobileOnly ? 'read-more-active-mobile' : ''}
        ${mobileOnly ? (fadeClass ? 'fade-in-one' : 'fade-in-two') : ''}
        ${isExpanded ? 'expanded-mission-card' : ''}
        `}
      onClick={onSelect}
      style={{ position: 'relative', zIndex: isExpanded ? 2 : 1 }}
    >
      {isExpanded ? (
        <div className="expanded-mission-content">
          <div className="expanded-image-wrapper">
            <Image
              src={imageUrl}
              alt={`Mission ${index}`}
              fill
              className="expanded-image"
            />
          </div>
          <div className="expanded-info">
            <h3>{name}</h3>
            <p>{info}</p>
            <button className="expanded-toggle-btn" onClick={clickedHandler}>
              SHOW LESS
            </button>
          </div>
        </div>
      ) : (
        <div className="flex w-full">
          <div className="expanded-image-wrapper" style={{ width: 120, minWidth: 120, height: 120, margin: '0 1.5rem 0 0' }}>
            <Image
              src={imageUrl}
              alt={`Mission ${index}`}
              fill
              className="expanded-image"
            />
          </div>
          <div className="info" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3>{name}</h3>
            <p>{info}</p>
            <div className="button-container">
              <button className="expanded-toggle-btn" onClick={clickedHandler}>
                SHOW MORE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MissionItem;
