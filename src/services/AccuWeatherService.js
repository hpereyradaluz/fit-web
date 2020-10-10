import http from '../http-common'

const getPositionSearch = (lat, lon) => {
  return http.get(
    `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=FKvNoHRcfR1zwcvOmicvAlMJiTCQYSG6&q=${lat}%2C%20${lon}&language=es-Es`
  )
}

const getOneHrOfHourlyForecasts = (key) => {
  return http.get(
    `http://dataservice.accuweather.com/forecasts/v1/hourly/1hour/${key}?apikey=FKvNoHRcfR1zwcvOmicvAlMJiTCQYSG6&language=es-ES`
  )
}

const getTwelveHsOfHourlyForecasts = (key) => {
  return http.get(
    `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${key}?apikey=FKvNoHRcfR1zwcvOmicvAlMJiTCQYSG6&language=es-ES`
  )
}

export default {
  getPositionSearch,
  getOneHrOfHourlyForecasts,
  getTwelveHsOfHourlyForecasts,
}
