import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import PhotoView from 'react-native-photo-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import PXTouchable from '../../components/PXTouchable';
import Loader from '../../components/Loader';
// import PXPhotoView from './PXPhotoView';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    width,
    height,
    flex: 1,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  thumbWrap: {
    marginTop: 100,
    borderWidth: 5,
    borderColor: '#000',
    flexDirection: 'row',
  },
  thumb: {
    width: 50,
    height: 50,
  },
});

class ImagesViewer extends Component {
  static navigationOptions = ({ navigation }) => {
    const { openBottomSheet } = navigation.state.params;
    return {
      headerRight: (
        <PXTouchable onPress={openBottomSheet}>
          <Icon
            name="ellipsis-v"
            size={20}
            style={{ paddingVertical: 10, paddingHorizontal: 20 }}
          />
        </PXTouchable>
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    const { navigation, screenProps: { openBottomSheet } } = this.props;
    const { images, viewerIndex } = navigation.state.params;
    const openImages = [images[viewerIndex]];
    navigation.setParams({
      openBottomSheet: () => openBottomSheet(openImages),
    });
  }

  handleOnMomentumScrollEnd = (e, state) => {
    const { navigation, screenProps: { openBottomSheet } } = this.props;
    const { images } = navigation.state.params;
    const { index } = state;
    const openImages = [images[index]];
    navigation.setParams({
      viewerIndex: index,
      openBottomSheet: () => openBottomSheet(openImages),
    });
  };

  handleOnImageLoaded = () => {
    console.log('loaded');
    this.setState({ loading: false });
  };

  render() {
    const { images, viewerIndex } = this.props.navigation.state.params;
    const { loading } = this.state;
    console.log('viewerIndex ', viewerIndex);
    return (
      <View style={styles.container}>
        <Swiper
          index={viewerIndex}
          onMomentumScrollEnd={this.handleOnMomentumScrollEnd}
        >
          {images.map(image => (
            <View key={image} style={styles.slide}>
              {loading && <Loader />}
              <PhotoView
                source={{
                  uri: image,
                  headers: {
                    referer: 'http://www.pixiv.net',
                  },
                }}
                onLoad={this.handleOnImageLoaded}
                resizeMode="contain"
                minimumZoomScale={0.5}
                maximumZoomScale={3}
                androidScaleType="fitCenter"
                style={styles.photo}
              />
            </View>
          ))}
        </Swiper>
      </View>
    );
    /* return (
      <View style={styles.container}>
        <Swiper
          index={viewerIndex}
          onMomentumScrollEnd={this.handleOnMomentumScrollEnd}
        >
          {
            images.map((image, i) => {
              return (
                <View key={i} style={styles.slide}>
                  {
                    loading &&
                    <Loader />
                  }
                  <PhotoView
                    source={{
                      uri: image,
                      headers: {
                        referer: "http://www.pixiv.net"
                      }
                    }}
                    onLoad={this.handleOnImageLoaded}
                    resizeMode='contain'
                    minimumZoomScale={0.5}
                    maximumZoomScale={3}
                    androidScaleType='fitCenter'
                    style={styles.photo}
                  />
                </View>
              )
            })
          }
        </Swiper>
      </View>
    );*/
  }
}

export default ImagesViewer;