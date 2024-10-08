import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { describe, expect, test } from '@jest/globals';

import { createUser } from '../services/users.js';
import { User } from '../db/models/user.js';

describe('creating user', () => {
  test('with all parameters should succeed', async () => {
    const userCredentials = {
      username: 'Daniel Burgl',
      password: 'password',
    };

    const createdUser = await createUser(userCredentials);
    expect(createdUser._id).toBeInstanceOf(mongoose.Types.ObjectId);
    const user = await User.findOne(createdUser._id);
    expect(
      bcrypt.compare(userCredentials.password, user.password),
    ).toBeTruthy();
  });
});
