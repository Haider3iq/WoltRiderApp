import React from 'react';
import { Text, View, Modal, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import FastImage from 'react-native-fast-image';

export default class MessageImage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      viewerModalOpen: false,
    };
  }
  render() {
    const { containerStyle, lightboxProps, imageProps, imageStyle, currentMessage } = this.props;
    return (
      <React.Fragment>
        <TouchableOpacity
          onPress={() => {
            this.setState({ viewerModalOpen: true });
          }}
          onLongPress={() => {
            this.props.onLongPress();
          }}
          alignment={this.props.alignment}
          style={[{width: "20%", height: "20%"}, containerStyle]}
        >
          <FastImage
            {...imageProps}
            resizeMode={FastImage.resizeMode.cover}
            style={[{width: 200, height: 200}, imageStyle]}
            source={{ uri: currentMessage.image }}
          />
        </TouchableOpacity>
        <Modal visible={this.state.viewerModalOpen} transparent={true} onRequestClose={() => {}}>
          <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
            <ImageViewer
              imageUrls={[{ url: currentMessage.image }]}
              onCancel={() => {
                this.setState({ viewerModalOpen: false });
              }}
              enableSwipeDown
              renderHeader={() => (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ viewerModalOpen: false });
                  }}
                >
                  <Text style={{fontSize: 20, backgroundColor: "red", color: "white"}}>Close</Text>
                </TouchableOpacity>
              )}
            />
          </SafeAreaView>
        </Modal>
      </React.Fragment>
    );
  }
}