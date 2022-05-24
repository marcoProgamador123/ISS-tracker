import React,{Component} from "react";
import {
    View, 
    Text, 
    StyleSheet, 
    SafeAreaView,
    Platform,
    StatusBar,
    TouchableOpacity,
    ImageBackground,
    Image                
} from "react-native" ;
import ISSLocationScreen from "./ISSLocationScreen";


export default class HomeScreen extends React.Component{
    render(){
        return(
        
            <View style={styles.container}>
                <SafeAreaView style={styles.droidSafeArea}/>
                <ImageBackground source={require("../assets/bg_image.png")} 
                style={styles.backgroundImage} >

                <View style={styles.titleBar}>
                <Text style={styles.titleText}>
                    App Rastreador EEI
                </Text>
                </View>
                <TouchableOpacity style={styles.routeCard} onPress={()=>this.props.navigation.navigate("ISSLocation")} >
                    <Text style={styles.textCard}>
                       localização EEI 
                    </Text>
                    <Text style={styles.knowMore} >{"saiba mais --->"}</Text>
                    <Text style={styles.bgDigit} >1</Text>
                    <Image style={styles.iconImage} source={require("../assets/iss_icon.png")} ></Image>
                </TouchableOpacity>

                <TouchableOpacity style={styles.routeCard} onPress={()=>this.props.navigation.navigate("Meteor")} >
                    <Text style={styles.textCard}>
                        Meteoros
                    </Text>
                    <Text style={styles.knowMore} >{"saiba mais --->"}</Text>
                    <Text style={styles.bgDigit} >2</Text>
                    <Image style={styles.iconImage} source={require("../assets/meteor_icon.png")} ></Image>
                </TouchableOpacity>
            </ImageBackground>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1
    },
    titleText:{
        fontSize:40,
        fontWeight:"bold",
        color:"white"
    },
    droidSafeArea:{
      marginTop:Platform.OS==="android"?StatusBar.currentHeight:0  
    },
    titleBar:{
        flex:0.15,
        justifyContent:"center",
        alignItems:"center"
    },
    routeCard:{
        flex:0.25,
        justifyContent:"center",
        alignItems:"center",
        marginLeft:50,
        marginRight:50,
        marginTop:50,
        borderRadius:30,
        backgroundColor:"white"
    },
    textCard:{
        fontWeight:"bold",
        fontSize:35,
        color:"black",
        marginTop:75,
        paddingLeft:30
    },
    backgroundImage:{
        flex:1,
        resizeMode:"cover"
    },
    knowMore:{
        paddingLeft:30,
        color:"red",
        fontSize:15
    },
    bgDigit:{
        position:"absolute",
        color:"rgba(183,183,183,0.5)",
        fontSize:150,
        right:20,
        bottom:-15,
        zIndex:-1
    },
    iconImage:{
        position:"absolute",
        height:200,
        width:200,
        resizeMode:"contain",
        right:20,
        top:-80
    }
})
