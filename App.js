import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Expo from 'expo';

export default class App extends React.Component {
	state = {
		location: null
	};

	render() {
		if (!this.state.location) {
			return <View />;
		}

		return (
			<Expo.MapView
				style={{ flex: 1 }}
				initialRegion={{
					latitude: this.state.location.coords.latitude,
					longitude: this.state.location.coords.longitude,
					latitudeDelta: 0.0922 / 3,
					longitudeDelta: 0.0421 / 2.5
				}}
			/>
		);
	}
}
