import { PortalFormPage } from './app.po';

describe('portal-form App', () => {
  let page: PortalFormPage;

  beforeEach(() => {
    page = new PortalFormPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
