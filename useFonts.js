import * as Font from 'expo-font';

export default fetchFonts = async () => {
    await Font.loadAsync({
    'DMSans-Bold': require('./assets/fonts/DMSans-Bold.ttf'),
    'DMSans-Medium': require('./assets/fonts/DMSans-Medium.ttf'),
    'DMSans-Regular': require('./assets/fonts/DMSans-Regular.ttf')
    });
  };