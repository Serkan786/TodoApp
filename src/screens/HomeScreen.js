import React, { useState,useEffect } from "react";
import {Button, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import DoneScreen from "./DoneScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HTHeader from "../components/Header";

const HomeScreen = ({ navigation }) => {
    const [todos, setTodos] = useState([]);
    const [doneTodos, setDoneTodos] = useState([]);
    const [text, setText] = useState("");

    const loadTodos = async () => {
        try {
            const savedTodosJson = await AsyncStorage.getItem('Todos');
            if (savedTodosJson !== null) {
                setTodos(JSON.parse(savedTodosJson))
            }
            const savedDoneTodosJson = await AsyncStorage.getItem('DoneTodos');
            if (savedDoneTodosJson !== null) {
                setDoneTodos(JSON.parse(savedDoneTodosJson))
            }
        }
        catch (error) {
            console.log("Error loading todos:", error);
        }
    };

    const saveTodos = async () => {
        try {
            const jsn = JSON.stringify(todos)
            await AsyncStorage.setItem('Todos', jsn);
        }
        catch (error) {

            console.log("Error saving todos:", error);
        }
    };

    useEffect(() => {
        loadTodos()
    }, [todos])

    const handleAddTodo = () => {
        if (text.trim() !== "") {
            const temparr = todos
            temparr.push(text)
            setTodos(temparr)
            saveTodos()
            setText("");
        }
    };

    const handleMarkAsDone = (index) => {
        const temparr = doneTodos;
        temparr.push(todos[index]);
        setDoneTodos(temparr);
        saveDoneTodos();
        deleteTodo(index);
    };

    const deleteTodo = (index) => {
        const temparr = todos;
        temparr.splice(index, 1);
        setTodos(temparr)
        saveTodos();
    }

    const saveDoneTodos = async () => {
        try {
            const jsn = JSON.stringify(doneTodos)
            await AsyncStorage.setItem('DoneTodos', jsn);
        }
        catch (error) {
            console.log("Error saving todos:", error);
        }
    };

    const handleNavigation = () => {

        navigation.navigate("Done")
        setDoneTodos([])
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar/>
            <HTHeader/>

            <View style={styles.buttoncontainer}>
                <Button title={"YAPILACAKLA"} />
                <Button title={"YAPILANLAR"} onPress={() => handleNavigation()} />
            </View>
            <View style={{ justifyContent: "center", alignItems: "flex-start", width: "100%", padding: 20 }}>
                {todos.map((item, index) => (
                    <View key={index} style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                        <TouchableOpacity style={styles.iconContainer} onPress={() => handleMarkAsDone(index)}>
                            <Icon name="check" size={15} color="white" />
                        </TouchableOpacity>
                        <Text>{item}</Text>

                    </View>
                ))}
            </View>
            <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                <TextInput
                    placeholder="Habertürk"
                    onChangeText={setText}
                    value={text}
                    style={styles.textInput}
                />
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={handleAddTodo}>
                    <Icon name="check" size={20} color="green"  />
                </TouchableOpacity>


            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginTop:0,

    },
    buttoncontainer: {
        width: "100%",
        paddingHorizontal: 20,
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    iconContainer: {
        height: 30,
        width: 30,
        backgroundColor: "red",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    textInput: {
        marginRight: 20,
        width: "50%",
        borderRadius: 10,
        borderColor: "blue",
        paddingHorizontal: 10,
        borderWidth: 2,
        marginLeft: 50,
    },
    addButton: {
        borderWidth: 2,
        paddingVertical: 6,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 3,
        borderColor: "blue",
        borderRadius: 100,
    },
});

export default HomeScreen;
