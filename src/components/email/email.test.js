import Email from "./email.js";

const appName = 'GhostRider';

const email = new Email({
  to: 'test@ghostrider.awesome',
  subject: 'Test Email',
  template: 'test-email',
  context: {
    'app_name': appName,
  }
});

describe('Email class', function () {
  it('should be able to create new email object', function () {
    expect(email).toBeInstanceOf(Email);
  });

  it('should have a subject', function () {
    expect(email.subject).toBe('Test Email');
  });

  it('should have a to', function () {
    expect(email.to).toBe('test@ghostrider.awesome');
  });

  it('should have a template', function () {
    expect(email.template).toBe('test-email.html');
  });

  it('should have a context', function () {
    expect(email.context).toEqual({
      'app_name': appName,
    });
  });

  it('should be able to get template content', function () {
    expect(email.content).toBeDefined();
  });

  it('should contain appName in template content', function () {
    expect(email.content).toContain(appName);
  });
});
