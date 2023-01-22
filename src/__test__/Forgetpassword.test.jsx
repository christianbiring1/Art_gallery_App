/* eslint-disable */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ForgetPassword from '../components/auth/Forgetpassword';

jest.mock('firebase/auth', () => ({
  sendPasswordResetEmail: jest.fn(() => Promise.resolve()),
}));

describe('ForgetPassword', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = render(
      <MemoryRouter>
        <ForgetPassword />
      </MemoryRouter>,
    );
  });

  test('should render a form element', () => {
    const { getByTestId } = wrapper;
    expect(getByTestId('form')).toBeInTheDocument();
  });

  test('should render an input element', () => {
    const { getByTestId } = wrapper;
    expect(getByTestId('input')).toBeInTheDocument();
  });

  test('should render a button element', () => {
    const { getByTestId } = wrapper;
    expect(getByTestId('button')).toBeInTheDocument();
  });

  test('should update the state when input values change', () => {
    const { getByTestId } = wrapper;
    const input = getByTestId('input');
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    expect(input.value).toBe('test@example.com');
  });

  test('should call the sendPasswordResetEmail function when the form is submitted', async () => {
    const { getByTestId } = wrapper;
    const form = getByTestId('form');
    fireEvent.submit(form);
    expect(sendPasswordResetEmail).toHaveBeenCalledWith(auth, 'test@example.com');
  });

  test('should set notification message when the form is submitted', async () => {
    const { getByTestId } = wrapper;
    const form = getByTestId('form');
    fireEvent.submit(form);
    const notification = await wrapper.findByTestId('notification');
    expect(notification.textContent).toEqual('Password reset email sent!');
  });

  test('should set error message when the form is submitted with invalid email', async () => {
    const { getByTestId } = wrapper;
    const form = getByTestId('form');
    sendPasswordResetEmail.mockImplementationOnce(() => Promise.reject({ code: 'auth/invalid-email' }));
    fireEvent.submit(form);
    const error = await wrapper.findByTestId('error');
    expect(error.textContent).toEqual('auth/invalid-email');
  });
});
