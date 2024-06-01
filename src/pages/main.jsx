import React, { useCallback, useEffect, useRef, useState } from "react";
import "../styles/main.css";
import charCloud from "../images/character_cloud.svg";
import homeIcon from "../images/icon_home.svg";
import heartIcon from "../images/icon_heart.svg";
import messageIcon from "../images/icon_chat.png";
import userIcon from "../images/icon_profile.svg";
import { useNavigate } from "react-router-dom";
import { Sheet } from "react-modal-sheet";
import HeartedUserListPage from "./hearted_users";

const MainPage = () => {
  const mapRef = useRef(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const initMap = useCallback((position) => {
    const { latitude, longitude } = position.coords;

    const mapStyle = [
      {
        featureType: "all",
        stylers: [
          { saturation: -100 },
          { lightness: 50 }
        ]
      }
    ];

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: latitude, lng: longitude },
      zoom: 16,
      styles: mapStyle
    });

    new window.google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map: map,
      title: "현재 위치",
    });

    new window.google.maps.Circle({
      map: map,
      center: { lat: latitude, lng: longitude },
      radius: 500,
      fillColor: '#FF00A8',
      fillOpacity: 0.09,
      strokeColor: '#FF00A8',
      strokeOpacity: 0.8,
      strokeWeight: 5,
    });

    const randomLocations = Array.from({ length: 5 }, () => ({
      lat: latitude + (Math.random() - 0.5) / 100,
      lng: longitude + (Math.random() - 0.5) / 100,
    }));

    randomLocations.forEach((location, index) => {
      new window.google.maps.Marker({
        position: location,
        map: map,
        title: `Marker ${index + 1}`,
        icon: {
          url: charCloud,
          scaledSize: new window.google.maps.Size(50, 50),
        },
      });
    });
  }, [mapRef]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(initMap, (error) => {
        console.error("위치 정보를 가져오는데 실패했습니다.", error);
        initMap({
          coords: { latitude: -34.397, longitude: 150.644 }
        });
      });
    } else {
      console.error("이 브라우저는 지오로케이션을 지원하지 않습니다.");
      initMap({
        coords: { latitude: -34.397, longitude: 150.644 }
      });
    }
  }, [initMap]);

  const users = [
    { name: '요정', gender: '남성', status: '안녕하세용가리. ^^', emoji: '😊' },
    { name: '천사', gender: '여성', status: '안녕하세용가리. ^^', emoji: '😎' },
    { name: '요아정', gender: '남성', status: '안녕하세용가리. ^^', emoji: '😘' },
    { name: '그래놀라', gender: '여성', status: '안녕하세용가리. ^^', emoji: '😇' },
    { name: '자몽', gender: '여성', status: '안녕하세용가리. ^^', emoji: '😵' },
    { name: '꿀', gender: '남성', status: '안녕하세용가리. ^^', emoji: '😘' },
    { name: '허니', gender: '남성', status: '안녕하세용가리. ^^', emoji: '😴' },
    { name: '하니', gender: '남성', status: '안녕하세용가리. ^^', emoji: '😔' },
  ];

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
      <div className="map" ref={mapRef} style={{ height: '100%', width: '100%' }}></div>

      <button className="open-bottom-sheet" onClick={() => setOpen(true)}>
        Open List
      </button>

      <Sheet isOpen={open} onClose={() => setOpen(false)}>
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <div className="bottom-sheet-content">
              < HeartedUserListPage/>
            </div>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>

      <div className="bottom-bar">
        <div className="icon">
          <img src={homeIcon} alt="Home" />
        </div>
        <div className="icon" onClick={() => navigate(`/hearted`)}>
          <img src={heartIcon} alt="Heart" />
        </div>
        <div className="icon" onClick={() => navigate(`/hearted`)}>
          <img src={messageIcon} alt="Message" />
        </div>
        <div className="icon" onClick={() => navigate(`/userprofile/0`)}>
          <img src={userIcon} alt="User" />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
