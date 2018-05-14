import React, {Component} from 'react';
import { Text, View, Button, Icon } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';

class CameraComponent extends Component {
    
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
    };

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View>
                    <View style={{ width: '100%', height: 400, backgroundColor: 'skyblue' }}>
                        <Camera style={{ flex: 1 }} type={this.state.type}>
                            <View
                                style={{
                                    flex: 1,
                                    backgroundColor: 'transparent',
                                    flexDirection: 'row',
                                }}>
                                <TouchableOpacity
                                    style={{
                                        flex: 0.1,
                                        alignSelf: 'flex-end',
                                        alignItems: 'center',
                                    }}
                                    onPress={() => {
                                        this.setState({
                                            type: this.state.type === Camera.Constants.Type.back
                                                ? Camera.Constants.Type.front
                                                : Camera.Constants.Type.back,
                                        });
                                    }}>
                                    <Icon type="FontAwesome" name="refresh" style={{ marginLeft:5, marginBottom: 15, color: 'white' }}/>
                                </TouchableOpacity>
                            </View>
                        </Camera>
                    </View>
                    <View style={{ width: '100%', height: 100, backgroundColor: 'steelblue' }}>
                        <Button primary><Text> Primary </Text></Button>
                    </View>
                </View>
            );
        }
    }
}
 
export default CameraComponent;
