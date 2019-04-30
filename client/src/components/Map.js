import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import ReactMapGL, { NavigationControl } from "react-map-gl"; //NavigationControl donne les control de zoom
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import DeleteIcon from "@material-ui/icons/DeleteTwoTone";

const INITIAL_VIEWPORT = {
  latitude: 45.50884,
  // latitude: 37.7577,

  longitude: -73.58781,
  // longitude: -122.4376,

  zoom: 13
};

const Map = ({ classes }) => {
  const [viewport, setViewport] = useState(INITIAL_VIEWPORT);

  return (
    <div className={classes.root}>
      <ReactMapGL
        mapboxApiAccessToken="pk.eyJ1IjoiYXhlLXoiLCJhIjoiY2p2MTBocm9iMXBlZzN5cXhpNWVpbzZocyJ9.C4X44au9-srE13oqcUrQvw"
        width="100vw"
        height="calc(100vh - 64px)"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={viewport => setViewport(viewport)} //permet de deplacer
        {...viewport}>
        <div className={classes.navigationControl}>
          <NavigationControl onViewportChange={viewport => setViewport(viewport)} />
        </div>
      </ReactMapGL>
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
