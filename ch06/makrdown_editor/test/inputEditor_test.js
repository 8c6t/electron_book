const assert = require('assert');
const { JSDOM } = require('jsdom');

const createApplication = require('./createApplication');
const EditorPage = require('./editor.page');
const { capturePage, reportLog } = require('./helper.js');

describe('에디터 입력 테스트', function() {
  this.timeout(10000);
  let app;

  beforeEach(() => {
    app = createApplication();
    return app.start();
  });

  afterEach(function () {
    if (this.currentTest.state === "failed") {
      return Promise.all([
        capturePage(app, this.currentTest.title),
        reportLog(app, this.currentTest.title)
      ]).then(() => app.stop());
    }
    return app.stop();
  });

  describe('에디터에 Markdown 텍스트 입력하기', function() {
    it('HTML이 렌더링되었습니다', function () {
      const page = new EditorPage(app.client);

      return page.inputText('# h1 제목\n## h2 제목')
        .then(() => page.getRenderedHTML())
        .then((html) => {
          const dom = new JSDOM(html);
          const { document } = dom.window;
          
          const h1 = document.querySelector('h1');
          assert.equal(h1.textContent, 'h1 제목');

          const h2 = document.querySelector('h2');
          assert.equal(h2.textContent, 'h2 제목');
        });
    });
  });

  describe('이모티콘 입력하기', function() {
    it('이모티콘 PNG 이미지가 렌더링되었습니다.', function() {
      const page = new EditorPage(app.client);
      return page.inputText(':tada:')
        .then(() => page.findEmojiElement('tada'))
        .then((element) => assert(!!element));
    });
  });
});