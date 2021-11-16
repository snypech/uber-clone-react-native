import { useNavigation } from '@react-navigation/core'
import React, {useState} from 'react'
import { StyleSheet, Text, View ,SafeAreaView, TouchableOpacity, FlatList, Image} from 'react-native'
import { Icon } from 'react-native-elements'
import { useSelector } from 'react-redux'
import tw from 'tailwind-react-native-classnames'
import { selectTravelTimeInformation } from '../slices/navSlice'

const data=[
  {
    id:"Uber-X-123",
    title:"Uber-X",
    multiplier:1,
    image:"https://links.papareact.com/3pn"
  },
  {
    id:"Uber-XL-456",
    title:"Uber-XL",
    multiplier:1.2,
    image:"https://links.papareact.com/5w8"
  },
  {
    id:"Uber-LUX-789",
    title:"Uber-LUX",
    multiplier:1.75,
    image:"https://links.papareact.com/7pf"
  }
]
//WHEN UBER TOO BUSY
const SURGE_CHARGE_RATE= 1.5;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selectedCar, setSelectedCar] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <View>
        <TouchableOpacity 
        onPress={()=>navigation.navigate('NavigateCard')}
        style={tw`absolute top-4 left-5 z-50 p-1 rounded-full`}
        // z-50 for stack oder
        >
          <Icon name="chevron-left" type="fontawesome"/>
        </TouchableOpacity>
        <Text style={tw`text-center text-xl py-3`}>Select a Ride - {travelTimeInformation?.distance?.text}</Text>
      </View>
      <FlatList
      data={data}
      keyExtractor={(item)=>item.id}
      renderItem={({item:{id,image,title,multiplier},item})=>(
        <TouchableOpacity 
        onPress={()=>setSelectedCar(item)}
        style={tw`flex-row items-center justify-evenly ${id===selectedCar?.id && "bg-gray-200"}`}>
          <Image
          style={{width:100,height:100,resizeMode:"contain"}}
          source={{uri:image}}
          />
          <View style={tw`-ml-6`}>
            <Text style={tw`text-xl font-semibold`}>{title}</Text>
            <Text>{travelTimeInformation?.duration?.text} travel time</Text>
          </View>
          <Text style={tw`text-xl`}>
            {/* {new Intl.NumberFormat('en-gb',{
              style:"currency",
              currency:"GBP"
            }).format(
              (travelTimeInformation?.duration?.value * SURGE_CHARGE_RATE * multiplier)/100
            )} */}
            $ {parseInt(travelTimeInformation?.duration?.value * SURGE_CHARGE_RATE* multiplier * 10)}
          </Text>
        </TouchableOpacity>
      )}
      />
      <View>
        <TouchableOpacity disabled={!selectedCar} style={tw`bg-black py-2 m-3 ${!selectedCar && 'bg-gray-200'}`}>
          <Text style={tw`text-white text-xl text-center`}>Choose {selectedCar?.title}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default RideOptionsCard

const styles = StyleSheet.create({})
