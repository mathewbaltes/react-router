require('./helper');
var URLStore = require('../modules/stores/URLStore');

describe('when a new path is pushed to the URL', function () {
  beforeEach(function () {
    URLStore.push('/a/b/c');
  });

  afterEach(function () {
    URLStore.teardown();
  });

  it('has the correct path', function () {
    expect(URLStore.getCurrentPath()).toEqual('/a/b/c');
  });
});

describe('when a new path is used to replace the URL', function () {
  beforeEach(function () {
    URLStore.replace('/a/b/c');
  });

  afterEach(function () {
    URLStore.teardown();
  });

  it('has the correct path', function () {
    expect(URLStore.getCurrentPath()).toEqual('/a/b/c');
  });
});

describe('when going back in history', function () {
  afterEach(function () {
    URLStore.teardown();
  });

  it('has the correct path', function () {
    URLStore.push('/a/b/c');
    expect(URLStore.getCurrentPath()).toEqual('/a/b/c');

    URLStore.push('/d/e/f');
    expect(URLStore.getCurrentPath()).toEqual('/d/e/f');

    URLStore.back();
    expect(URLStore.getCurrentPath()).toEqual('/a/b/c');
  });

  it('should not go back before recorded history', function () {
    var error = false;
    try {
      URLStore.back();
    } catch (e) {
      error = true;
    }

    expect(error).toEqual(true);
  });
});
