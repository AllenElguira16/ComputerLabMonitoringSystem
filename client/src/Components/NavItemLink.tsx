import React from "react";
import { NavItem, NavLink as BaseNavLink } from "reactstrap";
import { NavLink } from "react-router-dom";

interface Props {
  to: string;
}

const NavItemLink: React.FC<Props> = props => (
  <NavItem>
    <BaseNavLink tag={NavLink} to={props.to}>
      {props.children}
    </BaseNavLink>
  </NavItem>
);

export default NavItemLink;
