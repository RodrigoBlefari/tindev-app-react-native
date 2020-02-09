
import React from 'react'
import { KeyboardAvoidingView, StyleSheet, Image, TextInput, Text, TouchableOpacity, Platform } from 'react-native'

import logo from '../assets/logo.png';

export default function Login() {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled={Platform.OS === 'ios'}>
        <Image source={logo} />
 
         <TextInput 
            style={styles.input} 
            placeholder="Digite seu usuário no Github" 
            placeholderTextColor="#999"
            autoCapitalize="none"
        />

        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f5f5f5',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 30
	},

	input: {
		height: 46,
		alignSelf: 'stretch',
		backgroundColor: '#fff',
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 4,
		marginTop: 50,
		paddingHorizontal: 15,
	},

	button: {
		height: 46,
		alignSelf: 'stretch',
		backgroundColor: '#DF4723',
		borderRadius: 4,
		marginTop: 10,
		justifyContent: 'center',
		alignItems: 'center'
	},

	buttonText: {
		fontWeight: 'bold',
		color: '#fff',
		fontSize: 16
	}
})