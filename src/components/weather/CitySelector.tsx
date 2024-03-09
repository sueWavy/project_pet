import React from "react";

interface CitySelectorProps {
  selectedCity: string;
  handleCityChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CitySelector: React.FC<CitySelectorProps> = ({
  selectedCity,
  handleCityChange,
}) => {
  return (
    <select
      value={selectedCity}
      onChange={handleCityChange}
      className="bg-inherit"
    >
      <option value={"Seoul"}>서울</option>
      <option value={"Incheon"}>인천</option>
      <option value={"Seongnam"}>성남</option>
      <option value={"Anyang"}>안양</option>
      <option value={"Goyang"}>고양</option>
      <option value={"Suwon"}>수원</option>
      <option value={"Busan"}>부산</option>
      <option value={"Daegu"}>대구</option>
      <option value={"Gwangju"}>광주</option>
      <option value={"Daejeon"}>대전</option>
      <option value={"Ulsan"}>울산</option>
    </select>
  );
};

export default CitySelector;
