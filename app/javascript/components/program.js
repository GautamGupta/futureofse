
import React from 'react'

import Term from './term'

class Program extends React.Component {
  render() {
    return (
      <div className={`program program-${this.props.vertical ? 'vertical' : 'scroll'}`}>
        { this.props.program.terms.map((term) => (
          <Term key={term} courses={this.props.courses} editable={this.props.editable} term={this.props.program[term]} name={term} />
        )) }
      </div>
    )
  }
}

export default Program
