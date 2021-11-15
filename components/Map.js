import React from 'react'
import { StyleSheet} from 'react-native'
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useSelector } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import { selectDestination, selectOrigin } from '../slices/navSlice';
import {GOOGLE_MAPS_APIKEY} from "@env";

const Map = () => {
  const origin = useSelector(selectOrigin);//redux selector
  const destination = useSelector(selectDestination)//redux selector
  return (
    <MapView
    style={tw`flex-1`}
    mapType="mutedStandard"
    initialRegion={{
      latitude: origin.location.lat,
      longitude: origin.location.lng,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    }}
    >
      {console.log(origin,destination)}
      {origin && destination && (
        <MapViewDirections
        origin={origin.description}
        destination={destination.description}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeWidth={3}
        strokeColor="black"
        lineDashPattern={[50]}

        />
      )}
    {origin?.location && (
      <Marker
        coordinate={{
          latitude: origin.location.lat,
          longitude: origin.location.lng,
        }}
        title='Origin'
        description={origin.description}
        identifier="origin"
      />
    )}  
    </MapView>
  )
}

export default Map

const styles = StyleSheet.create({})
