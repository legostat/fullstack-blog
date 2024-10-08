import { useQuery } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import { getUserInfo } from '../api/users';

export function User({ id }) {
  const userInfoQuery = useQuery({
    queryKey: ['users', id],
    queryFn: () => getUserInfo(id),
  });

  const userInfo = userInfoQuery.data || {};

  return <span>{userInfo?.username ?? id}</span>;
}

User.propTypes = {
  id: PropTypes.string.isRequired,
};
