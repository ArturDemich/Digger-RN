import { Platform, StyleSheet, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import { cleanState } from '../state/dataSlice'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import useDeviceToken from '../hooks/useDeviceToken'


const styles = StyleSheet.create({    
    buttonStep: {
        justifyContent: 'center',
        width: 30,
        paddingLeft: 5
        
    },
})

function ButtonOut({ token }) {
    const dispatch = useDispatch()
    const {registerDeviceToken} = useDeviceToken()
    

    const deleteToken = async() => {
        try {
            if(Platform.OS === 'web') {
                await localStorage.removeItem('token')
            } else {
                await AsyncStorage.removeItem('token')
            }
        } catch (error) {
            console.log(error)
        }
        
        await registerDeviceToken(token[0].token, false)
    }
 
    return (
        <TouchableOpacity
            style={[styles.buttonStep]}
            onPress={() => {
                deleteToken()
                dispatch(cleanState())                
            }}
        >           
        <MaterialIcons name="logout" size={24} color="black" />            
        </TouchableOpacity>
    )
}

export default ButtonOut

