
import { useState, useMemo, useEffect } from "react";

import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "../css/Branches.css";

// =====================================
// MZE BRANCH DATA
// =====================================

const branches = [
  {
    id: 1,
    name: "Kamuning Branch",
    address: "15K-5th Street, Brgy. Kamuning, Quezon City",
    contact: "0942 390 1800",
    hours: "Monday–Saturday: 8:00 AM – 5:45 PM",
    lat: 14.6263349,
    lng: 121.0373555,
  },
  {
    id: 2,
    name: "MZE Soledad Branch",
    address:
      "18 France cor. Germany St., Brgy. Don Bosco, Better Living, Parañaque City",
    contact: "0932-406-9768",
    hours: "Monday–Saturday: 8:00 AM – 4:45 PM",
    closed: "Sunday & Holidays: Closed",
    lat: 14.4854,
    lng: 121.0456,
  },
];

// =====================================
// DISTANCE CALCULATION
// =====================================

const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  return (
    R *
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    )
  );
};

// =====================================
// MAP CENTER UPDATER
// =====================================

const MapUpdater = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    if (center && center.length === 2) {
      map.setView(center, 15);
    }
  }, [map, center]);

  return null;
};

// =====================================
// GOOGLE MAPS DIRECTIONS
// =====================================

const openGoogleMaps = (branch) => {
  const destination = `${branch.lat},${branch.lng}`;

  const url =
    `https://www.google.com/maps/dir/?api=1` +
    `&destination=${encodeURIComponent(destination)}` +
    `&travelmode=driving`;

  window.open(url, "_blank", "noopener,noreferrer");
};

// =====================================
// BRANCHES COMPONENT
// =====================================

