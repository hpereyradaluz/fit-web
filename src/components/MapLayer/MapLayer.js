import React, { Component } from 'react'
import { GeoJSON } from 'react-leaflet'
import L from 'leaflet'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})

export default class MapLayer extends Component {
  leafletRef = React.createRef()

  componentWillReceiveProps(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.leafletRef.current.leafletElement.clearLayers()
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.leafletRef.current.leafletElement.addData(this.props.data)
    }
  }

  render() {
    return (
      <GeoJSON
        data={this.props.data}
        ref={this.leafletRef}
        onEachFeature={this.onEachFeature}
      />
    )
  }
}
