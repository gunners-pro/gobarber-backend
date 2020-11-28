import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUserService = new CreateUserService(fakeUsersRepository);

    const user = await createUserService.execute({
      name: 'Jonh Doe',
      email: 'johndoe@exmaple.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUserService = new CreateUserService(fakeUsersRepository);

    await createUserService.execute({
      name: 'Jonh Doe',
      email: 'johndoe@exmaple.com',
      password: '123456',
    });

    expect(
      createUserService.execute({
        name: 'Jonh Doe',
        email: 'johndoe@exmaple.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
