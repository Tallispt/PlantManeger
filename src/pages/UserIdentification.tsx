import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Dimensions
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { Alert } from 'react-native';

export function UserIdentification() {
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [noName, setNoName] = useState(true)
    const [name, setName] = useState<string>();

    const navigation = useNavigation();

    function handleInputBlur() {
        setIsFocused(false);
        setIsFilled(!!name);
    }

    function handleInputFocus() {
        setIsFocused(true);
    }

    function handleInputChange(value: string) {
        setIsFilled(!!value);
        setName(value);
    }

    async function handleSubmit() {
        if (!name) return Alert.alert("Me diz como devo chamar você 😥");

        try {
            await AsyncStorage.setItem("@plantmanager:user", name);
            navigation.navigate("Confirmation", {
                title: "Prontinho",
                subtitle:
                    "Agora vamos começar a cuidar das suas plantinhas com muito cuidado.",
                buttonTitle: "Começar",
                icon: "smile",
                nextScreen: "PlantSelect",
            });
        } catch {
            Alert.alert("Não foi possível salvar o seu nome 😥");
        }
    }

    return (
        <SafeAreaView style={style.container} >

            <KeyboardAvoidingView
                style={style.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                    <View style={style.content} >

                        <View style={style.form} >
                            <View style={style.header}>

                                <Text style={style.emoji} >
                                    {isFilled ? '😄' : '😃'}
                                </Text>

                                <Text style={style.title} >
                                    Como podemos {'\n'}
                                    chamar você?
                                </Text>

                                <TextInput
                                    style={[
                                        style.input,
                                        (isFocused || isFilled) && { borderColor: colors.green }

                                    ]}
                                    placeholder={noName ? "Digite um nome" : "Você precisa inserir um nome!"}
                                    placeholderTextColor={noName ? colors.gray : colors.red}
                                    onBlur={handleInputBlur}
                                    onFocus={handleInputFocus}
                                    onChangeText={handleInputChange}
                                />
                            </View>

                            <View style={style.footer}>
                                <Button
                                    title='Confirmar'
                                    onPress={handleSubmit}
                                />
                            </View>

                        </View>

                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({

    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },

    content: {
        flex: 1,
        width: '100%',
    },

    form: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center',
    },

    header: {
        alignItems: 'center',
    },

    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: Dimensions.get('window').width * 0.7,
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center'
    },

    title: {
        fontSize: 32,
        lineHeight: 32,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        marginTop: 20,
        paddingTop: 5
    },

    footer: {
        width: '100%',
        marginTop: 40,
        paddingHorizontal: 20
    },

    emoji: {
        fontSize: 44

    },

})