import React from "react";
import Select from "react-select";
import { themeOptions } from "../constants/themeOptions";
import { customStyles } from "../constants/customStyles";
const ThemeDropdown = ({ handleThemeChange, theme }) => {

  function translationList(f){
    for (let i = 0; i < f.length; i++){
        let temp = f[i].name
        f[i].label = <div className="flex items-center"><img className="h-5 mr-1" src={process.env.PUBLIC_URL  + `/lightmode_${f[i].name}.png`}/> {temp}</div>
    } 
    return f
  }
  function translation(f){


      let temp = f.name
      f.label = <div className="flex items-center"><img className="h-5 mr-1" src={process.env.PUBLIC_URL  + `/lightmode_${f.name}.png`}/> {temp}</div>

      return f
  }
  return (
    <Select
      placeholder={`Select Theme`}
      options= {translationList(themeOptions)}
      value={translation(theme)}
      styles={customStyles}
      onChange={handleThemeChange}
    />
  );
};

export default ThemeDropdown;

