'use client';
import useMediaQuery from '@/core/hooks/useMediaQuery';
import { PaginatedResponseType } from '@/core/types/responseTypes';
import {
  Coordinates,
  RescueMissionType,
} from '@/modules/rescue_mission/rescue_missionType';
import mapboxgl, { Map as MapboxMap } from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import MissionItem from '../../(elements)/MissionItem';
import Tab from '../../(elements)/Tab';

interface Mission {
  imageUrl: string;
  name: string;
  info: string;
  coords: Coordinates;
}

export default function Missions({
  missions: rescueData,
}: {
  missions?: PaginatedResponseType<RescueMissionType>;
}) {
  const mobileOnly = useMediaQuery('(max-width:900px)');
  const [readClicked, setreadClicked] = useState<{
    clicked: boolean;
    clickedBy: number;
  }>({
    clicked: false,
    clickedBy: -1,
  });
  const missionList: Mission[] =
    rescueData?.results.map((item) => {
      return {
        coords: {
          latitude: item.latitude,
          longitude: item.longitude,
        },
        imageUrl: item.coverImage,
        info: item.description,
        name: item.title,
      };
    }) ?? [];

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [fadeClass, setFadeClass] = useState<boolean>(true);
  const [isMapReady, setIsMapReady] = useState<boolean>(false);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<MapboxMap | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_KEY;
  const hasMapboxToken = Boolean(mapboxToken);
  const selectedMission = missionList[selectedIndex] ?? {
    imageUrl: '',
    name: '',
    info: '',
    coords: { latitude: 0, longitude: 0 },
  };

  function flyTo(coords: Coordinates) {
    if (!map.current) {
      return;
    }

    marker.current?.remove();
    map.current.flyTo({
      center: [coords.longitude, coords.latitude],
      minZoom: 5,
      speed: 0.4,
      zoom: 12,
    });
    marker.current = new mapboxgl.Marker({ color: '#fbc200' })
      .setLngLat([coords.longitude, coords.latitude])
      .addTo(map.current);
  }

  useEffect(() => {
    if (!hasMapboxToken || !mapContainer.current || map.current) {
      return;
    }

    mapboxgl.accessToken = mapboxToken ?? '';

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/icyhotshoto/cktb59q6y7iz518uqowun3l0k',
      center: [84.3, 28.5],
      zoom: 5.5,
    });
    map.current.scrollZoom.disable();
    setIsMapReady(true);
    flyTo(selectedMission.coords);
  }, [hasMapboxToken, mapboxToken, selectedMission.coords.latitude, selectedMission.coords.longitude]);

  useEffect(() => {
    if (!isMapReady) {
      return;
    }

    flyTo(selectedMission.coords);
  }, [isMapReady, selectedIndex, selectedMission.coords.latitude, selectedMission.coords.longitude]);

  const selectedItemHandler = (position: number) => {
    if (missionList.length === 0) {
      return;
    }

    const nextIndex = Math.max(0, Math.min(position, missionList.length - 1));
    setSelectedIndex(nextIndex);

    if (mobileOnly) {
      setFadeClass((prevState) => !prevState);
    }
  };

  return (
    <section className="missions">
      <div className="missions-layout">
        <div className="mission_wrapper">
          <div className="heading">
            <h2>
              RESCUE <br />
              MISSIONS
            </h2>
          </div>
          <div className="mission-scroll-area">
            <div className="mission-list">
              {!mobileOnly &&
                rescueData?.results?.map((item, index) => {
                  return (
                    <MissionItem
                      key={index}
                      index={index}
                      name={item.title}
                      coords={{
                        latitude: item.latitude,
                        longitude: item.longitude,
                      }}
                      info={item.description}
                      imageUrl={item.coverImage}
                      selected={selectedIndex === index}
                      onSelect={() => setSelectedIndex(index)}
                      readClicked={readClicked}
                      setReadClicked={setreadClicked}
                    />
                  );
                })}
              {mobileOnly && (
                <MissionItem
                  index={0}
                  imageUrl={selectedMission.imageUrl}
                  info={selectedMission.info}
                  name={selectedMission.name}
                  coords={selectedMission.coords}
                  selected
                  onSelect={() => setSelectedIndex(0)}
                  readClicked={readClicked}
                  setReadClicked={setreadClicked}
                  fadeClass={fadeClass}
                />
              )}
            </div>
          </div>
        </div>
        {mobileOnly && <Tab selectedHandler={selectedItemHandler} />}
        <div className="map-wrapper">
          {hasMapboxToken ? (
            <div ref={mapContainer} className="map-container" />
          ) : (
            <div className="map-fallback">
              Map preview is unavailable until a valid Mapbox access token is configured.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
