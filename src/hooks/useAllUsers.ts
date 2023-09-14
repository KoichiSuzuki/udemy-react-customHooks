import { useState } from "react";
import { UserProfile } from "../types/userProfile";
import axios from "axios";
import { User } from "../types/api/user";

//全ユーザー一覧を取得するカスタムフック
export const useAllUsers = () => {
  const [userProfiles, setUserPlofiles] = useState<Array<UserProfile>>([]);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(false);

  const getUsers = () => {
    setloading(true);
    setError(false);

    axios
      .get<Array<User>>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const data = res.data.map((user) => ({
          id: user.id,
          name: `${user.name}(${user.username})`,
          email: user.email,
          address: `${user.address.city}
       ${user.address.suite}
       ${user.address.street}`
        }));
        setUserPlofiles(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setloading(false);
      });
  };
  return { getUsers, userProfiles, loading, error };
};