
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";

import { useState } from "react";

const containerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "25px",
};

const GoogleBranchMap = ({
  branches,
  center,
  selectedBranch,
  onSelectBranch,
  userLocation,
}) => {
  const [activeBranch, setActiveBranch] = useState(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "mze-google-map",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  if (loadError) {
    return <div>Unable to load Google Maps. Check your API key.</div>;
  }

  if (!isLoaded) {
    return <div>Loading Google Maps...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={11}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: true,
        clickableIcons: false,
      }}
    >
      {/* MZE BRANCH MARKERS */}
      {branches.map((branch) => (
        <Marker
          key={branch.id}
          position={{
            lat: branch.lat,
            lng: branch.lng,
          }}
          title={branch.name}
          onClick={() => {
            setActiveBranch(branch);
            onSelectBranch(branch);
          }}
        />
      ))}

      {/* SELECTED BRANCH INFORMATION */}
      {activeBranch && (
        <InfoWindow
          position={{
            lat: activeBranch.lat,
            lng: activeBranch.lng,
          }}
          onCloseClick={() => setActiveBranch(null)}
        >
          <div style={{ maxWidth: "220px" }}>
            <h3>{activeBranch.name}</h3>
            <p>{activeBranch.address}</p>
            <p>{activeBranch.contact}</p>

            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${activeBranch.lat},${activeBranch.lng}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions
            </a>
          </div>
        </InfoWindow>
      )}

      {/* USER LOCATION MARKER */}
      {userLocation && (
        <Marker
          position={{
            lat: userLocation.lat,
            lng: userLocation.lng,
          }}
          title="Your Location"
          icon={{
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 9,
            fillColor: "#2563eb",
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 3,
          }}
        />
      )}
    </GoogleMap>
  );
};

export default GoogleBranchMap;
