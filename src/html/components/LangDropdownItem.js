const LangDropdownItem = (flag) => {
  return (
    <li>
      <a
        className="dropdown-item"
        href="#"
        onClick={() => flag.handleClick(flag.pos)}
      >
        <img className="flags" src={require("../../img/" + flag.flag)} />
      </a>
    </li>
  );
};

export default LangDropdownItem;
