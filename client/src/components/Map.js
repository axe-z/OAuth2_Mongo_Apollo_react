import React, { useState, useEffect, useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import ReactMapGL, { NavigationControl, Marker } from "react-map-gl"; //NavigationControl donne les control de zoom
import PinIcon from "./PinIcon";
import Blog from "./Blog";
import MonContext from "../context";

// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import DeleteIcon from "@material-ui/icons/DeleteTwoTone";

const INITIAL_VIEWPORT = {
  // latitude: 45.50884,
  latitude: 37.7577,
  // longitude: -73.58781,
  longitude: -122.4376,
  zoom: 13
};

const Map = ({ classes }) => {
  const { state, dispatch } = useContext(MonContext);
  const [viewport, setViewport] = useState(INITIAL_VIEWPORT);
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    // didmount
    getPositionUser();
  }, []);

  const getPositionUser = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        //console.log(position);
        const { latitude, longitude } = position.coords;
        setViewport({ ...viewport, latitude, longitude });
        //prend du temps
        setUserPosition({ latitude, longitude });
      });
    }
  };

  const handleMapClick = e => {
    const [longitude, latitude] = e.lngLat;
    const leftButton = e.leftButton;
    if (!leftButton) return;
    if (!state.draft) {
      dispatch({ type: "CREER_DRAFT" });
    }
    dispatch({ type: "UPDATE_DRAFT_LOCATION", payload: { longitude, latitude } });
    // console.log(e.lngLat[0]);
    // console.log(longitude, latitude);
  };

  // {/*https://github.com/uber/react-map-gl*/}
  return (
    <div className={classes.root}>
      <ReactMapGL
        mapboxApiAccessToken="pk.eyJ1IjoiYXhlLXoiLCJhIjoiY2p2MTBocm9iMXBlZzN5cXhpNWVpbzZocyJ9.C4X44au9-srE13oqcUrQvw"
        width="100vw"
        height="calc(100vh - 64px)"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={viewport => setViewport(viewport)} //permet de deplacer
        {...viewport}
        onClick={handleMapClick}>
        <div className={classes.navigationControl}>
          <NavigationControl onViewportChange={viewport => setViewport(viewport)} />
        </div>
        {/*pin pour location*/}
        {userPosition && (
          <Marker
            latitude={userPosition.latitude}
            longitude={userPosition.longitude}
            offsetLeft={-19}
            offsetTop={-37}>
            {/* amener un icon */}
            <PinIcon color={"rgb(167, 12, 12)"} size={44} onClick={e => console.log("test")} />
          </Marker>
        )}

        {/* pin draft ajoutee */}
        {state.draft && (
          <Marker
            latitude={state.draft.latitude}
            longitude={state.draft.longitude}
            offsetLeft={-19}
            offsetTop={-37}>
            {/* amener un icon */}
            <PinIcon color={"rgb(217, 12, 12)"} size={44} onClick={e => console.log("test")} />
          </Marker>
        )}

        {/* blog pour Pin */}
      </ReactMapGL>
      <Blog />
    </div>
  );
};

const styles = {
  root: {
    display: "flex"
  },
  rootMobile: {
    display: "flex",
    flexDirection: "column-reverse"
  },
  navigationControl: {
    position: "absolute",
    top: 0,
    left: 0,
    margin: "1em"
  },
  deleteIcon: {
    color: "red"
  },
  popupImage: {
    padding: "0.4em",
    height: 200,
    width: 200,
    objectFit: "cover"
  },
  popupTab: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  }
};

export default withStyles(styles)(Map);
