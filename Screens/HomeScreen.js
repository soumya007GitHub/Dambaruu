import { View, SafeAreaView, FlatList, Image, Text, ActivityIndicator, useWindowDimensions, StyleSheet, Pressable, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";

export default function HomeScreen(){
  const navigation = useNavigation();
    const windowWidth = useWindowDimensions().width;    // Initial window width
  const [isLoading, setisLoading] = useState(true);     // Initial loading animation 
  const [foodList, setFoodList] = useState([]);         // Empty FoodList array at initial
  const [isRefreshing, setisRefreshing] = useState(false);    // Swipe down to refresh initially false
  const [columns, setColumns] = useState(windowWidth > 600 ? 4 : 2)  // number of columns for phone, tablet are 2 & 4
  const fetchData = async ()=>{
    try{
    const response = await fetch(`https://api.npoint.io/32399b015cfb1d04b83e`);
    const data = await response.json();
    setFoodList(data);       // once data got from API passing it in JSON format to display
    setisLoading(false);     // initial loading now set to false once data displayed
    }catch(error){
      console.error("Error fetching data: ", error);
      setisLoading(false);
    }
  };
  useEffect(()=>{
    fetchData();          // When initially app launched to run data fetch function
  }, []);
  useEffect(() => {
    setColumns(windowWidth > 600 ? 4 : 2);   // dependent on windowWidth to set number of columns for phone and tablet in Homescreen
  }, [windowWidth]);
  if(isLoading){       // loader component
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00f" />
        <Text>Loading ...</Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style = {styles.container}>
    {/* FlatList to display data in cards */}
      <FlatList data = {foodList} renderItem = {({item})=>{
        return (
          <View style = {[styles.card, {flex : 1/columns}]}>
            <View style = {styles.cardImg}>
            {/* Image pressable to redirect to food details page with props */}
             <Pressable onPress = {()=>{navigation.navigate("Food Details", {
                    name : item.title,
                    image : item.url,
                    Recipe : item.Recipe,
                    foodgroup : item.foodgroup
                })}}>
              <Image source = {{ uri : item.url}} style = {{width : "100%", height : "100%", borderRadius : 20}}/>
              </Pressable>
            </View>
            {/* Card body with food title and food category */}
            <View style = {styles.cardBody}>
              <Text style = {styles.cardTitle}>{item.title}</Text>
              <Text style = {styles.cardCategory}>{item.foodgroup}</Text>
            </View>
    </View>
        )
      }}
      ItemSeparatorComponent={()=>{      // each card separator with gaps
        return <View style = {{height : 16}}/>
      }}
      ListEmptyComponent={()=>{         // If nothing to be display from API, display this message
          return <Text>No Food Items Found</Text>
        }}
        ListFooterComponent={()=>{      // FlatList footer
          return <Text style = {{alignSelf : "center"}}>End of Food Items</Text>
        }}
        refreshing = {isRefreshing}     // swipe down refresher to refresh page
        onRefresh = {()=>{
          setisRefreshing(true);
          setisRefreshing(false);
        }}
        numColumns={columns}       // number of columns for phone and tablet
        key={columns}              // unique identifier of each food card
      />
      </SafeAreaView>
  )
}
// Styling HomeScreen with Stylesheet API
const styles = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor : "#fff",
    paddingHorizontal : 8,
    paddingBottom : 8
  },
    loadingContainer : {
      flex : 1,
      alignItems : "center",
      justifyContent : "center"
    },
    cardsList : {
      flex : 1,
      flexDirection : "row",
      flexWrap : "wrap",
      justifyContent : "space-between"
    },
    card : {
      backgroundColor : "#fff",
      borderRadius : 20,
      elevation : 15,
      margin : 10,
      flex  : 0.5
    },
    cardImg : {
      height : 200,
      resizeMode : "cover"
    },
    image : {
      width : "100%",
    },
    cardBody : {
      textAlign : "center",
      paddingBottom : 8
    },
    cardTitle : {
      fontSize : 20,
      fontWeight : "bold",
      alignSelf : "center",
      textAlign : "center",
      marginBottom : 8
    },
    cardCategory : {
      alignSelf : "center",
      textAlign : "center"
    }
  })