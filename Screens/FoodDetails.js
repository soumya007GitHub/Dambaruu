import { View, Text, Image, ScrollView, StyleSheet, ImageBackground } from "react-native";
export default FoodDetails = ({navigation, route })=>{
    // Accepting props from Homescreen to display them in this screen
    const { name, image, Recipe, foodgroup } = route.params;
    return (
        // Food Image as Image background
        <ImageBackground source={{uri : image}} blurRadius={20}>
        {/* ScrollView for scrolling screen */}
        <ScrollView style = {styles.scrollView}>
        {/* Food Image */}
        <Image source = {{uri : image}} style = {styles.image}/>
        {/* Other food details */}
        <View style = {styles.main}>
            <Text style = {styles.parentText}>
            <Text style = {styles.label}>Name :</Text> {name}
            </Text>
            <Text style = {styles.parentText}>
            <Text style = {styles.label}>Recipe Type :</Text> {Recipe.type}
            </Text>
            <Text style = {styles.parentText}>
            <Text style = {styles.label}>Cuisine Category : </Text>{Recipe.cuisine}
            </Text>
            <Text style = {styles.parentText}>
            <Text style = {styles.label}>Cooking Time Required : </Text>{Recipe.cookTime}</Text>
            <Text style = {styles.parentText}>
            <Text style = {styles.label}>Preparation Time Required : </Text>{Recipe.prepTime}</Text>
            <Text style = {styles.parentText}>
            <Text style = {styles.label}>Number Of Servings : </Text>{Recipe.servings}</Text>
            <Text style = {styles.parentText}>
            <Text style = {styles.label}>Food Type : </Text>{foodgroup}</Text>
            <Text style = {styles.parentText}>
            {/* Map function to display each ingrdient required in new line with numbering */}
            <Text style = {styles.label}>{`Ingredients Required : \n`}</Text>{Recipe.ingredients.map((ingredient, index) => (
        <Text key={index}>
            {index + 1}. {ingredient+"\n"}
        </Text>
    ))}</Text>
            <Text style = {styles.parentText}>
            {/* Map function to display each Instructions required in new line with numbering */}
            <Text style = {styles.label}>{`Instructions : \n`}</Text>{Recipe.instructions.map((instruction, index)=>(
                <Text key={index}>
            {index + 1}. {instruction+"\n"}
        </Text>
            ))}</Text>
        </View>
        </ScrollView>
        </ImageBackground>
    );
}
// Styling whole page with Stylesheet API
const styles = StyleSheet.create({
    scrollView : {
        paddingHorizontal : 20, 
        paddingVertical : 10,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    image : {
        width :"100%", 
        height : 250, 
        borderRadius : 20,
        marginBottom : 10,
    },
    main : { 
        flex: 1, 
        justifyContent: "flex-start", 
        alignItems: "center",
        paddingBottom : 20
    },
    parentText : {
        width : "100%",
        fontSize : 20,
        backgroundColor : "#e3e6e3",
        padding : 10,
        borderRadius : 8,
        marginBottom : 8,
    },
    label : {
        fontSize : 20, 
        fontWeight : "bold"
    }
})