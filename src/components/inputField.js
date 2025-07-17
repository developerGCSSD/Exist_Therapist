import React, { useRef, useState } from 'react'; //& useRef : to get direct references to UI components
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function InputField({
  label,
  placeholder,
  value,
  onChangeText,
  secure = false,
}) {
  //& refs attached to the TextInput and container View.
  const inputRef = useRef();
  const containerRef = useRef(); //& to dynamically change styles on focus/blur without triggering re-renders

  const handleFocus = () => {
    containerRef.current.setNativeProps({
      style: styles.focusedContainer,
    });
  };

  const handleBlur = () => {
    containerRef.current.setNativeProps({
      style: styles.container,
    });
  };

  const [showPassword, setShowPassword] = useState(true);

  return (
    <View style={styles.wrapper}>
      {label && (
        <Text style={styles.label}>
          {label}
          <Text style={styles.required}> *</Text>
        </Text>
      )}

      <View ref={containerRef} style={styles.container}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#A0A0B0"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secure && showPassword}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        {secure && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIconContainer}
          >
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="#292D32"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const baseBorder = {
  borderWidth: 1,
  borderRadius: 10,
  paddingHorizontal: 16,
  height: 50,
  justifyContent: 'center',
  backgroundColor: '#fff',
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
    marginLeft: 3,
    fontWeight: '400',
  },
  required: {
    color: 'red',
  },
  container: {
    ...baseBorder,
    borderColor: '#ccc',
  },
  focusedContainer: {
    ...baseBorder,
    borderColor: '#3463E9',
    shadowColor: '#3463E9',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    fontSize: 16,
    color: '#000',
    paddingRight: 36,
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
});
