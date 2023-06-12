import * as React from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';

import GlobalContainer from '../../components/Container/Container';
import GlobalHeader from '../../components/Header/Header';
import styles from './styles';
import {TabView, SceneMap} from 'react-native-tab-view';
import ComicFlatList from './ComicFlatList';

export default function ComicRanking({navigation}) {
  const FirstRoute = () => <ComicFlatList navigation={navigation} />;
  const SecondRoute = () => <ComicFlatList navigation={navigation} />;
  const ThirdRoute = () => <ComicFlatList navigation={navigation} />;
  
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'TOP Ngày'},
    {key: 'second', title: 'TOP Tuần'},
    {key: 'third', title: 'TOP Tháng'},
  ]);

  const handleIndexChange = React.useCallback(newIndex => {
    setIndex(newIndex);
  }, []);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  const handleOnClick = index => {
    setActiveIndex(index);
  };

  const [activeIndex, setActiveIndex] = React.useState(0);

  const renderTabBar = React.useCallback(
    props => {
      return (
        <View style={styles.tabBar}>
          {props.navigationState.routes.map((route, i) => {
            const isActive = activeIndex === i;
            return (
              <TouchableOpacity
                style={styles.tabItem}
                activeOpacity={1}
                onPress={() => {
                  setIndex(i);
                  handleOnClick(i);
                }}
                key={route.key}>
                <Animated.Text
                  style={{color: 'black', fontWeight: 500, fontSize: 17}}>
                  {route.title}
                </Animated.Text>
                <Text
                  style={[
                    {
                      backgroundColor: '#f0564a',
                      width: '90%',
                      height: 3,
                      marginTop: '10%',
                    },
                    isActive ? {} : {height: 0},
                  ]}></Text>
              </TouchableOpacity>
            );
          })}
        </View>
      );
    },
    [activeIndex],
  );

  return (
    <GlobalContainer>
      <GlobalHeader
        navigation={navigation}
        showLeftButton={true}
        showRightButton={false}
        children={<Text style={styles.title_header}>{'Xếp hạng truyện'}</Text>}
      />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={handleIndexChange}
        swipeEnabled={false}
      />
      {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 26, fontWeight: 'bold', color: 'black' }}>{screenString.COMIC_RANKING} screen</Text>
            </View> */}
    </GlobalContainer>
  );
}
