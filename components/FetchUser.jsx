import UserCard from '../components/UserCard.jsx'
import {useState,useEffect} from 'react'

export default function FetchUser({ id }) {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
    try{
      let res = await fetch('https://jsonplaceholder.typicode.com/users/' + id);
      if (!res.ok) throw(new Error(res.status));
      let u = await res.json();
      setUser(u);
    } catch(err) {
      setError(err);
      }
  }
  fetchData();
},[]); //// Примечание: пустой массив зависимостей [] означает, что
  // этот useEffect будет запущен один раз
  // аналогично componentDidMount()

  if (error)
    return <div>Ошибка: {error.message}</div>
  else if (user)
    return <UserCard user={user} />
  else
    return <div className="spinner" />
}
