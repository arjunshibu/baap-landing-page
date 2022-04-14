import { useState } from 'react';
import { useForm } from 'react-hook-form';
import SpinnerIcon from '../Icons/SpinnerIcon';
import { testError } from '../../utils/http';
import { onChange } from '../../hooks/useForm';
import { onSignup } from '../../hooks/useAuth';
import {
  textLabel,
  textInput,
  linkPrimary,
  tooltipError,
  tooltipSuccess,
} from '../../utils/classes';

const SignupForm = ({ onToggle }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onNameChange = (e) => onChange(e, setName, setError);
  const onEmailChange = (e) => onChange(e, setEmail, setError);
  const onPasswordChange = (e) => onChange(e, setPassword, setError);
  const onSubmit = (e) => onSignup(name, email, password, setError);

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name" className={textLabel}>
          Name
        </label>
        <span
          className={`w-full ${testError('name', error) ? tooltipError : ''}`}
          data-tip={error}
        >
          <input
            type="text"
            id="name"
            className={textInput}
            placeholder="John Doe"
            value={name}
            required
            onChange={onNameChange}
          />
        </span>
      </div>
      <div>
        <label htmlFor="email" className={textLabel}>
          Email
        </label>
        <span
          className={`${
            error
              ? (testError('email', error) && tooltipError) ||
                testError('name', error) ||
                testError('password', error) ||
                tooltipSuccess // lazy and dumb workaround, should improve later.
              : ''
          } w-full`}
          data-tip={error}
        >
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            className={textInput}
            placeholder="name@company.com"
            required
            onChange={onEmailChange}
          />
        </span>
      </div>
      <div>
        <label htmlFor="password" className={textLabel}>
          Password
        </label>
        <span
          className={`${
            testError('password', error) ? tooltipError : ''
          } w-full`}
          data-tip={error}
        >
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            placeholder="••••••••"
            className={textInput}
            required
            onChange={onPasswordChange}
          />
        </span>
      </div>
      <div>
        <button type="submit" className="w-full mt-2 btn btn-primary">
          {isSubmitting && <SpinnerIcon size={5} />}
          Sign up
        </button>
      </div>
      <p className="text-sm text-gray-900 font-medium dark:text-gray-300">
        Already registered?{' '}
        <a className={`cursor-pointer ${linkPrimary}`} onClick={onToggle}>
          Login
        </a>
      </p>
    </form>
  );
};

export default SignupForm;
