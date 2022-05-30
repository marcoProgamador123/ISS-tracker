import React, { Component } from "react";
import { Text, 
    View, 
    StyleSheet, 
    SafeAreaView, 
    StatusBar, 
    TouchableOpacity, 
    Platform, 
    ImageBackground, 
    Image, 
    Alert,
    FlatList } from "react-native";
import axios from "axios";

const bgImage = require("../assets/meteor_bg.jpg")
const MeteorIcon = require("../assets/meteor_icon.png")

export default class MeteorScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            meteor: {}
        }
    }
    componentDidMount() {
        this.getMeteor()
    }
    getMeteor = () => {
        axios
            .get("https://api.nasa.gov/neo/rest/v1/feed?api_key=4dl3fPhRgdyR6zX5tpUBwoLbtKmlqqQC5YLahtUq")
            .then(response => {
                this.setState({ meteor: response.data.near_earth_objects })
            })
            .catch(error => {
                Alert.alert(error.message)
            })
    }
    keyExtractor=(item,index)=>{
      index.toString()  
    }
    renderItem(item) {
        var meteor=item
        var bgImg,speed,size

        if (meteor.threat_score<=30) {
            bgImg=require("../assets/meteor_bg1.png")
            speed=require("../assets/meteor_speed3.gif")
            size=100
        } else if(meteor.threat_score<=75){
            bgImg=require("../assets/meteor_bg2.png")
            speed=require("../assets/meteor_speed3.gif")
            size=150
        }else{
            bgImg=require("../assets/meteor_bg3.png")
            speed=require("../assets/meteor_speed3.gif")
            size=200
        }
        <View>
            <ImageBackground source={bgImg} style={styles.backgroundImage}>
            <View style={styles.gifContainer}>
                <Image source={speed} style={{width:size,height:size,alignSelf:"center"}}></Image>
                <View>
                    <Text style={[styles.cardTitle,{marginTop:400,marginLeft:50}]}>
                        {item.name}
                    </Text>
                    <Text style={[styles.cardText, { marginTop: 20, marginLeft: 50 }]}>Mais Próximo da Terra - {item.close_approach_data[0].close_approach_date_full}</Text>
              <Text style={[styles.cardText, { marginTop: 5, marginLeft: 50 }]}>Diâmetro Mínimo (KM) - {item.estimated_diameter.kilometers.estimated_diameter_min}</Text>
              <Text style={[styles.cardText, { marginTop: 5, marginLeft: 50 }]}>Diâmetro Máximo (KM) - {item.estimated_diameter.kilometers.estimated_diameter_max}</Text>
              <Text style={[styles.cardText, { marginTop: 5, marginLeft: 50 }]}>Velocidade (KM/H) - {item.close_approach_data[0].relative_velocity.kilometers_per_hour}</Text>
              <Text style={[styles.cardText, { marginTop: 5, marginLeft: 50 }]}>Distância da Terra (KM) - {item.close_approach_data[0].miss_distance.kilometers}</Text>
                </View>
            </View>
            </ImageBackground>
        </View>
        
    }
    render() {
        if (Object.keys(this.state.meteor).lenght === 0) {
            return (
                <View style={styles.loading}>
                    <Text>
                        Loading...
                    </Text>
                </View>
            )
        } else {
            var meteorArrey = Object.keys(this.state.meteor).map(meteorDate => {
                return this.state.meteor[meteorDate]
            })
            var meteors = [].concat.apply([], meteorArrey)
            meteors.forEach(element => {
                var diameter = (element.estimated_diameter.kilometers.estimated_diameter_min + element.estimated_diameter.kilometers.estimated_diameter_max) / 2
                var threatScore = (diameter / element.close_approach_data[0].miss_distance.kilometers) * 1000000000
                element.threat_score = threatScore
            });
            meteors.sort(function (a, b) {
                return b.threat_score - a.threat_score
            })
            meteors = meteors.slice(0, 5)
            return (
                <View style={styles.container}>
                    <SafeAreaView style={styles.droidSafeArea} />
                    <FlatList
                        keyExtractor={this.keyExtractor}
                        data={meteors}
                        renderItem={this.renderItem}
                        horizontal={true}
                    />
                </View >
            )
        }


    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    titleBar: {
        flex: 0.15,
        justifyContent: "center",
        alignItems: "center"
    },
    titleText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white"
    },
    meteorContainer: {
        flex: 0.85
    },
    listContainer: {
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
        justifyContent: "center",
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        borderRadius: 10,
        padding: 10
    },
    cardTitle: {
        fontSize: 20,
        marginBottom: 10,
        fontWeight: "bold",
        color: "white"
    },
    cardText: {
        color: "white"
    },
    threatDetector: {
        height: 10,
        marginBottom: 10
    },
    gifContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    meteorDataContainer: {
        justifyContent: "center",
        alignItems: "center",

    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

//4dl3fPhRgdyR6zX5tpUBwoLbtKmlqqQC5YLahtUq
//