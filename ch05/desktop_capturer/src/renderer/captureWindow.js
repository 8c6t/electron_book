import { desktopCapturer, remote, ipcRenderer } from 'electron';

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

function getCaptureImage({ videoElement, trimmedBounds, sourceDisplay }) {
  const { videoWidth, videoHeight } = videoElement;

  const s = sourceDisplay.scaleFactor || 1;

  const blankWidth = Math.max((videoWidth - sourceDisplay.bounds.width * s) / 2, 0);
  const blankHeight = Math.max((videoHeight - sourceDisplay.bounds.height * s) / 2, 0);

  const offsetX = (trimmedBounds.x - sourceDisplay.bounds.x) * s + blankWidth;
  const offsetY = (trimmedBounds.y - sourceDisplay.bounds.y) * s + blankHeight;

  const canvasElement = document.createElement('canvas');
  const context = canvasElement.getContext('2d');

  canvasElement.width = trimmedBounds.width;
  canvasElement.height = trimmedBounds.height;

  context.drawImage(
    videoElement,
    offsetX,
    offsetY,
    trimmedBounds.width * s,
    trimmedBounds.height * s,
    0,
    0,
    trimmedBounds.width,
    trimmedBounds.height,
  );

  return canvasElement.toDataURL('image/png');
}
/* 
const sourceDisplay = remote.screen.getPrimaryDisplay();
sourceDisplay.name = 'Screen 1';
const trimmedBounds = { x: 100, y: 100, width: 300, height: 300 };

getDesktopVideoStream(sourceDisplay).then(stream => {
  const videoElement = document.createElement('video');
  videoElement.srcObject = stream;
  // document.querySelector('body').appendChild(videoElement);
  
  videoElement.onloadedmetadata = (e) => {
    videoElement.play();
    const dataURL = getCaptureImage({ videoElement, trimmedBounds, sourceDisplay });

    const imgElement = document.createElement('img');
    imgElement.src = dataURL;
    document.querySelector('body').appendChild(imgElement);
  }
});
 */

 ipcRenderer.on('CAPTURE', (_, { sourceDisplay, trimmedBounds }) => {
  getDesktopVideoStream(sourceDisplay)
    .then(stream => {
      const videoElement = document.createElement('video');
      videoElement.srcObject = stream;
      videoElement.play();

      videoElement.onloadedmetadata = (e) => {
        const dataURL = getCaptureImage({ videoElement, trimmedBounds, sourceDisplay });
        
        ipcRenderer.send('REPLY_CAPTURE', { dataURL });
        videoElement.pause();
        URL.revokeObjectURL(dataURL);
      }
    })
    .catch(error => {
      ipcRenderer.send('REPLY_CAPTURE', { error });
    });
 });