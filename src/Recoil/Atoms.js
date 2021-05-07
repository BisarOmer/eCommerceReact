import { atom } from 'recoil';

export  const wishlistState = atom({
    key: 'wishlistState',
    default: [],
});

export  const cartState = atom({
    key: 'cartState',
    default: [],
});
