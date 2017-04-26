import { LkthPage } from './app.po';

describe('lkth App', () => {
  let page: LkthPage;

  beforeEach(() => {
    page = new LkthPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
