import axiosInstance from '@/core/utils/axoisInst';
import { EnquirySchemaType } from '@/modules/enquiry/enquiryTypes';
import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
  MapMouseEvent,
  Marker,
} from '@vis.gl/react-google-maps';
import { FormikProps } from 'formik';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

interface LatLngJsonType {
  lat: number;
  lng: number;
}

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
const DEFAULT_CENTER = { lat: 27.7293, lng: 85.3343 };

const DestinationV2 = ({
  formik,
  setPickedStep,
}: {
  formik: FormikProps<EnquirySchemaType>;
  setPickedStep: Dispatch<SetStateAction<number>>;
}) => {
  const mapContainer = useRef(null);
  const [destinations, setDestinations] = useState([]);
  const [departureMarkerPos, setDepartureMarkerPos] =
    useState<LatLngJsonType | null>(DEFAULT_CENTER);
  const [destinationMarkerPos, setDestinationMarkerPos] =
    useState<LatLngJsonType | null>(null);
  const [isCurrentLocation, toggleIsCurrentLocation] = useState(true);
  const [isDestinationSelectionMode, toggleDestinationSelectionMode] =
    useState(false);
  const [error, setError] = useState<number | null>();

  function downloadSubDest() {
    axiosInstance.get('/service/').then((res: any) => {
      setDestinations(res.data.data);
    });
  }

  useEffect(() => {
    downloadSubDest();
  }, []);

  const handleCenterChange = (map: MapCameraChangedEvent) => {
    const newCenter = map.detail.center;
    if (!isDestinationSelectionMode) {
      setDepartureMarkerPos(newCenter);
    } else {
      setDestinationMarkerPos(newCenter);
    }
  };

  const handleMapClick = (map: MapMouseEvent) => {
    map.map.setCenter(map.detail.latLng!);
    if (!isDestinationSelectionMode) {
      setDepartureMarkerPos(map.detail.latLng);
    } else {
      setDestinationMarkerPos(map.detail.latLng);
    }
  };

  const setCurrentLocation = () => {
    toggleDestinationSelectionMode(false);
    toggleIsCurrentLocation(true);

    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((position) => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      setDepartureMarkerPos(pos);
    });
  };

  return (
    <div className="destination_container">
      <h2>Where are you headed?</h2>
      <p>Select Services</p>

      <div className="destinations_wrapper">
        <div className="option_container_one">
          {destinations.map((item: any) => {
            return (
              <div
                className={`service-item ${
                  formik.values.destinationForm.service === item.id
                    ? 'option_container_one_picked'
                    : ''
                }`}
                key={item.id}
                onClick={() => {
                  formik.setFieldValue('destinationForm.service', item.id);
                }}
              >
                <p>{item.title}</p>
              </div>
            );
          })}
        </div>

        <p>Select Pickup & Destination</p>
        <div className="dest_map_container">
          <div className="step_map-wrapper">
            <div className="w-96 h-52 overflow-hidden" ref={mapContainer}>
              <APIProvider apiKey={API_KEY ?? ''}>
                <div className="flex flex-col ">
                  <div className="flex my-2">
                    {/* <PlacesAutocomplete setMarkerPosition={setMarkerPosition} /> */}
                  </div>
                  <Map
                    onCenterChanged={(map) => handleCenterChange(map)}
                    defaultZoom={10}
                    center={destinationMarkerPos ?? departureMarkerPos}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                    className="w-full h-52"
                    onClick={(map) => handleMapClick(map)}
                  >
                    {departureMarkerPos ? (
                      <Marker position={departureMarkerPos} />
                    ) : null}
                    {destinationMarkerPos ? (
                      <Marker position={destinationMarkerPos} />
                    ) : null}
                  </Map>
                </div>
              </APIProvider>
            </div>
          </div>
          <div className="map_controls">
            <p>Choose Pickup Location:</p>
            <div className="current_pos">
              <div
                className={`${isCurrentLocation ? 'pos_confirmed' : ''}`}
                onClick={setCurrentLocation}
              >
                Current Location
              </div>
              <div
                className={`${!isCurrentLocation ? 'active_pos_util' : ''} ${!isCurrentLocation && departureMarkerPos != null ? 'pos_confirmed' : ''}    `}
                onClick={() => {
                  toggleDestinationSelectionMode(false);
                  setDepartureMarkerPos(null);
                  toggleIsCurrentLocation(false);
                }}
              >
                Choose Manually
              </div>
            </div>
            {/* {loading && <p className="location_loading">Location Loading...</p>} */}
            <p>Choose Destination:</p>
            <div className="current_pos">
              <div
                onClick={() => {
                  toggleDestinationSelectionMode(true);
                  //   currentlyRef.current = 3;
                }}
                className={`${isDestinationSelectionMode ? 'active_pos_util' : ''}
                    ${destinationMarkerPos ? 'pos_confirmed' : ''}`}
              >
                Choose Location
              </div>
            </div>
          </div>
        </div>
      </div>
      {error ? (
        <p className="error_para">
          *Pick a service and pickup & drop locations
        </p>
      ) : null}
      {/* {formik.values.destinationForm.destinationLongitude} */}
      <button
        className="action-button single_button"
        onClick={() => {
          formik.setFormikState((prevState) => {
            return {
              ...prevState,
              values: {
                ...prevState.values,
                destinationForm: {
                  ...prevState.values.destinationForm,
                  currentLatitude: departureMarkerPos?.lat.toString() ?? '',
                  currentLongitude: departureMarkerPos?.lng.toString() ?? '',
                  destinationLatitude:
                    destinationMarkerPos?.lat.toString() ?? '',
                  destinationLongitude:
                    destinationMarkerPos?.lng.toString() ?? '',
                },
              },
            };
          });

          if (
            formik.values.destinationForm.service.length === 0 ||
            !destinationMarkerPos ||
            !departureMarkerPos
          ) {
            setError(1);
          } else {
            setError(null);
            setPickedStep(3);
          }
        }}
      >
        NEXT
      </button>
    </div>
  );
};

export default DestinationV2;
