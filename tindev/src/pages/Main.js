import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaView, View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import io from 'socket.io-client';

import api from '../services/api';

import logo from '../assets/logo.png';
import like from '../assets/like.png';
import dislike from '../assets/dislike.png';
import itsamatch from '../assets/itsamatch.png';

export default function Main({ navigation }) {

	const id = navigation.getParam('user');
	const [user, setUser] = useState([]);
	const [users, setUsers] = useState([]);
	const [matchDev, setMatchDev] = useState(null)

	useEffect(() => {
		async function loadUsers() {
			const response = await api.get('/devs', {
				headers: {
					user: id
				}

			})

			setUser(response.data.user)
			setUsers(response.data.users);
		}
		loadUsers();
	}, [id]);

	useEffect(() => {

		const socket = io('http://localhost:3333', {
			query: { user: id }
		})

		socket.on('match', dev => {
			setMatchDev(dev)
		})
	}, [id])

	async function handleLike() {
		const [user, ...rest] = users;

		await api.post(`/devs/${user._id}/likes`, null, {
			headers: { user: id },
		});

		setUsers(rest);
	}

	async function handleDislike() {
		const [user, ...rest] = users;

		await api.post(`/devs/${user._id}/dislikes`, null, {
			headers: { user: id },
		});

		setUsers(rest);
	}

	async function handleLogout() {
		await AsyncStorage.clear();

		navigation.navigate('Login');
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.userHeader} >
				<Image style={styles.userAvatar} source={{ uri: user.avatar }} />
				<View style={styles.userContainer}>
					<Text style={styles.userName}>{user.name}</Text>
				</View>
				<TouchableOpacity style={styles.link} onPress={handleLogout}>
					<Image style={styles.logo} source={logo} />
				</TouchableOpacity>
			</View>

			<View style={styles.cardsContainer}>

				{users.length === 0
					? <Text style={styles.empty}>Acabou :/</Text>
					: (
						users.map((user, index) => (
							<View key={user._id} style={[styles.card, { zIndex: useEffect.length - index }]}>
								<Image style={styles.avatar} source={{ uri: user.avatar }} />
								<View style={styles.footer}>
									<Text style={styles.name}>{user.name}</Text>
									<Text numberOfLines={3} style={styles.bio}>{user.bio}</Text>
								</View>
							</View>
						))
					)}

			</View>

			{users.length > 0 && (
				<View style={styles.buttonContainer}>
					<TouchableOpacity style={styles.button} onPress={handleDislike}>
						<Image source={dislike} />
					</TouchableOpacity>

					<TouchableOpacity style={styles.button} onPress={handleLike}>
						<Image source={like} />
					</TouchableOpacity>
				</View>
			)}
			
			{ matchDev && (
				<View style={styles.matchContainer}>
					<Image style={styles.matchImage} source={itsamatch} />
					<Image style={styles.matchAvatar} source={{ uri: matchDev.avatar }} />

					<Text style={styles.matchName}>{matchDev.name}</Text>
					<Text style={styles.matchBio}>{matchDev.bio}</Text>

					<TouchableOpacity onPress={() => setMatchDev(null)}>
						<Text style={styles.closeMatch}>FECHAR</Text>
					</TouchableOpacity>
				</View>
			) }
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f5f5f5',
		alignItems: 'center',
		justifyContent: 'space-between',
	},

	logo: {
		//marginTop: 30,
	},

	link: {
		borderWidth: 1,
		borderColor: '#ddd',
		paddingHorizontal: 3,
		paddingVertical: 14,	
	},

	empty: {
		alignSelf: 'center',
		color: '#999',
		fontSize: 24,
		fontWeight: 'bold',
	},

	cardsContainer: {
		flex: 1,
		alignSelf: 'stretch',
		justifyContent: 'center',
		maxHeight: 500,
	},

	card: {
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 8,
		margin: 30,
		overflow: 'hidden',
		position: 'absolute',
		top: 0,
		right: 0,
		left: 0,
		bottom: 0,
	},

	avatar: {
		flex: 1,
		height: 300,
	},

	footer: {
		backgroundColor: '#fff',
		paddingHorizontal: 20,
		paddingVertical: 15,
	},

	name: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#333',
	},

	bio: {
		fontSize: 14,
		color: '#999',
		marginTop: 5,
		lineHeight: 18,
	},

	buttonContainer: {
		flexDirection: 'row',
		marginBottom: 30,
		zIndex:99999
	},

	button: {
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: 20,
		elevation: 2,
		shadowColor: '#000',
		shadowOpacity: 0.05,
		shadowOffset: {
			width: 0,
			height: 2,
		}
	},

	matchContainer: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0, 0, 0, 0.8)',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 999999
	},

	matchImage: {
		height: 60,
		resizeMode: 'contain',
	},

	matchAvatar: {
		width: 160,
		height: 160,
		borderRadius: 80,
		borderWidth: 5,
		borderColor: '#fff',
		marginVertical: 30,
	},

	matchName: {
		fontSize: 26,
		fontWeight: 'bold',
		color: '#fff',
	},

	matchBio: {
		marginTop: 10,
		fontSize: 16,
		color: 'rgba(255, 255, 255, 0.8)',
		lineHeight: 24,
		textAlign: 'center',
		paddingHorizontal: 30
	},

	closeMatch: {
		fontSize: 16,
		color: 'rgba(255, 255, 255, 0.8)',
		textAlign: 'center',
		marginTop: 30,
		fontWeight: 'bold'
	},

	userHeader: {
		flexDirection: 'row',
		paddingVertical: 20,
		justifyContent: 'center',
		width: '100%',
		height: 100
	},	

	userAvatar: {
		width: 60,
		height: 60
	},

	userContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		padding: 20,
		backgroundColor: '#df4623',
		paddingHorizontal: 10,
	},

	userName: {
		color: '#fff'
	},
});