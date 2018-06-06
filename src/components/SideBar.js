import React, { Component } from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'
import './SideBar.css';
import { Link } from 'react-router-dom'

export default class SideBar extends Component {
  render () {
    const {location} = this.props
    const {pathname} = location
    return (
      <div className="SideBar">
        <Nav vertical className="sidebar bg-white hidden-xs-down">
          {/*<NavItem>*/}
          {/*<NavLink active={pathname === '/admin/dashboard'} href="/admin/dashboard">Dashboard</NavLink>*/}
          {/*</NavItem>*/}
          <h1>Admin</h1>
          <NavItem>
            <NavLink tag={Link} active={pathname === '/admin/lessons'} to="/admin/lessons">Lessons</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} active={pathname === '/admin/principles'} to="/admin/principles">Principles</NavLink>
          </NavItem>
          {/*<NavItem>*/}
            {/*<NavLink active={pathname === '/admin/users'} href="/admin/users">Users</NavLink>*/}
          {/*</NavItem>*/}
        </Nav>
      </div>
    )
  }
}
