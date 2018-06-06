import React, { Component } from 'react'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { Link } from 'react-router-dom'

export default class Breadcrumbs extends Component {
  render () {
    const {location} = this.props
    const crumbs = location.pathname
      .split('/')
      .filter(p => !!p)
      .map((page, index, array) => {
        let link = ""
        for (let i = 0; i <= index; i++) {
          link += `/${array[i]}`
        }
        return <BreadcrumbItem key={page}><Link to={link}>{page}</Link></BreadcrumbItem>
      })
    return (
      <div>
        <Breadcrumb>
          {crumbs}
        </Breadcrumb>
      </div>
    )
  }
}
