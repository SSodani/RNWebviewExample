/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
import { StyleSheet, SafeAreaView, Button, View, Text, TextInput } from 'react-native';
import { WebView } from 'react-native-webview';

const sampleHTML = require('./sample.html');


export default function App() {

  //WEBVIEW
var userRef = React.useRef<WebView | null>(null);
const [messageFromHtml, setmessageFromHtml] = React.useState(" ")

//RECEIVE MESSAGES FROM THE HTML

const handleWebViewEvent = (event: {
  nativeEvent: { data: React.SetStateAction<string> };
}) => {
  console.log('On Message', event.nativeEvent.data);
  setmessageFromHtml(event.nativeEvent.data)
};

//POST MESSAGE TO THE HTML
function sendDataToWebView(message: string = 'This is a message from app.tsx') {
  userRef.current?.postMessage(message);
}

return (
<SafeAreaView style={styles.container}>
<View style={styles.buttonContainer}>
              <Button
                title="Send Message To html"
                onPress={() => sendDataToWebView("Hiiiiii")}
              />
              <Text style={styles.text}>Message:</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setmessageFromHtml}
              value={messageFromHtml}
            />
              </View>
<WebView
          ref={userRef}
          source={sampleHTML}
          style={styles.web}
          originWhitelist={['*']}
          onMessage={handleWebViewEvent}
        />
</SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flex: 0.5,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 2,
    marginBottom: 2,
    backgroundColor: 'grey',
  },
  text: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'grey',
    width: '80%',
    marginBottom: 2,
    marginLeft: 2,
    marginRight: 2,
  },
  textInput: {
    flex: 5,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 2,
    marginBottom: 2,
    backgroundColor: 'grey',
  },
  web: {
    flex: 8,
    width: '100%',
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
  },
})