import React, { ReactNode } from 'react';
import { Text, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import styles from './style';
import backIcon from '../../assets/images/icons/back.png';
import logoIcon from '../../assets/images/logo.png';

interface PageHeaderProps {
    title: string;
    headerRight?: ReactNode;
}

const PageHeader:React.FC<PageHeaderProps> = ({title, headerRight, children}) =>  {

    const {navigate} = useNavigation();

    function handleGoBack() {
        navigate('Landing')
    }

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <BorderlessButton onPress={handleGoBack}>
                    <Image source={backIcon} resizeMode="contain" />
                </BorderlessButton>
                <Image source={logoIcon} resizeMode="contain" />
            </View>
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                {headerRight}
            </View>
            {children}
        </View>
    )
}

export default PageHeader;