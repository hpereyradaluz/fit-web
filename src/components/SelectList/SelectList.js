import React from 'react'
import GymDataService from '../../services/GymService'

class SelectList extends React.Component {
  state = {
    data: [],
    selectCoord: '',
  }

  selectListChange = (e) => {
    if (e.target.value) {
      this.setState({
        selectCoord: e.target.value,
      })
    }
  }

  componentDidMount() {
    GymDataService.getAll().then((response) => {
      const data = response.data
      this.setState({ data })
    })
  }

  render() {
    const { data } = this.state
    return (
      <div>
        <label>Gyms</label>
        <select className="form-control" onChange={this.selectListChange}>
          <option value="">Select a Gym</option>
          {data.map((m) => (
            <option
              key={m._id}
              value={[m.location.coordinates, m.name, m.code]}
            >
              {m.name}
            </option>
          ))}
        </select>
        <button
          className="btn btn-outline-primary mt-3 mb-3"
          disabled={!this.state.selectCoord}
          onClick={this.props.gymChange.bind(this, this.state.selectCoord)}
        >
          Load
        </button>
      </div>
    )
  }
}
export default SelectList
