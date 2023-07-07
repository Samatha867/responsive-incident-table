import React, { useEffect, useState } from 'react';
import './App.css';
import Icon from './components/Icon';
import fakeAPi from './utils/fake-api';
import { flatten, uniqBy, orderBy, filter } from 'lodash';
import moment from 'moment';

const PriorityIcon = {
  1: 'alarmHigh',
  2: 'alarmMedium',
  3: 'alarmLow',
};

type Locations = {
  name: 'Airport';
  id: 'airport';
};

type Incident = {
  name: string;
  id: number;
  priority: number;
  datetime: Date;
  locationId: string;
};

function App() {
  const [locations, SetLocations] = useState<Locations[]>([]);
  const [incidents, SetIncidents] = useState<Incident[]>([]);
  useEffect(() => {
    fakeAPi.getLocations().then((locResponse: Locations[]) => {
      const promiseLocations = locResponse?.map(({ id }) =>
        fakeAPi.getIncidentsByLocationId(id)
      );
      SetLocations(locResponse);
      Promise.all(promiseLocations).then((res: Incident[]) => {
        SetIncidents(
          orderBy(
            uniqBy(flatten(res), 'id'),
            ['priority', 'datetime'],
            ['asc', 'desc']
          )
        );
      });
    });
  }, []);

  return (
    <div className="container">
      <h3>Incidents</h3>
      <div className="table-card header">
        <div></div>
        <div className="table-row">
          <div>Date and Time</div>
          <div>ID</div>
          <div>Location Name</div>
          <div>Incident Name</div>
        </div>
      </div>
      {incidents?.map((inc) => (
        <div className="table-card" key={inc.id}>
          <div className="icon">
            <Icon name={PriorityIcon[inc.priority]}></Icon>
          </div>
          <div className="table-row">
            <div>{moment(inc.datetime).format('MM/DD/YYYY, hh:mm:ss A')}</div>
            <div>{inc.id}</div>
            <div>{filter(locations, ['id', inc.locationId])[0].name}</div>
            <div>{inc.name}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
