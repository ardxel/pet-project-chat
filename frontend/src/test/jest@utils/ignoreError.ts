export const ignoreError = () => {
  beforeEach(() => jest.spyOn(console, 'error').mockImplementation(() => {}));
};
