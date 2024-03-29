import CheckBox from '@react-native-community/checkbox'
import { memo, useEffect, useState } from "react"
import { StyleSheet, Text, TouchableHighlight, View } from "react-native"
import { connect, useDispatch } from "react-redux"
import shortid from "shortid"
import { DataService } from "../state/dataService"
import RenderPlants from "./RenderPlants"
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { allStyles } from "../styles"
import { TouchableOpacity } from "react-native"
import { setSearchText } from "../state/dataSlice"



const styles = StyleSheet.create({
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomColor: 'black',
        justifyContent: 'center',
        height: 'auto',
        marginBottom: 20,
        borderRadius: 5,
        margin: 5,
        elevation: 10,
        shadowColor: 'black',
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 7,
    },
    costLineWrapper: {
        height: 'auto',
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 10,
    },
    orderInfo: {
        height: 'auto',
        borderBottomWidth: 2,
        paddingBottom: 10,
        borderBottomColor: '#858585',
        backgroundColor: '#eef9ee',
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 7,
        paddingLeft: 3,
        paddingRight: 5,
        paddingBottom: 3
    },
    orderClient: {
        height: 'auto',
        lineHeight: 20,
        paddingBottom: 5,
        fontWeight: '900',
        fontSize: 15,
        width: '94%',
        textShadowRadius: 2
    },
    viewGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    orderNum: {
        fontSize: 13,
        fontWeight: '600'
    },
    orderShipment: {
        height: 'auto',
        fontSize: 12,
        fontWeight: '600',
        elevation: 5,
        textShadowColor: 'rgba(0, 0, 0, 0.75)', // Колір тіні (чорний)
        textShadowOffset: { width: 0, height: 0 }, // Відступ по горизонталі і вертикалі
        textShadowRadius: 2, // Радіус тіні
    },
    quantity: {
        height: 'auto',
        textAlignVertical: 'center',
        alignSelf: 'center',
        fontSize: 12,
        fontWeight: '600'
    },
    textStr: {
        fontWeight: '600',
    },
    checkBox: {
        height: 27,
        width: 27,
    },
    toucheble: {
    elevation: 1,
    borderWidth: 0.1,
    borderColor: '#0531000a'
    }

})


function RenderOrders({ orders, rightToChange }) {
    const dispatch = useDispatch()
    const [selectedAllOrder, setSelectedAllOrder] = useState(false)
    const { customerName, orderNo, shipmentMethod, shipmentDate, products, orderId, comment } = orders

    let qty = 0
    products.forEach(el => qty += el.qty)
    
    return (
        <View style={styles.rowFront} >
            <View style={styles.costLineWrapper}>
                <View style={styles.orderInfo}>
                    <View style={styles.infoContainer}>
                        <TouchableOpacity style={{flex: 1}} onPress={() => dispatch(setSearchText(customerName))}>
                            <Text style={styles.orderClient}
                                allowFontScaling={true}
                                maxFontSizeMultiplier={1}
                            >{customerName}</Text>
                        </TouchableOpacity>
                        {rightToChange ?
                            <CheckBox
                                value={selectedAllOrder}                                
                                onValueChange={() => setSelectedAllOrder(!selectedAllOrder)}
                                style={styles.checkBox}
                            /> : null}
                    </View>
                    <View style={styles.viewGroup}>
                        <TouchableOpacity style={styles.toucheble} onPress={() => dispatch(setSearchText(shipmentMethod))}>
                            <FontAwesome5 name="truck-loading" size={14} color="black" >                                
                                    <Text
                                        style={[styles.orderShipment, shipmentMethod.toLowerCase().includes('пошта') && allStyles.NPshipment ]}
                                        allowFontScaling={true}
                                        maxFontSizeMultiplier={1}
                                    ><Text style={styles.textStr}> {shipmentMethod}</Text> </Text>  
                            </FontAwesome5>                            
                        </TouchableOpacity>
                        <MaterialCommunityIcons name="pine-tree" size={20} color="black">
                            <MaterialCommunityIcons name="pine-tree" size={14} color="black" />
                            <Text
                                style={styles.quantity}
                                allowFontScaling={true}
                                maxFontSizeMultiplier={1}
                            > {qty} шт</Text>
                        </MaterialCommunityIcons>                        
                    </View>
                    <View style={styles.viewGroup}>
                        <TouchableOpacity onPress={() => dispatch(setSearchText(shipmentDate))}>
                            <MaterialCommunityIcons name="truck-delivery-outline" size={22} color="black" >
                                <Text
                                    style={styles.orderShipment}
                                    allowFontScaling={true}
                                    maxFontSizeMultiplier={1}
                                > {shipmentDate}</Text>
                            </MaterialCommunityIcons>
                        </TouchableOpacity>
                        <MaterialCommunityIcons name="clipboard-list-outline" size={19} color="black">
                            <Text
                                style={styles.orderNum}
                                allowFontScaling={true}
                                maxFontSizeMultiplier={1}
                            > {orderNo} </Text>
                        </MaterialCommunityIcons>
                    </View>
                    <MaterialCommunityIcons name="comment-text-outline" size={16} color="black" >
                        <Text
                            allowFontScaling={true}
                            maxFontSizeMultiplier={1}
                            style={{ fontWeight: '800', fontSize: 13 }}
                        > - {comment} </Text>
                    </MaterialCommunityIcons>
                </View>
                <View >
                    {products.map(elem =>
                        <RenderPlants
                            key={shortid.generate()}
                            orderId={orderId}
                            prodactElem={elem}
                            selectedAllOrder={selectedAllOrder}
                        />
                    )}
                </View>
            </View>
        </View>
    )
}

const mapStateToProps = state => ({
    token: state.token,
})

export default connect(mapStateToProps)(memo(RenderOrders))