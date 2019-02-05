"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
exports.default = react_native_1.StyleSheet.create({
    containerStyle: {
        flex: 1,
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: 'grey'
    },
    keyRowStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#eceff1'
    },
    keyStyle: {
        backgroundColor: 'white',
        borderRadius: 5,
        elevation: 2,
        paddingHorizontal: 10,
        paddingVertical: 6,
        fontSize: 22,
        color: 'black',
        margin: 4,
    }
});
