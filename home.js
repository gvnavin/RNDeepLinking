import React from 'react';
import { Platform, Text, Linking } from 'react-native';
class Home extends React.Component {
    static navigationOptions = { // A
        title: 'Home',
    };
    componentDidMount() { // B
        console.log("Home componentDidMount")
        if (Platform.OS === 'android') {
            console.log("Home componentDidMount if")
            Linking.getInitialURL().then(url => {
                this.navigate(url);
            });
        } else {
            console.log("Home componentDidMount else")
            Linking.addEventListener('url', this.handleOpenURL);
        }
    }

    componentWillUnmount() { // C
        Linking.removeEventListener('url', this.handleOpenURL);
    }
    handleOpenURL = (event) => { // D
        console.log("Home handleOpenURL event", event)
        this.navigate(event.url);
    }
    navigate = (url) => { // E
        console.log("Home navigate url : ", url)
        if (url == null) {
            return;
        }

        console.log("Home navigate url : ", url)
        const { navigate } = this.props.navigation;

        const route = url.replace(/.*?:\/\//g, '');
        console.log("Home navigate route : ", route)

        const id = route.match(/\/([^\/]+)\/?$/)[1];
        console.log("Home navigate id : ", id)

        const routeName = route.split('/')[0];
        console.log("Home navigate routeName : ", routeName)

        if (routeName === 'people') {
            navigate('People', { id, name: 'chris' })
        };
    }
    render() {
        return <Text>Hello from Home!</Text>;
    }
}
export default Home;
