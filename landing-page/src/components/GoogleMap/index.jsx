import { useEffect, useState } from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import "./style.css";

const GoogleMapComponent = () => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLoading(false);
        },
        (error) => {
          setError("Không thể truy cập vị trí của bạn. Vui lòng bật quyền Geolocation.");
          setLoading(false);
          console.error("Lỗi Geolocation:", error);
        }
      );
    } else {
      setError("Trình duyệt không hỗ trợ Geolocation.");
      setLoading(false);
    }
  }, []);

  return (
    <div className="map-container">
      {loading ? (
        <div className="loading-spinner">Đang tải bản đồ...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        loadingElement={<div className="custom-loading">Đang tải Maps...</div>}>
          <GoogleMap
            zoom={16}
            center={currentPosition}
            mapContainerStyle={{ width: '100%', height: '100%' }}
            options={{
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
          >
            <Marker 
              position={currentPosition} 
              icon={{
                url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
              }} 
            />
          </GoogleMap>
        </LoadScript>
      )}
    </div>
  );
};

export default GoogleMapComponent;