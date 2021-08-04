import React, { useState, useEffect } from 'react';
import {
    Text,
    Image,
    StyleSheet,
    View,
    TouchableOpacity,
    Platform
} from 'react-native';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as usePermitions from 'expo-permissions';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import userImg from '../assets/user1.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Header() {
    const [userName, setUserName] = useState<string>();
    const [image, setImage] = useState<string>();
    const [isImageChosen, setImageChosen] = useState(false);
    const [officialImage, setOfficialImage] = useState<string>();

    useEffect(() => {

        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();

        async function loadStorageUserName() {
            const user = await AsyncStorage.getItem("@plantmanager:user");
            setUserName(user || "");
        }

        loadStorageUserName();
    }, [userName]);

    useEffect(() => {
        if (!isImageChosen) {
            setOfficialImage('')
        } else setOfficialImage(image)

    }, [])


    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
            setImageChosen(true);
        } else setImageChosen(false);
    };


    return (
        <View style={style.container} >

            <View>
                <Text style={style.greetings}>Olá!</Text>
                <Text style={style.userName}>
                    {userName}
                </Text>
            </View>

            <TouchableOpacity onPress={pickImage}>
                <Image
                    source={!isImageChosen ? userImg : { uri: image }}
                    style={style.image}
                />
            </TouchableOpacity>


        </View>
    )
}

const style = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 30,
        marginTop: getStatusBarHeight(),

    },

    greetings: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text

    },

    userName: {
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 40,

    },

    image: {
        width: 70,
        height: 70,
        borderRadius: 40,

    },

})