import React from 'react'
import {
  Map,
  Marker,
  Popup,
  TileLayer,
  WMSTileLayer,
  LayersControl,
} from 'react-leaflet'
import MapLayer from '../MapLayer/MapLayer'
import ForeCast from './ForeCast'
import GymDataService from '../../services/GymService'
import 'leaflet/dist/leaflet.css'

export default class MapView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      geodata: '',
      data: [],
    }
  }

  componentDidMount() {
    GymDataService.getAll().then((response) => {
      const data = response.data
      //console.log(data)
      //data.map((d) => console.log(d.location.coordinates))
      this.setState({ data })
    })
  }

  render() {
    const { data } = this.state
    const styleMap = { width: '100%', height: '80vh' }
    const { BaseLayer, Overlay } = LayersControl

    return (
      <div>
        <Map
          style={styleMap}
          center={this.props.coordCenter}
          zoom={this.props.zoom}
          ref={(m) => {
            this.leafletMap = m
          }}
        >
          {data.map((i) => (
            <Marker
              position={[i.location.coordinates[1], i.location.coordinates[0]]}
            >
              <Popup>
                <h5>{i.name}</h5>
                <br />
                <ForeCast
                  lat={i.location.coordinates[1]}
                  lon={i.location.coordinates[0]}
                  kind={i.kind.type}
                ></ForeCast>
              </Popup>
            </Marker>
          ))}

          <LayersControl position="topright">
            <BaseLayer checked name="OpenStreetMap">
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </BaseLayer>

            <BaseLayer name="Google Maps Satellite">
              <WMSTileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">2020 Google</a>'
                url="http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}"
              />
            </BaseLayer>
          </LayersControl>
        </Map>
        {/* <div >
          <button className="btn btn-success" onClick={this.handleZoomClick.bind(this, [37.955, -4.485])}>Zoom to</button>
        </div> */}
      </div>
    )
  }
}
