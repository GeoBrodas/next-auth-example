import classes from './profile-form.module.css';
import { useRef } from 'react';

function ProfileForm() {
  const userOldPassword = useRef();
  const userNewPassword = useRef();

  async function submitHandler(event) {
    event.preventDefault();

    const enteredOldPassword = userOldPassword.current.value;
    const enteredNewPassword = userNewPassword.current.value;

    // add validation errors ( optional )

    const response = await fetch('/api/user/change-password', {
      method: 'PATCH',
      body: JSON.stringify({
        oldPassword: enteredOldPassword,
        newPassword: enteredNewPassword,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log(data);
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={userNewPassword} />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" ref={userOldPassword} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
