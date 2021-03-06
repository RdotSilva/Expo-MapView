import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Expo from 'expo';

export default class App extends React.Component {
	state = {
		location: null
	};

	_getLocationAsync = async () => {
		let { status } = await Expo.Permissions.askAsync(
			Expo.Permissions.LOCATION
		);
		if (status !== 'granted') {
			console.err('Location permission not granted!');
			return;
		}
		let location = await Expo.Location.getCurrentPositionAsync({});

		let eliotHouse = (await Expo.Location.geocodeAsync(
			'101 Dunster St.'
		))[0];
		let theCrimson = (await Expo.Location.geocodeAsync(
			'14 Plympton St.'
		))[0];
		let theKitty = (await Expo.Location.geocodeAsync(
			'2 Holoyke Place.'
		))[0];

		let where = (await Expo.Location.reverseGeocodeAsync(
			location.coords
		))[0];

		this.setState({
			location,
			places: {
				eliotHouse,
				theCrimson,
				theKitty
			},
			where
		});
	};

	componentDidMount() {
		this._getLocationAsync();
	}

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
			>
				<Expo.MapView.Marker
					coordinate={this.state.location.coords}
					title="You are here"
					description={this.state.where.name}
				/>
				<Expo.MapView.Marker
					coordinate={this.state.places.eliotHouse}
					title="Eliot House"
					description="domus"
					pinColor="blue"
				/>
				<Expo.MapView.Marker
					coordinate={this.state.places.theCrimson}
					title="The Crimson"
					description="Student Newspaper"
					pinColor="black"
				/>
				<Expo.MapView.Marker
					coordinate={this.state.places.theKitty}
					title="The Kitty"
					description="Meow"
					pinColor="yellow"
				/>
			</Expo.MapView>
		);
	}
}
