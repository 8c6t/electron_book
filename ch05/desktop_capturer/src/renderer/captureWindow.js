import { desktopCapturer, remote } from 'electron';

// https://electronjs.org/docs/api/desktop-capturer
function getDesktopVideoStream(sourceDisplay) {
  return new Promise((resolve, reject) => {
    // 콜백 패턴은 deprecated 예정인듯...
    desktopCapturer.getSources({ types: ['screen'] }, (error, sources) => {
      if (error) {
        return reject(error);
      }

      let targetSource;
      if (sources.length === 1) {
        targetSource = sources[0];
      } else {
        targetSource = sources.find(source => source.name === sourceDisplay.name);
      }

      if (!targetSource) {
        return reject({ message: 'No available source' });
      }

      navigator.getUserMedia({
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: targetSource.id,
            minWidth: 100,
            minHeight: 100,
            maxWidth: 4096,
            maxHeight: 4096,
          }
        }
      },
      resolve, reject);
    });
  });
}

const sourceDisplay = remote.screen.getPrimaryDisplay();
sourceDisplay.name = 'Screen 1';

getDesktopVideoStream(sourceDisplay).then(stream => {
  const videoElement = document.createElement('video');
  videoElement.srcObject = stream;
  videoElement.onloadedmetadata = (e) => {
    videoElement.play();
  }

  document.querySelector('body').appendChild(videoElement);
});
