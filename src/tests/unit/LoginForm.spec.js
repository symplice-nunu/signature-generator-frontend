import { mount } from '@vue/test-utils';
import LoginForm from '@/components/LoginForm.vue';

describe('LoginForm.vue', () => {
  it('displays an error if email is invalid', async () => {
    const wrapper = mount(LoginForm);
    
    await wrapper.setData({ email: 'invalid-email' });
    wrapper.vm.validateEmail();
    
    expect(wrapper.vm.emailError).toBe(true);
    expect(wrapper.vm.emailErrorMessage).toBe('Please enter a valid email.');
  });

  it('displays an error if password is less than 6 characters', async () => {
    const wrapper = mount(LoginForm);
    
    await wrapper.setData({ password: '123' });
    wrapper.vm.validatePassword();
    
    expect(wrapper.vm.passwordError).toBe(true);
    expect(wrapper.vm.passwordErrorMessage).toBe('Password must be at least 6 characters.');
  });

  it('successfully submits form with valid inputs', async () => {
    const wrapper = mount(LoginForm);
    await wrapper.setData({
      email: 'validemail@example.com',
      password: 'validpassword'
    });

    // Mock the axios post request for login
    wrapper.vm.$axios = { post: jest.fn().mockResolvedValue({ data: { token: 'mock-token' } }) };
    await wrapper.vm.handleLogin();

    expect(localStorage.getItem('token')).toBe('mock-token');
    expect(wrapper.vm.loginSuccess).toBe(true);
    expect(wrapper.vm.loginSuccessMessage).toBe('Login successful! Redirecting...');
  });
});
