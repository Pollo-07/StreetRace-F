import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";



interface Props {
  lon:number
  lat:number,

}

export default function MapLibreBox({lon,lat}:Props) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;
    if (map.current) return;
  
    const position: [number, number] = [lon , lat];
    

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
      center: position,
      zoom: 14,
    });

    map.current.on("load", () => {
      new maplibregl.Marker({ color: "#22d3ee" })
        .setLngLat(position)
        .addTo(map.current!);
    });

    return () => {
    map.current?.remove();
    map.current = null;
  };
  }, [lat, lon]);

 


  return (
    <div
      ref={mapContainer}
      style={{
        height: 500,
        width: "100%",
        borderRadius: 10,
        overflow: "hidden",
      }}
    />
  );
}