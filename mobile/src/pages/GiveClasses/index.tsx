import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import styles from './style';
import bfImage from '../../assets/images/give-classes-background.png';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

function GiveClasses() {
    const { navigate, goBack } = useNavigation();

    function handleNavigationBack() {
        // navigate('Landing');
        goBack();
    }

    return (
        <View style={styles.container}>
            {/* Esse componente permite utilizar imagem de fundo */}
            <ImageBackground
                resizeMode="contain"
                source={bfImage}
                style={styles.content}>
                    <Text style={styles.title}>Quer ser um Proffy?</Text>
                    <Text style={styles.description}>Para começar, você precisa se cadastrar como professor na nossa plataforma web.</Text>
            </ImageBackground>
            <RectButton onPress={handleNavigationBack} style={styles.okButton}>
                <Text style={styles.okButtonText}>Tudo bem</Text>
            </RectButton>
        </View>
    )
}

export default GiveClasses;