// @flow
import React from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity
} from 'react-native';

const standardKeys = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'back'],
    ['@', ',', 'space', '.', 'submit'],
];

const styles = StyleSheet.create({
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

type Props = {
    onPress: Function,
    submitText?: string,
    input: string,
    onSubmit?: Function,
}


export default class OnScreenKeyboard extends React.PureComponent<Props> {
    static defaultProps = {
        submitText: undefined,
        onSubmit: undefined,
    };

    state = {
        capsLockOn: false,
    };

    toggleCapsLock = () => {
        const { capsLockOn } = this.state;
        this.setState({
            capsLockOn: !capsLockOn,
        });
    };

    renderRow = (row) => {
        const {
            onPress, submitText, input, onSubmit
        } = this.props;
        const { capsLockOn } = this.state;
        const rowLayout = row.map((keyValue) => {
            let key = keyValue;
            if (capsLockOn) {
                key = keyValue.toUpperCase();
            }
            if (keyValue === 'submit') {
                key = submitText || keyValue;
            }
            if (keyValue.toLowerCase() === 'space') {
                return (
                    <TouchableOpacity
                onPress={() => onPress(`${input} `)}
                style={[{ flex: 1 }, styles.keyStyle]}
                />
            );
            }
            return (
                <TouchableOpacity
            onPress={() => {
                if (key.toLowerCase() === 'shift') {
                    this.toggleCapsLock();
                } else if (key.toLowerCase() === 'back') {
                    onPress(input.substring(0, input.length - 1));
                } else if (key.toLowerCase() === 'submit') {
                    if (onSubmit) {
                        onSubmit();
                    }
                } else {
                    onPress(input + (capsLockOn ? keyValue.toUpperCase() : keyValue));
                }
            }}
        >
        <Text style={styles.keyStyle}>{key}</Text>
            </TouchableOpacity>
        );
        });

        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#eceff1', }}>
        {rowLayout}
    </View>
    );
    };

    render() {
        const keyboardLayout = standardKeys.map(this.renderRow);
        return (
            <View style={{
            flex: 1, width: '100%', borderTopWidth: 1, borderTopColor: 'grey'
        }}
    >
    <View style={{ flex: 1 }} />
        <View style={{ paddingHorizontal: 5, paddingBottom: 5 }}>
        {keyboardLayout}
    </View>
        </View>
    );
    }
}
