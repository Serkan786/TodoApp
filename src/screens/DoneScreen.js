import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image, SafeAreaView,} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";


const DoneScreen = ({navigation}) => {
    const [doneTodos, setDoneTodos] = useState([])

    const handleDelete = ({index}) => {
        const arr = doneTodos;
        arr.splice(index, 1);
        setDoneTodos(arr);
        saveDoneTodos();
    }

    const renderItem = ({item, index}) => {
        return (
           <View style={{flexDirection:'row',justifyContent:"space-between",alignItems:"center",paddingTop:10,paddingHorizontal:15,}}>
               <Text>{item} </Text>
               <TouchableOpacity style={{backgroundColor:'red',width:40,marginRight:5, height:30,alignItems:'center', borderRadius:50,marginLeft:200}}
               onPress={() =>
                   handleDelete({index})
               }
               >
                   <Text style={{color:"white",}}>Sil</Text>
               </TouchableOpacity>
           </View>
        )
    }


    const getDoneTodos = async () => {
        try {
            const savedDoneTodosJson = await AsyncStorage.getItem('DoneTodos');
            if (savedDoneTodosJson !== null) {
                setDoneTodos(JSON.parse(savedDoneTodosJson))
            }
        } catch (error) {
            console.log("Error loading todos:", error);
        }
    }

    const saveDoneTodos = async () => {
        try {
            const jsn = JSON.stringify(doneTodos)
            const savedDoneTodosJson = await AsyncStorage.setItem('DoneTodos', jsn);
        } catch (error) {
            console.log("Error loading todos:", error);
        }
    }

    useEffect(() => {
        getDoneTodos();
    }, [])

    useEffect(() => {
        getDoneTodos();
    }, [doneTodos])


    return (
        <SafeAreaView style={{flex:1}}>
            <View style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 20,
                height: 60,
                backgroundColor: "red",
                flexDirection: "row"
            }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{width: 25, height: 25}}>
                    <Image style={{height: 25, width: 25}} source={require("my-app/assets/previous.png")}/>
                </TouchableOpacity>
                <Text style={{fontSize: 24, color: "white", width: "100%", textAlign: "center"}}>YAPILANLAR</Text>
            </View>
            <FlatList data={doneTodos} renderItem={renderItem}/>
        </SafeAreaView>
    );
}
export default DoneScreen;
