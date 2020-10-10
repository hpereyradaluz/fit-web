import React from 'react'
import MapView from '../components/MapView/MapView'
import SelectList from '../components/SelectList/SelectList'

class Map extends React.Component {
  constructor() {
    super()
    this.state = {
      //coordCenter: [37.885963680860755, -4.774589538574219],
      coordCenter: [-34.8717779, -56.1674311],
      gymName: '',
      zoom: 12,
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
      </div>
    )
  }
}
export default Map
