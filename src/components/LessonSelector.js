import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input } from 'reactstrap';

class LessonSelector extends Component {
  render () {
    const { lessons } = this.props;

    return (
      <Input
        type="select"
        name="lesson"
        id="lesson-selector"
        value={this.props.value || ""}
        onChange={event =>
          this.props.onChange(event.target.value)
        }
      >
        <option value="">Select a lesson</option>
        {lessons && lessons.length &&
        lessons.map(l => (
          <option key={l.id} value={l.id}>
            {l.name}
          </option>
        ))}
      </Input>
    )
  }
}

LessonSelector.propTypes = {
  lessons: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string
}

export default LessonSelector
