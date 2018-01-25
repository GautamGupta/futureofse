
import React from 'react'
import {connect} from 'react-redux'

class FinalStageView extends React.Component {
  submit() {
    // Should never be called
  }
  componentDidMount() {
    this.props.submitHook(this.submit.bind(this))
  }
  render() {
    let classreps = null
    if (this.props.cls && this.props.contact.classreps.hasOwnProperty(this.props.cls)) {
      classreps = (<div className="col-md">
          For general class-specific comments/concerns, contact your class reps:
          <ul>
            {this.props.contact.classreps[this.props.cls].map(person => (
              <li key={person.name}>{person.name} &lt;<a href={`mailto:${person.email}`}>{person.email}</a>&gt;</li>
            ))}
          </ul>
        </div>)
    }

    return (<div className="final-stage container">
        <h4>Thanks for submitting your feedback!</h4>
        <br />
        <p>
          This site is brought to you by Bilal Akhtar &lt;me@itsbilal.com&gt; and Dave Pagurek Van Mossel &lt;dave@davepagurek.com&gt;.
          Shoot us an email if you have any questions/comments/bug reports.
          Or if you're adventurous,
          you can dive into and fix <a href="http://github.com/itsbilal/futureofse">this site's source code</a> yourself - it's all
          open source &#x1f60a;
        </p>
        <div className="row">
          <div className="col-md">
            For more comments/suggetions/feedback on the SE curriculum, feel free to reach out
            to these members of the SE curriculum committee:
            <ul>
              {this.props.contact.curriculum.map(person => (
                <li key={person.name}>{person.name} ({person.type}) &lt;<a href={`mailto:${person.email}`}>{person.email}</a>&gt;</li>
              ))}
            </ul>
          </div>
          {classreps}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentStage: state.stage.num,
    current: state.stage.current,
    contact: state.stage.current.contact,
    cls: state.voter.cls,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const Cont = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FinalStageView)

export default Cont
