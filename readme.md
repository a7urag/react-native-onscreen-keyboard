# Getting started
##Installation
```
npm install react-native-onscreen-keyboard --save
```
# Usage

### Import
```
import OnScreenKeyboard from 'react-native-onscreen-keyboard';
```

### Usage
```
<OnScreenKeyboard
    onPress={(input) => {
        this.setState({
            keyboardInput: input,
        });
    }}
    input={keyboardInput}
/>
```

# Props
##### onPress(input)
Returns input on button press

##### input
Initial/Updated input text

##### onSubmit
Returns submit button press

##### submitText
Sets submit key label



