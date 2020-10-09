import React from 'react'
import MapView from '../components/MapView/MapView'
import SelectList from '../components/SelectList/SelectList'

class Map extends React.Component {
  constructor() {
    super()
    this.state = {
      coordCenter: [37.885963680860755, -4.774589538574219],
      gymName: '',
      zoom: 9,
    }
    this.gymChange = this.gymChange.bind(this)
  }

  gymChange = (data) => {
    let aData = data.split(',')
    this.setState({
      coordCenter: [aData[1], aData[0]], // cambio el orden por geojson longitude latitude
      gymName: aData[2],
      zoom: 14,
    })
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row m-3">
          <div className="col-12">
            <h1 className="text-center">Map View</h1>
          </div>
        </div>
        <div className="row m-3">
          <div className="col-sm-4 col-md-2">
            {/* Select */}
            <div class="form-group">
              <SelectList gymChange={this.gymChange} />
            </div>
          </div>
          {/* Map */}
          <div
            id="map"
            className="col-sm-8 col-sm-offset-4 col-md-10 col-md-offset-3"
          >
            <MapView
              coordCenter={this.state.coordCenter}
              zoom={this.state.zoom}
            />
          </div>
        </div>
        <div className="row m-3">
          <div className="col">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Type</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Type 1</td>
                  <td>name 1</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Type 2</td>
                  <td>name 2</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Type 1</td>
                  <td>name 3</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}
export default Map
