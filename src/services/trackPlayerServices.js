import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  RepeatMode,
  Event
} from 'react-native-track-player';
export async function setupPlayer() {
  let isSetup = false;
  try {
    await TrackPlayer.getCurrentTrack();
    isSetup = true;
  }
  catch {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.SeekTo,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
      ],
      progressUpdateEventInterval: 2,
    });
    isSetup = true;
  }
  finally {
    return isSetup;
  }
}
export async function addTracks() {
  await TrackPlayer.add([
    {
      id: '1',
      img: require('../assets/images/lotus.png'),
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      title: 'Thiền',
      artist: 'Hoàng Gia Đại',
    },
    {
      id: '2',
      img: require('../assets/images/yoga.png'),
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      title: 'Yoga',
      artist: 'Hoàng Gia Đại',
    },
    {
      id: '3',
      img: require('../assets/images/music-note.png'),
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      title: 'Thư giãn',
      artist: 'Hoàng Gia Đại',
    },
    {
      id: '4',
      img: require('../assets/images/listen.png'),
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
      title: 'Chữa lành 1',
      artist: 'Hoàng Gia Đại',
    },
    {
      id: '5',
      img: require('../assets/images/listen.png'),
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
      title: 'Chữa lành 2',
      artist: 'Hoàng Gia Đại',
     },
     {
       id: '6',
       img: require('../assets/images/music-note.png'),
       url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
       title: 'Lofi',
       artist: 'Hoàng Gia Đại',
      },
      {
        id: '7',
        img: require('../assets/images/extended.png'),
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
        title: 'Yoga 2',
        artist: 'Hoàng Gia Đại',
       }
  ]);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
}
export async function playbackService() {
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    console.log('Event.RemotePause');
    TrackPlayer.pause();
  });
  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    console.log('Event.RemotePlay');
    TrackPlayer.play();
  });
  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    console.log('Event.RemoteNext');
    TrackPlayer.skipToNext();
  });
  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    console.log('Event.RemotePrevious');
    TrackPlayer.skipToPrevious();
  });

}