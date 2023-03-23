import React, { useState, useEffect } from 'react'
import 'react-h5-audio-player/lib/styles.css'
import defaultImg from '../../assets/img/baner.jpg'
import { RadioBrowserApi } from 'radio-browser-api'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import './Radio.scss'

function Radio() {
  const [stations, setStations] = useState()
  const [stationFilter, setStationFilter] = useState('all')

  useEffect(() => {
    setupApi(stationFilter).then((data) => {
      setStations(data)
    })
  }, [stationFilter])

  const setupApi = async (stationFilter) => {
    const api = new RadioBrowserApi(fetch(window), 'My Radio App')

    const stations = await api.searchStations({
      language: 'english',
      tag: stationFilter,
      limit: 10,
    })

    return stations
  }

  const filters = ['metal', 'techno', 'jazz', 'rock', 'reggae']

  const setDefaultSrc = (event) => {
    event.target.src = defaultImg
  }

  return (
    <div className='radio-container backgroundInner box-shadow text'>
      <h3 className='card-title'>Radio</h3>
      <div className='border-line'></div>
      <div className='radio-box'>
        <div className='filters'>
          {filters.map((filter) => (
            <span
              key={filter}
              className={
                (stationFilter === filter ? 'selected' : '') && 'button-radio'
              }
              onClick={() => setStationFilter(filter)}
            >
              {filter}
            </span>
          ))}
        </div>
        <div className='stations'>
          {stations &&
            stations.map((station, index) => (
              <div className='station' key={index}>
                <div className='stationName text'>
                  <img
                    className='logo borderImg'
                    src={station.favicon}
                    alt='station logo'
                    onError={setDefaultSrc}
                  />
                </div>
                <div className='name-player-container'>
                  <div className='name'>{station.name}</div>

                  <AudioPlayer
                    showJumpControls={false}
                    layout='stacked'
                    customProgressBarSection={[]}
                    customControlsSection={['MAIN_CONTROLS', 'VOLUME_CONTROLS']}
                    autoPlayAfterSrcChange={false}
                    className='player button-TextInput'
                    src={station.urlResolved}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Radio
