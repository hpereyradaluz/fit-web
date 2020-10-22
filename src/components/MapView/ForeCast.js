import React, { Component } from 'react'
import AccuWeatherService from '../../services/AccuWeatherService'

export default class Forecast extends Component {
  state = {
    positionData: [],
    forecast: [],
  }

  componentDidMount() {
    console.log(this.props.lat)
    console.log(this.props.lon)
    AccuWeatherService.getPositionSearch(this.props.lat, this.props.lon).then(
      (response) => {
        const key = response.data.Key
        const positionData = response.data
        console.log(positionData)
        this.setState({ positionData })

        AccuWeatherService.getTwelveHsOfHourlyForecasts(key).then(
          (response) => {
            const forecast = response.data
            console.log(forecast)
            this.setState({ forecast })
          }
        )
      }
    )
  }

  render() {
    return (
      <div>
        {this.props.kind === 'Open'
          ? this.state.forecast.map(
              (i) =>
                i.DateTime.substr(11, 2) +
                ' hs ' +
                (i.HasPrecipitation ? 'rain ' : 'open ')
            )
          : this.props.kind}
      </div>
    )
  }
}
