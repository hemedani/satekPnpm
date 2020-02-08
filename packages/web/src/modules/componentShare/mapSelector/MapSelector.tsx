import classNames from "classnames";
import Leaflet from "leaflet";
import React, { CSSProperties, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Map, Marker, TileLayer } from "react-leaflet";
interface Props {
  className?: string;
  classNameMap?: string;
  style?: CSSProperties;
  mapStyle?: CSSProperties;
}

export const MapSelector: React.FC<Props> = ({
  style,
  mapStyle,
  className,
  classNameMap
}) => {
  const { setValue, register } = useFormContext();
  useEffect(() => {
    if (register) {
      register({ name: "location" });
    }
  });
  const [center, setCenter] = useState({
    lat: 34.79858082354426,
    lng: 48.514938354492195
  });
  const [marker, setMarker] = useState({
    lat: 34.79858082354426,
    lng: 48.514938354492195
  });
  const [zoom, setZoom] = useState(6);
  const [touched, setTouched] = useState(false);

  const updatePosition = (e: Leaflet.DragEndEvent) => {
    setTouched(true);
    setCenter(e.target._latlng);
    setMarker(e.target._latlng);
    setValue("location", "map for test");
  };

  return (
    <div
      className={classNames(className, "mapSelectionHospital-admin")}
      style={style}
    >
      <p className="headTitle-mapSelectionHospital-admin">
        انتخاب موقعیت جغرافیایی
      </p>
      <div
        className={classNames(
          "containerHorizontal-mapSelectionHospital-admin",
          { select: touched },
          { "no-select": !touched }
        )}
      >
        <Map
          onzoomend={e => setZoom(e.target._zoom)}
          className={classNames(classNameMap, "map")}
          zoomControl={false}
          center={center}
          zoom={zoom}
          style={mapStyle}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            draggable={true}
            onDragend={updatePosition}
            position={marker}
          />
        </Map>
      </div>
    </div>
  );
};
