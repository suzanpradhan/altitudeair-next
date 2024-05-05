import mapboxgl from "!mapbox-gl";
import { useEffect, useRef, useState } from "react";
import useMediaQuery from "../../../hooks/useMediaQuery";
import axiosInstance from "../../../util/axiosInst";
import { constants } from "../../../util/constants";
import MissionItem from "../../elements/MissionItem";
import Tab from "../../elements/Tab";

export default function Missions() {
  const mobileOnly = useMediaQuery("(max-width:768px)");
  const [readClicked, setreadClicked] = useState({
    clicked: false,
    clickedBy: -1,
  });
  const [missionList, setMissionList] = useState([]);

  const [selected, setSelected] = useState({
    imageUrl: "",
    name: "",
    info: "",
    coords: [83.9778, 28.19886],
  });
  const [fadeClass, setFadeClass] = useState(true);

  mapboxgl.accessToken =
    "pk.eyJ1IjoiaWN5aG90c2hvdG8iLCJhIjoiY2tmeHQwc3E5MjRxajJxbzhmbDN1bjJ5aiJ9.mNKmhIjRyKxFkJYrm4dMqg";
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(84.3);
  const [lat, setLat] = useState(28.5);
  const [zoom, setZoom] = useState(5.5);

  function flyTo(coords) {
    if (!map.current) {
      return;
    }
    map.current.flyTo({
      center: coords,
      minZoom: 5,
      speed: 0.4,
      zoom: 12,
    });
    const marker1 = new mapboxgl.Marker({ color: "#fbc200" })
      .setLngLat(coords)
      .addTo(map.current);
  }

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/icyhotshoto/cktb59q6y7iz518uqowun3l0k",
      center: [lng, lat],
      zoom: zoom,
    });
    map.current.scrollZoom.disable();
  }, []);

  useEffect(() => {
    axiosInstance.get("/rescueMission/").then((item) => {
      let finalObj = item.data.data.map((item) => {
        return {
          imageUrl: constants.baseUrl + item.coverImage,
          name: item.title,
          info: item.description,
          coords: [item.longitude, item.latitude],
        };
      });
      setMissionList(finalObj);
    });
  }, []);

  const selectedItemHandler = (position) => {
    if (missionList.length === 0 || position > missionList.length - 1) {
      return;
    }
    setSelected(missionList[position]);
    if (mobileOnly) {
      setFadeClass((prevState) => {
        return !prevState;
      });
    }
  };

  return (
    <section className="missions">
      <div className="mission_wrapper">
        <div className="heading">
          <h2>
            RESCUE <br />
            MISSIONS
          </h2>
        </div>
        <div className="mission-list">
          {!mobileOnly &&
            missionList.map((item, index) => {
              return (
                <MissionItem
                  key={item.imageUrl}
                  index={index}
                  name={item.name}
                  info={item.info}
                  imageUrl={item.imageUrl}
                  flyTo={flyTo}
                  coords={item.coords}
                  readClicked={readClicked}
                  setreadClicked={setreadClicked}
                />
              );
            })}

          {mobileOnly && (
            <MissionItem
              imageUrl={selected.imageUrl}
              info={selected.info}
              name={selected.name}
              readClicked={readClicked}
              setreadClicked={setreadClicked}
              selected={selected}
              fadeClass={fadeClass}
            />
          )}
        </div>
      </div>
      <div className="map-wrapper">
        <div ref={mapContainer} style={{ width: "600px", height: "350px" }} />
      </div>
      {mobileOnly && <Tab selectedHandler={selectedItemHandler} />}
    </section>
  );
}
