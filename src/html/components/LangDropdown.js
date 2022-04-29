import axios from "axios";
import { Dropdown } from "bootstrap";
import LangDropdownItem from "./LangDropdownItem";

const LangDropdown = (langList) => {
  var dropdownItems = [];
  //console.log(langList);
  var flagSrc = "flag-jp.png";
  if (langList.langList && langList.langList.length > 0) {
    var i = 0;
    langList.langList.map((lang) => {
      dropdownItems.push(
        <LangDropdownItem
          flag={lang.flag}
          handleClick={langList.handleClick}
          pos={i}
        />
      );
      i++;
    });
    flagSrc = langList.langList[langList.selectedLang].flag;
  }
  return (
    <div className="dropdown dropstart text-end display-inline float-right">
      <img
        src={require("../../img/" + flagSrc)}
        className="dropdown-toggle"
        data-bs-toggle="dropdown"
        width="70px"
        height="45px"
      />
      <ul className="dropdown-menu flag-dropdown">
        {dropdownItems}
        <li>
          <a className="dropdown-item blue" href="#" onClick={langList.openLangModal}>
            Add new
          </a>
        </li>
      </ul>
    </div>
  );
};

export default LangDropdown;
