import { useEffect, useRef } from "react";

// Map 컴포넌트에 전달되는 props 타입 정리
interface MapProps {
  addStr: string;
}

function Map({ addStr }: MapProps) {
  // useRef 을 사용해 지도를 렌더링할 div요소 참조 생성
  const mapRef = useRef<HTMLDivElement>(null);

  // 컴포넌트가 마운트 또는 데이터가 변경될 때 함수 실행
  useEffect(() => {
    // window 객체에서 카카오 가져오기
    const { kakao } = window;
    // 카카오가 존재하지 않거나 mapRef이 null 이면 실행 중단
    if (!kakao || !mapRef.current) return;

    // 지도 렌더링할 div 가져오기
    const mapContainer = mapRef.current;
    // 지도 옵션 설정
    const mapOption = {
      center: new kakao.maps.LatLng(33.450791, 126.570667), // 지도 중심 좌표 설정(LatLng)
    };

    // 새로운 지도 객체, 지오코더 생성
    const map = new kakao.maps.Map(mapContainer, mapOption);
    const geocoder = new kakao.maps.services.Geocoder();

    // 주소 검색을 통해 좌표 및 마커 표시하기
    geocoder.addressSearch(addStr, function (result: any, status: any) {
      if (status === kakao.maps.services.Status.OK) {
        // 검색 결과에서 첫 번째 항목 좌표 가져오기
        let coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        // 마커 생성 및 설정
        const marker = new kakao.maps.Marker({
          map: map, // 지도에 마커 표시
          position: coords, // 마커 위치 설정
        });
        // 정보창 생성
        let infowindow = new kakao.maps.InfoWindow({
          content:
            '<div style="width:150px;text-align:center;padding:6px 0; color:black;">근처에서 만나요</div>',
        });
        // 정보창 열기
        infowindow.open(map, marker);
        // 검색한 위치를 중심으로 설정
        map.setCenter(coords);
      }
    });
    // addStr(주소명) 바뀔 때 마다 실행
  }, [addStr]);

  // 지도 렌더링 div 반환
  return <div id="map" className="w-full h-96 mt-3" ref={mapRef}></div>;
}

export default Map;
