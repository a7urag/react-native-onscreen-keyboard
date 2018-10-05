# Getting started
* npm install react-native-onscreen-keyboard --save

# Usage

### Import
*import OnScreenKeyboard from 'react-native-onscreen-keyboard';*

### Usage
*
<VirtualKeyboard
    onPress={(input) => {
        this.setState({
            productName: input,
        });
    }}
    input={productName}
/>*

# Props
#### onPress(input)
Returns input on button press

#### input
Initial/Updated input text

#### onSubmit
Returns submit button press

### submitText
Sets submit key label