const Branches = () => {
  const [search, setSearch] = useState("");

  const [userLocation, setUserLocation] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [mapCenter, setMapCenter] = useState([
    14.56,
    121.05,
  ]);

  const [selectedBranch, setSelectedBranch] = useState(null);

  // =====================================
  // SORT BRANCHES BY DISTANCE
  // =====================================

  const sortedBranches = useMemo(() => {
    if (!userLocation) {
      return branches;
    }

    return branches
      .map((branch) => ({
        ...branch,

        distance: getDistance(
          userLocation.lat,
          userLocation.lng,
          branch.lat,
          branch.lng
        ),
      }))
      .sort((a, b) => a.distance - b.distance);

  }, [userLocation]);

  // =====================================
  // SEARCH ADDRESS
  // =====================================

  const searchAddress = async (e) => {
    e.preventDefault();

    if (!search.trim()) {
      setError("Please enter your address.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes=ph&q=${encodeURIComponent(search)}`
      );

      if (!response.ok) {
        throw new Error("Address search failed.");
      }

      const data = await response.json();

      if (!data.length) {
        setError(
          "Address not found. Please try another address."
        );

        return;
      }

      const location = {
        lat: Number(data[0].lat),
        lng: Number(data[0].lon),
      };

      setUserLocation(location);

      setMapCenter([
        location.lat,
        location.lng,
      ]);

      setSelectedBranch(null);

      setError("");

    } catch (err) {
      console.error("Address search error:", err);

      setError(
        "Unable to search address. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // USE CURRENT LOCATION
  // =====================================

  const useCurrentLocation = () => {
    // Check browser geolocation support

    if (!navigator.geolocation) {
      setError(
        "Your browser does not support location services."
      );

      return;
    }

    // Check HTTPS / secure context

    if (!window.isSecureContext) {
      setError(
        "Location services require a secure HTTPS connection."
      );

      return;
    }

    // Start loading

    setLoading(true);
    setError("");

    // Clear previous location to avoid outdated status

    setUserLocation(null);
    setSelectedBranch(null);

    // Request device location

    navigator.geolocation.getCurrentPosition(

      // SUCCESS CALLBACK

      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        console.log("Location detected:", location);

        // Save user location

        setUserLocation(location);

        // Update map center

        setMapCenter([
          location.lat,
          location.lng,
        ]);

        // Clear error

        setError("");

        // Stop loading

        setLoading(false);
      },

      // ERROR CALLBACK

      (err) => {
        console.error("Geolocation error:", err);

        switch (err.code) {
          case 1:
            setError(
              "Location permission denied. Please allow location access in your browser settings."
            );
            break;

          case 2:
            setError(
              "Your location is currently unavailable. Please check your GPS."
            );
            break;

          case 3:
            setError(
              "Location request timed out. Please try again."
            );
            break;

          default:
            setError(
              "Unable to detect your location. Please try again."
            );
        }

        setLoading(false);
      },

      // LOCATION OPTIONS

      {
        enableHighAccuracy: false,
        timeout: 60000,
        maximumAge: 300000,
      }
    );
  };

  // =====================================
  // SELECT BRANCH
  // =====================================

  const selectBranch = (branch) => {
    setSelectedBranch(branch);

    setMapCenter([
      branch.lat,
      branch.lng,
    ]);
  };

  // =====================================
  // OPEN DIRECTIONS BUTTON
  // =====================================

  const getDirections = (branch) => {
    openGoogleMaps(branch);
  };

  // =====================================
  // RETURN UI
  // =====================================

  return (
    <main className="branches-page">

      {/* PAGE TITLE */}

      <div className="branches-heading">

        <h1>Find a Branch</h1>

        <p>
          Find the nearest MZE Pawnshop branch and experience
          convenient and hassle-free service.
        </p>

      </div>

      {/* BRANCH LOCATOR */}

      <section className="branch-locator">

        {/* LEFT SIDEBAR */}

        <div className="branch-sidebar">

          <label htmlFor="branch-search">
            SEARCH ADDRESS
          </label>

          {/* ADDRESS SEARCH */}

          <form
            className="branch-search"
            onSubmit={searchAddress}
          >

            <input
              id="branch-search"
              type="text"
              placeholder="ZIP code, city, complete address"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              type="submit"
              disabled={loading}
            >
              {loading ? "..." : "⌕"}
            </button>

          </form>

          {/* CURRENT LOCATION */}

          <button
            type="button"
            className="current-location"
            onClick={useCurrentLocation}
            disabled={loading}
          >

            <span>◎</span>

            {loading
              ? "Detecting location..."
              : "Use current location"}

          </button>

          {/* ERROR MESSAGE */}

          {error && (
            <p className="branch-error">
              {error}
            </p>
          )}

          {/* LOCATION STATUS */}

          {userLocation && !error && (
            <div className="location-status">

              <span>✓</span>

              Location successfully detected

            </div>
          )}

          {/* BRANCH RESULTS */}

          <div className="branch-results">

            <div className="results-heading">

              <h3>
                {userLocation
                  ? "Nearest MZE Branches"
                  : "Our Branches"}
              </h3>

              <span>
                {branches.length} branches
              </span>

            </div>

            {/* BRANCH CARDS */}

            {sortedBranches.map((branch, index) => (

              <div
                key={branch.id}
                className={`branch-card ${
                  selectedBranch?.id === branch.id
                    ? "selected"
                    : ""
                }`}
                onClick={() => selectBranch(branch)}
              >

                {/* NEAREST BADGE */}

                {userLocation && index === 0 && (
                  <span className="nearest-badge">
                    NEAREST BRANCH
                  </span>
                )}

                <h3>{branch.name}</h3>

                {/* ADDRESS */}

                <p className="branch-detail">

                  <strong>Address:</strong>

                  <br />

                  <span
                    className="clickable-address"
                    onClick={(e) => {
                      e.stopPropagation();
                      openGoogleMaps(branch);
                    }}
                    title="Get directions using Google Maps"
                  >

                    {branch.address}

                    <span className="address-arrow">
                      {" "}↗
                    </span>

                  </span>

                </p>

                {/* CONTACT */}

                <p className="branch-detail">

                  <strong>Contact:</strong>

                  <br />

                  {branch.contact}

                </p>

                {/* OPERATING HOURS */}

                <p className="branch-detail">

                  <strong>Operating Hours:</strong>

                  <br />

                  {branch.hours}

                  {branch.closed && (
                    <>
                      <br />
                      {branch.closed}
                    </>
                  )}

                </p>

                {/* DISTANCE */}

                {userLocation && (
                  <p className="branch-distance">

                    <strong>
                      {branch.distance.toFixed(2)} km away
                    </strong>

                  </p>
                )}

                {/* VIEW ON MAP */}

                <button
                  type="button"
                  className="view-map-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    selectBranch(branch);
                  }}
                >
                  View on map →
                </button>

                {/* GET DIRECTIONS */}

                <button
                  type="button"
                  className="view-map-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    getDirections(branch);
                  }}
                >
                  Get directions ↗
                </button>

              </div>

            ))}

          </div>

        </div>

        {/* RIGHT MAP */}

        <div className="branch-map">

          <MapContainer
            center={mapCenter}
            zoom={11}
            scrollWheelZoom={true}
            className="leaflet-map"
          >

            <MapUpdater center={mapCenter} />

            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* MZE BRANCH MARKERS */}

            {branches.map((branch) => (

              <CircleMarker
                key={branch.id}
                center={[
                  branch.lat,
                  branch.lng,
                ]}
                radius={
                  selectedBranch?.id === branch.id
                    ? 12
                    : 9
                }
                pathOptions={{
                  color: "#ffffff",
                  fillColor: "#e53232",
                  fillOpacity: 1,
                  weight: 3,
                }}
                eventHandlers={{
                  click: () => selectBranch(branch),
                }}
              >

                <Popup>

                  <strong>{branch.name}</strong>

                  <br />

                  {branch.address}

                  <br />

                  {branch.contact}

                  <br />

                  <button
                    type="button"
                    onClick={() => openGoogleMaps(branch)}
                  >
                    Get Directions
                  </button>

                </Popup>

              </CircleMarker>

            ))}

            {/* USER LOCATION MARKER */}

            {userLocation && (

              <CircleMarker
                center={[
                  userLocation.lat,
                  userLocation.lng,
                ]}
                radius={9}
                pathOptions={{
                  color: "#ffffff",
                  fillColor: "#2563eb",
                  fillOpacity: 1,
                  weight: 3,
                }}
              >

                <Popup>
                  Your current location
                </Popup>

              </CircleMarker>

            )}

          </MapContainer>

          {/* MAP LEGEND */}

          <div className="map-legend">

            <span>
              <i className="branch-dot"></i>
              MZE Branch
            </span>

            <span>
              <i className="user-dot"></i>
              Your Location
            </span>

          </div>

        </div>

      </section>

    </main>
  );
};

export default Branches;
