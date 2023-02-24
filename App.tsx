import React from 'react';
import LDClient from 'launchdarkly-react-native-client-sdk';
import { Text, View, Button, TextInput, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

type Props = {};

type State = {
  ldClient?: LDClient;
  flagKey: string;
  flagType: string;
};

export default class App extends React.Component<Props, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      ldClient: undefined,
      flagKey: '',
      flagType: 'bool',
    };
  }

  async componentDidMount() {
    try {
      let client = new LDClient();

      let config = {
        mobileKey: 'YOUR_MOBILE_KEY',
        debugMode: true,
      };

      let user = { key: 'user key' };

      await client.configure(config, user);
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ ldClient: client });
    } catch (err) {
      console.error(err);
    }
  }

  async evalFlag() {
    let res;
    let client = this.state.ldClient;
    if (client != undefined) {
      if (this.state.flagType === 'bool') {
        res = await client.boolVariation(this.state.flagKey, false);
      } else if (this.state.flagType === 'string') {
        res = await client.stringVariation(this.state.flagKey, '');
      } else if (this.state.flagType === 'int') {
        res = await client.numberVariation(this.state.flagKey, 0);
      } else if (this.state.flagType === 'json') {
        let obj = await client.jsonVariation(this.state.flagKey, {});
        res = JSON.stringify(obj);
      }

      Alert.alert('LD Server Response', String(res));
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {/* eslint-disable-next-line react-native/no-inline-styles */}
        <Text style={{ fontWeight: 'bold' }}>LaunchDarkly React Native Typescript Example</Text>
        <View>
          <Text>Feature Key:</Text>
          <TextInput
            autoCapitalize="none"
            style={styles.input}
            onChangeText={(text) => this.setState({ flagKey: text })}
            value={this.state.flagKey}
          />
          <Picker
            selectedValue={this.state.flagType}
            onValueChange={(itemValue, itemIndex) => this.setState({ flagType: itemValue })}
          >
            <Picker.Item label="Boolean" value="bool" />
            <Picker.Item label="String" value="string" />
            <Picker.Item label="Integer" value="int" />
            <Picker.Item label="Float" value="float" />
            <Picker.Item label="JSON" value="json" />
          </Picker>
          <View style={styles.button}>
            <Button title="Evaluate Flag" onPress={() => this.evalFlag()} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    padding: 100,
  },
  input: {
    height: 35,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
  },
  closeModal: {
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  button: {
    padding: 10,
  },
  buttons: {
    flexDirection: 'row',
  },
});
