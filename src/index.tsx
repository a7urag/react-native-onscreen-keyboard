import React from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity
} from 'react-native';

import stylesLightAndroid from './styles/light.android'
import getValuesByLanguage from './languages';

const keys = [
    ['numeric_1', 'numeric_2', 'numeric_3', 'numeric_4', 'numeric_5', 'numeric_6', 'numeric_7', 'numeric_8', 'numeric_9', 'numeric_0'],
    // ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['row1_0', 'row1_1', 'row1_2', 'row1_3', 'row1_4', 'row1_5', 'row1_6', 'row1_7', 'row1_8', 'row1_9'],
    // ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['row2_0', 'row2_1', 'row2_2', 'row2_3', 'row2_4', 'row2_5', 'row2_6', 'row2_7', 'row2_8'],
    // ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['spcl_shift','row3_0', 'row3_1', 'row3_2', 'row3_3', 'row3_4', 'row3_5', 'row3_6', 'row3_7', 'spcl_back'],
    // ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'back'],
    ['spcl_0', 'spcl_1', 'spcl_space', 'spcl_2', 'spcl_submit'],
    // ['@', ',', 'space', '.', 'submit'],
];

export interface Props {
    onPress: Function,
    submitText?: string,
    input: string,
    onSubmit?: Function
}

interface State {
    capsLockOn: boolean,
    keyValues: KeyValue
}

interface KeyValue {
    [key: string]: string
}

let styles = stylesLightAndroid;

export class OnScreenKeyboard extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            capsLockOn: false,
            keyValues: getValuesByLanguage('en')
        }
    }

    toggleCapsLock = () => {
        const { capsLockOn } = this.state;
        this.setState({
            capsLockOn: !capsLockOn,
        });
    };

    renderRow = (row: Array<string>) => {
        const {
            onPress, submitText, input, onSubmit
        } = this.props;
        const { capsLockOn, keyValues } = this.state;
        const rowLayout = row.map((key: string) => {
            let value = keyValues[key];
            if (key === 'spcl_submit') {
                value = submitText || value;
            }
            return (
                <TouchableOpacity
                    onPress={() => {
                        if (key.indexOf('spcl_') === 0) {
                            if (key === 'spcl_shift') {
                                this.toggleCapsLock();
                            } else if (key.toLowerCase() === 'spcl_back') {
                                onPress(input.substring(0, input.length - 1));
                            } else if (key=== 'spcl_space') {
                                onPress(input+' ')
                            } else if (key.toLowerCase() === 'spcl_submit') {
                                if (onSubmit) {
                                    onSubmit();
                                }
                            }
                        } else {
                            onPress(input + (capsLockOn ? value.toUpperCase() : value));
                        }
                    }}>
                    <Text style={styles.keyStyle}>{key}</Text>
                </TouchableOpacity>
            );
        });

        return (
            <View style={styles.keyRowStyle}>
                {rowLayout}
            </View>
        );
    };

    render() {
        const keyboardLayout = keys.map(this.renderRow);
        return (
            <View style={styles.containerStyle}>
                <View style={{ flex: 1 }} />
                <View style={{ paddingHorizontal: 5, paddingBottom: 5 }}>
                    {keyboardLayout}
                </View>
            </View>
        );
    }
}