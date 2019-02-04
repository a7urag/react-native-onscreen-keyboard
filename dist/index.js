"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var light_android_1 = __importDefault(require("./styles/light.android"));
var languages_1 = __importDefault(require("./languages"));
var keys = [
    ['numeric_1', 'numeric_2', 'numeric_3', 'numeric_4', 'numeric_5', 'numeric_6', 'numeric_7', 'numeric_8', 'numeric_9', 'numeric_0'],
    // ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['row1_0', 'row1_1', 'row1_2', 'row1_3', 'row1_4', 'row1_5', 'row1_6', 'row1_7', 'row1_8', 'row1_9'],
    // ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['row2_0', 'row2_1', 'row2_2', 'row2_3', 'row2_4', 'row2_5', 'row2_6', 'row2_7', 'row2_8'],
    // ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['spcl_shift', 'row3_0', 'row3_1', 'row3_2', 'row3_3', 'row3_4', 'row3_5', 'row3_6', 'row3_7', 'spcl_back'],
    // ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'back'],
    ['spcl_0', 'spcl_1', 'spcl_space', 'spcl_2', 'spcl_submit'],
];
var styles = light_android_1.default;
var OnScreenKeyboard = /** @class */ (function (_super) {
    __extends(OnScreenKeyboard, _super);
    function OnScreenKeyboard(props) {
        var _this = _super.call(this, props) || this;
        _this.toggleCapsLock = function () {
            var capsLockOn = _this.state.capsLockOn;
            _this.setState({
                capsLockOn: !capsLockOn,
            });
        };
        _this.renderRow = function (row) {
            var _a = _this.props, onPress = _a.onPress, submitText = _a.submitText, input = _a.input, onSubmit = _a.onSubmit;
            var _b = _this.state, capsLockOn = _b.capsLockOn, keyValues = _b.keyValues;
            var rowLayout = row.map(function (key) {
                var value = keyValues[key];
                if (key === 'spcl_submit') {
                    value = submitText || value;
                }
                return (<react_native_1.TouchableOpacity onPress={function () {
                    if (key.indexOf('spcl_') === 0) {
                        if (key === 'spcl_shift') {
                            _this.toggleCapsLock();
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
            return (<react_native_1.View style={styles.keyRowStyle}>
                {rowLayout}
            </react_native_1.View>);
        };
        _this.state = {
            capsLockOn: false,
            keyValues: languages_1.default('en')
        };
        return _this;
    }
    OnScreenKeyboard.prototype.render = function () {
        var keyboardLayout = keys.map(this.renderRow);
        return (<react_native_1.View style={styles.containerStyle}>
                <react_native_1.View style={{ flex: 1 }}/>
                <react_native_1.View style={{ paddingHorizontal: 5, paddingBottom: 5 }}>
                    {keyboardLayout}
                </react_native_1.View>
            </react_native_1.View>);
    };
    return OnScreenKeyboard;
}(react_1.default.Component));
exports.OnScreenKeyboard = OnScreenKeyboard;
