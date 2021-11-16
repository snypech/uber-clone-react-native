import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import tw from 'tailwind-react-native-classnames'
import {GOOGLE_MAPS_APIKEY} from "@env";
import { useDispatch } from 'react-redux';
import { setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/core';
import NavFavourites from './NavFavourites';

const NavigateCard = () => {
  const dispatch= useDispatch();
  const navigation= useNavigation();
  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl border-b border-gray-200`}>Navigate Card</Text>
      <View style={tw`flex-shrink`}>
        <GooglePlacesAutocomplete
        placeholder="Where to?"
        styles={styles}
        fetchDetails={true}
        enablePoweredByContainer={false}
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={400}
        returnKeyType={"search"}
        minLength={2}
        onPress={(data,details=null)=>{
          dispatch(setDestination({
            location:details.geometry.location,
            description:data.description
          })
          );
          navigation.navigate('RideOptionsCard')
        }}
        query={{
          key:GOOGLE_MAPS_APIKEY,
          language:"en"
        }}
        />
      </View>
      <NavFavourites/>
    </SafeAreaView>
  )
}

export default NavigateCard

const styles = StyleSheet.create({
  container: {
    backgroundColor:"white",
    paddingTop:20,
    flex:0
  },
  textInput:{
    backgroundColor:"#DDDDDF",
    borderRadius:0,
    fontSize:18,
  },
  textInputContainer:{
    paddingHorizontal:20,
    paddingBottom:0
  }

})
