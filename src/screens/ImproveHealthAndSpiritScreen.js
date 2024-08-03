import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,
  SafeAreaView,
  ActivityIndicator,
  FlatList
} from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '../styles/ImproveHealthAndSpiritScreen'
import TrackPlayer, {
  useTrackPlayerEvents,
  Event,
  State,
  usePlaybackState,
  useProgress
} from 'react-native-track-player';
import { addTracks, setupPlayer } from '../services/trackPlayerServices';
import Icon from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';

const ImproveHealthAndSpiritScreen = ({ navigation }) => {

  const handleTrangChuNavigation = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'BottomTabNavigator' }],
    });
  };

  // khai báo trạng thái để kiểm soát nếu chưa sẵn sàng load nhạc thì hiện thị activityIndicator quay quay
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  // khi render thì bắt đầu khởi tạo đối tượng chơi nhạc

  useEffect(() => {
    async function setup() {
      let isSetup = await setupPlayer();
      const queue = await TrackPlayer.getQueue();
      if (isSetup && queue.length <= 0) {
        await addTracks();
      }
      setIsPlayerReady(isSetup);
    }
    setup();
  }, []);

  function PlayList() {
    const [queue, setQueue] = useState([]);
    const [currentTrack, setCurrentTrack] = useState(0);

    async function loadPlayList() {
      const queue = await TrackPlayer.getQueue();
      setQueue(queue);
    }

    useEffect(() => {
      loadPlayList();
    }, []);

    useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], (event) => {
      if (event.state == State.nextTrack) {
        TrackPlayer.getCurrentTrack().then((index) => setCurrentTrack(index));
      }
    });

    function PlayListItem({ index, img, title, isCurrent }) {
      function handleItemPress() {
        TrackPlayer.skip(index);
      }

      return (
        <TouchableOpacity
          style={{
            ...{
              backgroundColor: isCurrent ? '#666' : '#66FFCC',
              flexDirection: 'row',
              borderRadius: 15,
              marginBottom: 15
            }
          }}
          onPress={handleItemPress}>
          <Image source={img} style={styles.imgNhac} />
          <Text
            style={{ ...styles.playlistItem }}>{title}</Text>
        </TouchableOpacity>
      )
    }

    return (
      <View>
        <View style={styles.playlist}>
          <FlatList
            data={queue}
            renderItem={({ item, index }) => <PlayListItem
              index={index}
              img={item.img}
              title={item.title}
              isCurrent={currentTrack == index} />
            }
          />
        </View>
      </View >
    )

  }

  function Controls({ onShuffle }) {
    const playerState = usePlaybackState();
    async function handlePlayPress() {
      if (await TrackPlayer.getState() == State.Playing) {
        TrackPlayer.pause();
      }
      else {
        TrackPlayer.play();
      }
    }
    return (
      <View style={{
        flexDirection: 'row',
        flexWrap: 'wrap', alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute', bottom: 0, left: 0, right: 0,
        marginBottom: 20
      }}>
        <Icon.Button
          name="arrow-left"
          size={38}
          backgroundColor="transparent"
          color="#111111"
          onPress={() => TrackPlayer.skipToPrevious()} />
        <Icon.Button
          name={playerState.state == State.Playing ? 'pause' : 'play'}
          size={45}
          backgroundColor="transparent"
          color="#111111"
          style={styles.buttonPlay}
          onPress={handlePlayPress} />
        <Icon.Button
          name="arrow-right"
          size={38}
          backgroundColor="transparent"
          color="#111111"
          onPress={() => TrackPlayer.skipToNext()} />
      </View>
    );
  }

  function TrackProgress() {
    const { position, duration } = useProgress(200);
    function format(seconds) {
      let mins = (parseInt(seconds / 60)).toString().padStart(2, '0');
      let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
      return `${mins}:${secs}`;
    }
    return (
      <View style={{
        alignItems: 'center',
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        marginBottom: 90
      }}>
        <Text style={styles.trackProgress}>
          {format(position)} / {format(duration)}
        </Text>
        <Slider
          style={{ width: 400, height: 40 }}
          minimumValue={0}
          maximumValue={duration}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          value={position}
        />
      </View>
    );
  }

  function Header() {
    const [info, setInfo] = useState({});
    useEffect(() => {
      setTrackInfo();
    }, []);
    useTrackPlayerEvents([Event.PlaybackTrackChanged], (event) => {
      if (event.state == State.nextTrack) {
        setTrackInfo();
      }
    });
    async function setTrackInfo() {
      const track = await TrackPlayer.getCurrentTrack();
      const info = await TrackPlayer.getTrack(track);
      setInfo(info);
    }
    return (
      <View style={{
        position: 'absolute',
        bottom: 0,
        marginBottom: 175,
        marginLeft: 30
      }}>
        <Text style={styles.songTitle}>{info.title}</Text>
        <Text style={styles.artistName}>{info.artist}</Text>
      </View>
    );
  }

  if (!isPlayerReady) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleTrangChuNavigation}>
            <Image source={require('../assets/icons/back.png')} style={styles.iconBack} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Nâng cao tinh thần</Text>
        </View>

        <Text style={styles.content}>Chọn bài nhạc bạn yêu thích và và bắt đầu một ngày mới nắng lượng</Text>

        <ActivityIndicator size="large" color="#bbb" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleTrangChuNavigation}>
          <Image source={require('../assets/icons/back.png')} style={styles.iconBack} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nâng cao tinh thần</Text>
      </View>

      <Text style={styles.content}>Chọn bài nhạc bạn yêu thích và và bắt đầu một ngày mới nắng lượng</Text>

      <PlayList />
      <Header />
      <TrackProgress />
      <Controls />
    </View>
  )




}

export default ImproveHealthAndSpiritScreen