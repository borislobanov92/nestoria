import { NestoriaPage } from './app.po';

describe('nestoria App', function() {
  let page: NestoriaPage;

  beforeEach(() => {
    page = new NestoriaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
