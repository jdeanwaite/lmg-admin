import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './EditSectionHeader.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusSquare, faPlusSquare } from '@fortawesome/free-regular-svg-icons'

class EditSectionHeader extends Component {
  render () {
    const { title, minimize, onMinimizeToggle, isMinimized } = this.props;
    return (
      <div className={"EditSectionHeader"}>
        {minimize && <FontAwesomeIcon
          onClick={onMinimizeToggle}
          icon={isMinimized ? faPlusSquare : faMinusSquare}
          size="lg"
          color={this.props.color || "rgba(0, 0, 0, .87)"}
          className="icon"
        />}
        <p className="section-title">{title}</p>
      </div>
    )
  }
}

EditSectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  minimize: PropTypes.bool,
  onMinimizeToggle: PropTypes.func,
  isMinimized: PropTypes.bool
}

EditSectionHeader.defaultProps = {
  minimize: false,
  isMinimized: false
}

export default EditSectionHeader
