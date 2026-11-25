
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
// BRANCH API URL
// =====================================

const API_URL = (
  import.meta.env.VITE_BRANCH_API_BASE_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  "http://127.0.0.1:8000"
).replace(/\/$/, "");

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
  const [branches, setBranches] = useState([]);

  const [search, setSearch] = useState("");

  const [userLocation, setUserLocation] = useState(null);

  const [loading, setLoading] = useState(false);

  const [branchesLoading, setBranchesLoading] = useState(true);

  const [error, setError] = useState("");

  const [branchLoadError, setBranchLoadError] = useState("");

  const [mapCenter, setMapCenter] = useState([
    14.56,
    121.05,
  ]);

  const [selectedBranch, setSelectedBranch] = useState(null);

  // =====================================
  // FETCH BRANCHES FROM DATABASE
  // =====================================

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        setBranchesLoading(true);
        setBranchLoadError("");

        const response = await fetch(
          `${API_URL}/api/branches`
        );

        if (!response.ok) {
          throw new Error("Unable to load branches.");
        }

        const data = await response.json();

        // Convert database coordinates to numbers
        const formattedBranches = data
          .map((branch) => ({
            ...branch,
            lat: Number(branch.latitude),
            lng: Number(branch.longitude),
          }))
          .filter(
            (branch) =>
              Number.isFinite(branch.lat) &&
              Number.isFinite(branch.lng) &&
              branch.lat >= -90 &&
              branch.lat <= 90 &&
              branch.lng >= -180 &&
              branch.lng <= 180
          );

        setBranches(formattedBranches);

      } catch (err) {
        console.error("Branch loading error:", err);

        setBranchLoadError(
          "Unable to load branches. Please try again later."
        );

      } finally {
        setBranchesLoading(false);
      }
    };

    fetchBranches();
  }, []);

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

  }, [userLocation, branches]);

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
    if (!navigator.geolocation) {
      setError(
        "Your browser does not support location services."
      );

      return;
    }

    if (!window.isSecureContext) {
      setError(
        "Location services require a secure HTTPS connection."
      );

      return;
    }

    setLoading(true);
    setError("");

    setUserLocation(null);
    setSelectedBranch(null);

    navigator.geolocation.getCurrentPosition(

      // SUCCESS CALLBACK
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        console.log("Location detected:", location);

        setUserLocation(location);

        setMapCenter([
          location.lat,
          location.lng,
        ]);

        setError("");
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

          {/* BRANCH API ERROR */}

          {branchLoadError && (
            <p className="branch-error">
              {branchLoadError}
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

            {/* LOADING */}

            {branchesLoading && (
              <p>
                Loading branches...
              </p>
            )}

            {/* EMPTY BRANCHES */}

            {!branchesLoading &&
              !branchLoadError &&
              branches.length === 0 && (
                <p>
                  No branches available at the moment.
                </p>
              )}

            {/* BRANCH CARDS */}

            {!branchesLoading &&
              sortedBranches.map((branch, index) => (

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

                  {/* EMAIL */}

                  {branch.email && (
                    <p className="branch-detail">
                      <strong>Email:</strong>
                      <br />
                      {branch.email}
                    </p>
                  )}

                  {/* OPERATING HOURS */}

                  {branch.hours && (
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
                  )}

                  {/* CLOSED SCHEDULE */}

                  {!branch.hours && branch.closed && (
                    <p className="branch-detail">
                      <strong>Closed:</strong>
                      <br />
                      {branch.closed}
                    </p>
                  )}

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
