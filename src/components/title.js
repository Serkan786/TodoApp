import React from "react";
import{View,Text, StyleSheet} from "react-native";
    const Title= (props) => {
    console.log(props);
    return(
        <View>
     <Text style={[styles.title,{color:props.color}]}>{props.text}</Text>
 </View>
    );
};



const styles=StyleSheet.create({
title:{
    fontSize:28,

},
});
export default Title;

