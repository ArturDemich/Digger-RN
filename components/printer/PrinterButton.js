import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableHighlight,
} from 'react-native'
import { connect } from 'react-redux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { memo } from 'react'
import { DataService } from '../../state/dataService'
import PdfThumbnail from "react-native-pdf-thumbnail"
import RNFS from 'react-native-fs';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { PermissionsAndroid } from 'react-native';





const styles = StyleSheet.create({
    containerNBTN: {
        elevation: 5,
        position: 'absolute', 
        left: 12,
        bottom: 5
    },
    textBtn: {
        color: 'white',
        fontSize: 14,
        fontWeight: '900',   
    },
    buttonStep: {
        borderRadius: 10,
        backgroundColor: 'gray',
        height: 40,
        padding: 5,               
        opacity: 0.95,
        elevation: 5,
        shadowColor: '#d70000',
        shadowOffset: { width: 0, height: 0 },        
        shadowOpacity: 0.9,
        shadowRadius: 3, 
    },   
})


const PrinterButton = memo(({ checkBToN, dataChange, token}) => { 
    const printing = async () => {
         const images = require('./d.pdf')
         const pdfFilePath = 'file://d.pdf'
        
         //const files = await RNFS.readdir(filePath);

         

         try {
            const saveFilePath = RNFS.DownloadDirectoryPath + '/d.pdf';
            const path = RNFS.DownloadDirectoryPath 
            const pathExt = RNFS.readDir(path)
            .then((dir) => console.log('dir', dir))
            const result = await PermissionsAndroid.check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
            const request = await PermissionsAndroid.request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);  
            const requestt = await PermissionsAndroid.request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);          
            const fileExists = await RNFS.exists(saveFilePath);
            console.log('PERMISSIONS:', result, request, requestt, fileExists);
            RNFS.readFile(saveFilePath, 'utf8')
            .then((fileContent) => {
                console.log('Вміст файлу:', fileContent);
                // Ваша логіка обробки вмісту файлу
            })
            .catch((error) => {
                console.log('Помилка отримання вмісту файлу:', error.message);
            });
        
            // Тут ви можете вивести список файлів та папок, які знаходяться в Document Directory
            //const files = await RNFS.readdir(filePath);
           // console.log('Files in Document Directory:', files);
          } catch (error) {
            console.error('Error while accessing Document Directory:', error);
          }
         console.log('printing', filePath)
        try {
             //const labes = await DataService.getOrderLabels(token[0].token, dataChange)           
            // console.log('PRINTING', labes.data)
            //const { uri, width, height } = await PdfThumbnail.generate(pdfFilePath, 0)
            
            
            //console.log('uri', uri, width, height)
        } catch (error) {
            console.log('error', error)
        }       
      }

      
  
    return (
      <View >
            {dataChange.length > 0 ? <View style={styles.containerNBTN} >

                <TouchableHighlight
                    style={[styles.buttonStep]}
                    onPress={() => printing() /* checkBToN() */}
                >
                    <MaterialCommunityIcons name="printer-wireless" size={24} color="snow" >                    
                        <Text
                            style={styles.textBtn}
                            allowFontScaling={true}
                            maxFontSizeMultiplier={1}
                        > Друк</Text>
                    </MaterialCommunityIcons>
                </TouchableHighlight>
            </View> : null}        
      </View>
    )
})

const mapStateToProps = (state) => ({
    dataChange: state.dataChange,
    token: state.token
})

export default connect(mapStateToProps)( PrinterButton)

