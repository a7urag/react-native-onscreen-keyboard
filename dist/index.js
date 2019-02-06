"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const light_android_1 = __importDefault(require("./styles/light.android"));
const languages_1 = __importDefault(require("./languages"));
const keys = [
    ['numeric_1', 'numeric_2', 'numeric_3', 'numeric_4', 'numeric_5', 'numeric_6', 'numeric_7', 'numeric_8', 'numeric_9', 'numeric_0'],
    ['row1_0', 'row1_1', 'row1_2', 'row1_3', 'row1_4', 'row1_5', 'row1_6', 'row1_7', 'row1_8', 'row1_9'],
    ['row2_0', 'row2_1', 'row2_2', 'row2_3', 'row2_4', 'row2_5', 'row2_6', 'row2_7', 'row2_8'],
    ['spcl_shift', 'row3_0', 'row3_1', 'row3_2', 'row3_3', 'row3_4', 'row3_5', 'row3_6', 'row3_7', 'spcl_back'],
    ['spcl_0', 'spcl_1', 'spcl_space', 'spcl_2', 'spcl_submit'],
];
let styles = light_android_1.default;
class OnScreenKeyboard extends React.Component {
    constructor(props) {
        super(props);
        this.toggleCapsLock = () => {
            const { capsLockOn } = this.state;
            this.setState({
                capsLockOn: !capsLockOn,
            });
        };
        this.renderRow = (row) => {
            const { onPress, submitText, input, onSubmit } = this.props;
            const { capsLockOn, keyValues } = this.state;
            const rowLayout = row.map((key) => {
                let value = keyValues[key];
                if (key === 'spcl_submit') {
                    value = submitText || value;
                }
                return (<react_native_1.TouchableOpacity key={'key-' + key} onPress={() => {
                    if (key.indexOf('spcl_') === 0) {
                        if (key === 'spcl_shift') {
                            this.toggleCapsLock();
                        }
                        else if (key.toLowerCase() === 'spcl_back') {
                            onPress(input.substring(0, input.length - 1));
                        }
                        else if (key === 'spcl_space') {
                            onPress(input + ' ');
                        }
                        else if (key.toLowerCase() === 'spcl_submit') {
                            if (onSubmit) {
                                onSubmit();
                            }
                        }
                    }
                    else {
                        onPress(input + (capsLockOn ? value.toUpperCase() : value));
                    }
                }}>
                    <react_native_1.Text style={styles.keyStyle}>{key}</react_native_1.Text>
                </react_native_1.TouchableOpacity>);
            });
            return (<react_native_1.View style={styles.keyRowStyle} key={'row-' + row[0]}>
                {rowLayout}
            </react_native_1.View>);
        };
        this.state = {
            capsLockOn: false,
            keyValues: languages_1.default('en')
        };
    }
    render() {
        const keyboardLayout = keys.map(this.renderRow);
        return (<react_native_1.View style={styles.containerStyle}>
                <react_native_1.View style={{ flex: 1 }}/>
                <react_native_1.View style={{ paddingHorizontal: 5, paddingBottom: 5 }}>
                    {keyboardLayout}
                </react_native_1.View>
            </react_native_1.View>);
    }
}
exports.default = OnScreenKeyboard;
