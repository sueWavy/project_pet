import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  addStr: string;
}

function Map({ addStr }: MapProps) {
  // console.log(addStr);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { kakao } = window;
    if (!kakao || !mapRef.current) return;

    const mapContainer = mapRef.current;
    const mapOption = {
      center: new kakao.maps.LatLng(33.450791, 126.570667),
    };

    const map = new kakao.maps.Map(mapContainer, mapOption);
    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(addStr, function (result: any, status: any) {
      if (status === kakao.maps.services.Status.OK) {
        let coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        const marker = new kakao.maps.Marker({
          map: map,
          position: coords,
        });

        let infowindow = new kakao.maps.InfoWindow({});
        infowindow.open(map);
        map.setCenter(coords);
      }
    });
  }, [addStr]);

  return <div id="map" className="w-full h-96 mt-3" ref={mapRef}></div>;
}

export default Map;
