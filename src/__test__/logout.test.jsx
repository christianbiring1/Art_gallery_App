/* eslint-disable */
import React from 'react';
import { render, waitForElementToBeRemoved } from '@testing-library/react';
import Logout from '../components/auth/logout';

jest.mock('firebase/auth', () => ({
  signOut: jest.fn(() => Promise.resolve()),
}));

describe('Logout', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'test');
  });

  afterEach(() => {
    localStorage.removeItem('token');
    jest.clearAllMocks();
  });

  test('should call the signOut function', () => {
    render(<Logout />);
    expect(signOut).toHaveBeenCalledWith(auth);
  });

  test('should remove token from local storage', async () => {
    render(<Logout />);
    await waitForElementToBeRemoved(() => localStorage.getItem('token'));
    expect(localStorage.getItem('token')).toBeNull();
  });

  test('should redirect to the home page', async () => {
    render(<Logout />);
    expect(window.location.pathname).toEqual('/');
  });
});