import React, { Component } from 'react'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'

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
        return <BreadcrumbItem key={page}><a href={link}>{page}</a></BreadcrumbItem>
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
