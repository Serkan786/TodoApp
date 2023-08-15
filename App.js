import React, { useState } from "react";
import {
    StyleSheet,
    View,
    SafeAreaView,
    Text,
    Button,
    FlatList,
    TextInput,
    TouchableOpacity,

} from "react-native";
import TopScreen from "./src/components/TopScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./src/screens/HomeScreen";
import DoneScreen from "./src/screens/DoneScreen";

const Stack = createNativeStackNavigator();


const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={"HomeScreen"} screenOptions={{headerShown: false}}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Done" component={DoneScreen} />

            </Stack.Navigator>
        </NavigationContainer>
    );
};



export default App;
