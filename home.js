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

        const route1 = url.replace(/.*?:\/\//g, '');
        const route = route1.replace(/\?.*/g, '');
        console.log("Home navigate route : ", route)

        const id = route.match(/\/([^\/]+)\/?$/)[1];
        console.log("Home navigate id : ", id)

        const routeName = route.split('/')[0];
        console.log("Home navigate routeName : ", routeName)

        // const params = this.getAllUrlParams("https://test.com/hello?name=roger");
        const params = this.getAllUrlParams(url);

        // https://stackoverflow.com/questions/1625208/print-content-of-javascript-object
        const obj = JSON.stringify(params, null, 4)
        console.log("params " + url + " : \n" + obj)

        if (routeName === 'people') {
            navigate('People', { id, name: 'chris', params: params })
        };
    }

    // https://www.sitepoint.com/get-url-parameters-with-javascript/
    getAllUrlParams(url) {

        // get query string from url (optional) or window
        var queryString = url.split('?')[1]

        // we'll store the parameters here
        var obj = {};

        // if query string exists
        if (queryString) {

            // stuff after # is not part of query string, so get rid of it
            queryString = queryString.split('#')[0];

            // split our query string into its component parts
            var arr = queryString.split('&');

            for (var i = 0; i < arr.length; i++) {
                // separate the keys and the values
                var a = arr[i].split('=');

                // set parameter name and value (use 'true' if empty)
                var paramName = a[0];
                var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

                // (optional) keep case consistent
                paramName = paramName.toLowerCase();
                if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

                // if the paramName ends with square brackets, e.g. colors[] or colors[2]
                if (paramName.match(/\[(\d+)?\]$/)) {

                    // create key if it doesn't exist
                    var key = paramName.replace(/\[(\d+)?\]/, '');
                    if (!obj[key]) obj[key] = [];

                    // if it's an indexed array e.g. colors[2]
                    if (paramName.match(/\[\d+\]$/)) {
                        // get the index value and add the entry at the appropriate position
                        var index = /\[(\d+)\]/.exec(paramName)[1];
                        obj[key][index] = paramValue;
                    } else {
                        // otherwise add the value to the end of the array
                        obj[key].push(paramValue);
                    }
                } else {
                    // we're dealing with a string
                    if (!obj[paramName]) {
                        // if it doesn't exist, create property
                        obj[paramName] = paramValue;
                    } else if (obj[paramName] && typeof obj[paramName] === 'string'){
                        // if property does exist and it's a string, convert it to an array
                        obj[paramName] = [obj[paramName]];
                        obj[paramName].push(paramValue);
                    } else {
                        // otherwise add the property
                        obj[paramName].push(paramValue);
                    }
                }
            }
        }

        return obj;
    }

    render() {
        return <Text>Hello from Home!</Text>;
    }
}
export default Home;
