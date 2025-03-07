import React, {useRef} from 'react';
import {Platform, StyleSheet, TouchableOpacity, Text} from 'react-native';
import ReactNativePickerModule from 'react-native-picker-module';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../config';

export default function DropDownPicker({
  data = [],
  onSelected = () => null,
  onCancel = () => null,
  value = '',
  title = '',
  showLabel = false,
  stateKey = '',
  arrowcolor = '',
  placeHolderColor={},
  containerStyle = {},
  dropDownLabelAlignment,
}) {
  const pickerRef = useRef(null);

  return (
    <>
      {showLabel && <Text style={{color: Colors.black}}>{title}</Text>}
      <TouchableOpacity
        onPress={() => pickerRef?.current?.show()}
        activeOpacity={0.8}
        style={containerStyle}>
        <Text style={{color:dropDownLabelAlignment}}>{value ? value : title }</Text>
        <IonIcons
          color={arrowcolor}
          name="chevron-down-outline"
          size={12}
          onPress={() => pickerRef?.current?.show()}
        />
        <ReactNativePickerModule
          ref={pickerRef}
          value={value}
          title={title}
          items={data}
          titleStyle={{
            color: Platform.OS == 'android' ? Colors.black : Colors.black,
          }}
          tintColor={Platform.OS == 'android' ? Colors.black : Colors.black}
          itemStyle={{
            color: Colors.gray,
          }}
          selectedColor={Colors.primary}
          confirmButtonEnabledTextStyle={{
            color: Platform.OS == 'android' ? Colors.gray : Colors.gray,
          }}
          confirmButtonDisabledTextStyle={{
            color: Colors.border,
          }}
          cancelButtonTextStyle={{
            color:
              Platform.OS == 'android' ? Colors.background : Colors.primary,
          }}
          confirmButtonStyle={{
            backgroundColor: Colors.background,
          }}
          cancelButtonStyle={{
            backgroundColor: Colors.background,
          }}
          contentContainerStyle={{
            backgroundColor: Colors.background,
          }}
          onCancel={() => {
            onCancel();
          }}
          onValueChange={value => {
            console.log(stateKey, value,'==value');
            onSelected(stateKey, value);
          }}
        />
      </TouchableOpacity>
    </>
  );
}
const styles = StyleSheet.create({
  container: {},
});
