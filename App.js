import React, { useRef, useState } from 'react';
import { Platform, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

export default function App() {

  const [weight, setWeight] = useState('');
  const [time, setTime] = useState(1);
  const [bottles, setBottles] = useState(1);
  const [gender, setGender] = useState(0);
  const [promilles, setPromilles] = useState(0);
  const weightInput = useRef();

  const bottleOptions = [
    { label: '1 Bottle', value: 1 },
    { label: '2 Bottles', value: 2 },
    { label: '3 Bottles', value: 3 },
    { label: '4 Bottles', value: 4 },
    { label: '5 Bottles', value: 5 }
  ]

  const timeOptions = [
    { label: '1 Hour', value: 1 },
    { label: '2 Hours', value: 2 },
    { label: '3 Hours', value: 3 },
    { label: '4 Hours', value: 4 },
    { label: '5 Hours', value: 5 },
    { label: '6 Hours', value: 6 },
    { label: '7 Hours', value: 7 },
    { label: '8 Hours', value: 8 },
    { label: '9 Hours', value: 9 }
  ]

  const radio_props = [
    { label: 'Male', value: 0 },
    { label: 'Female', value: 1 }
  ];

  function calculate() {
    if (weight && !isNaN(weight)) {
      const litres = bottles * 0.33;
      const grams = litres * 8 * 4.5;
      const burning = weight / 10;
      const gramsleft = grams - burning * time;
      var result;
      (gender === 0 ? result = gramsleft / (weight * 0.7) : result = gramsleft / (weight * 0.6));
      (result < 0 ? setPromilles(0) : setPromilles(result));
    } else {
      weightInput.current.focus();
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Weight</Text>
      <TextInput
        selectTextOnFocus
        maxLength={3}
        keyboardType='numeric'
        ref={weightInput}
        style={styles.input}
        value={weight}
        onChangeText={value => setWeight(value)}>
      </TextInput>
      <View style={styles.pickerContainer}>
        <View>
          <Text style={styles.text}>Bottles</Text>
          <Picker style={Platform.OS === 'android' ? styles.pickerAndroid : styles.pickerPC}
            selectedValue={bottles}
            onValueChange={(itemValue) => setBottles(itemValue)}>
            {bottleOptions.map((option, index) => (
              <Picker.Item key={index} label={option.label} value={option.value} />
            ))}
          </Picker>
        </View>
        <View>
          <Text style={styles.text}>Time</Text>
          <Picker style={Platform.OS === 'android' ? styles.pickerAndroid : styles.pickerPC}      
            selectedValue={time}
            onValueChange={(itemValue) => setTime(itemValue)}>
            {timeOptions.map((option, index) => (
              <Picker.Item key={index} label={option.label} value={option.value} />
            ))}
          </Picker>
        </View>
      </View>

      <Text style={styles.text}>Gender</Text>
      <RadioForm style={styles.radio}
        radio_props={radio_props}
        onPress={value => setGender(value)}
        initial={0}
        buttonColor={'gray'}
        labelColor={'gray'}
      />
      <Text>Promilles</Text>
      <Text style={styles.text}>{(promilles.toFixed(2))}</Text>
      <Button title='Calculate' onPress={calculate}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderBottomColor: 'gray',
    textAlign: 'center',
    width: 100,
    padding: 2,
    fontSize: 20,
    marginBottom: 10,
    backgroundColor: '#dbe8ee'
  },
  pickerPC: {
    textAlign: 'center',
    padding: 5,
    marginBottom: 10
  },
  pickerAndroid: {
    textAlign: 'center',
    marginBottom: 10,
    width: 150,
    padding: 2
  },
  pickerContainer: {
    flexDirection: 'column',
  },
  radio: {
    marginBottom: 10
  },
  text: {
    marginVertical: 8,
    fontSize: 20,
    textAlign: 'center'
  }
});
