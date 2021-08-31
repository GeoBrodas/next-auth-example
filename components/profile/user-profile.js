import { useSession } from 'next-auth/client';
import ProfileForm from './profile-form';
import classes from './user-profile.module.css';

function UserProfile() {
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   getSession().then((session) => {
  //     if (!session) {
  //       window.location.href = '/auth'; // redirect to login if no session token
  //     } else {
  //       setIsLoading(false);
  //     }
  //   });
  // }, []);

  // if (isLoading) {
  //   return <p className={classes.profile}>Loading...</p>;
  // }
  const [session, loading] = useSession();
  console.log(session);

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      {session && (
        <img
          src={session.user.image}
          style={{ width: '50px', height: '50px' }}
          alt={session.user.name}
        />
      )}
      <ProfileForm />
    </section>
  );
}

export default UserProfile;
