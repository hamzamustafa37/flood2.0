// import { _getCurrentUser, user } from '../../lib/features/auth';
// import React from 'react';
// import { useAppDispatch } from '@/lib/hooks';
// import { useSelector } from 'react-redux';
// import { type IUser } from '@/utils';
// interface IUseCurrentUser {
//     currentUser: IUser;
// }
// export const useCurrentUser = (): IUseCurrentUser => {
//     const [currentUser, setCurrentUser] = React.useState<IUser>({
//         email: '',
//         fullName: '',
//         imgUrl: '',
//         country: '',
//         state: '',
//         authType: '',
//         subscriptionStart: '',
//         subscriptionEnd: '',
//     });
//     const dispatch = useAppDispatch();
//     const _user = useSelector(user);

//     React.useEffect(() => {
//         if (_user.email === '') {
//             dispatch(
//                 _getCurrentUser(user => {
//                     setCurrentUser(user);
//                 })
//             );
//         } else {
//             setCurrentUser(_user);
//         }
//     }, [_user, dispatch]);

//     return {
//         currentUser,
//     };
// };
