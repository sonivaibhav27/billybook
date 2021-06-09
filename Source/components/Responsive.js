import {Dimensions, PixelRatio} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
export const widthToDp = width => {
  let mapWidth = typeof width === 'number' ? width : parseFloat(width);
  return PixelRatio.roundToNearestPixel((SCREEN_WIDTH * mapWidth) / 100);
};

export const heightToDp = height => {
  let mapHeight = typeof height === 'number' ? height : parseFloat(height);
  return PixelRatio.roundToNearestPixel((SCREEN_HEIGHT * mapHeight) / 100);
};
