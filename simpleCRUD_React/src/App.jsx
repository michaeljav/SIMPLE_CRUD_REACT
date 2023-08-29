import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [userArr, setUserArr] = useState([]);

  const objuser = {
    id: null,
    name: '',
    lastName: '',
    password: '',
  };
  const [user, setUser] = useState(objuser);

  const onSubmit = (event) => {
    event.preventDefault();
    // console.log("Testing ", user);
    // setUserArr([...userArr, user]);
    // setUserArr((prev) => [...prev, user]);
    //create new
    if (user.id === null) {
      setUserArr((prev) => {
        let newUser = { ...user, id: new Date().getTime() };
        let t = [...prev, newUser];
        // console.log("Testing ", t);
        return t;
      });
    } else {
      // update
      //find user to update
      let userToUpdte = userArr.find((u) => u.id === user.id);
      console.log('object found ', userToUpdte);
      if (!userToUpdte) {
        console.log('no exist this user');
        return;
      }
      //filter
      let userFiltered = userArr.filter((u) => u.id !== user.id);
      let mod = [...userFiltered, user];
      setUserArr(mod);
    }

    setUser(objuser);
  };

  const select = (id) => {
    let userFind = userArr.find((user) => user.id === id);
    if (userFind) setUser(() => userFind);
    // console.log("updating", userFind);
  };

  const _delete = (id) => {
    let userFiltered = userArr.filter((u) => u.id !== id);
    let mod = [...userFiltered];
    setUserArr(mod);
  };

  // useEffect(() => {
  //   // console.log("Testing ", userArr);
  // }, [userArr]);

  const onHandleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  return (
    <div className='App'>
      <h1>Hello MICHAEL REACT SIMPLE CRUD </h1>

      <form onSubmit={onSubmit}>
        <div>
          <label>Name</label>
          <input
            name='name'
            type='text'
            value={user.name}
            onChange={onHandleChange}
          />
        </div>
        <div>
          <label>LastName</label>
          <input
            name='lastName'
            type='text'
            value={user.lastName}
            onChange={onHandleChange}
          />
        </div>
        <div>
          <label>password</label>
          <input
            name='password'
            type='password'
            value={user.password}
            onChange={onHandleChange}
          />
        </div>
        <input type='submit' value='create/update' />
      </form>
      <ol>
        {userArr.length > 0 &&
          userArr.map((user, index) => (
            <li key={user.id}>
              {user.name} {user.lastName}
              &nbsp;
              <input
                onClick={() => _delete(user.id)}
                type='button'
                value='delete_'
              />
              <input
                onClick={() => select(user.id)}
                type='button'
                value='update'
              />
            </li>
          ))}
      </ol>
    </div>
  );
}

export default App;
