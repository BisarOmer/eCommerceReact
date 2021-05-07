import { useRecoilState } from 'recoil';

import { wishlistState, cartState } from './Atoms';

export const useAddProductWishlist = () => {

  const [wishlist, setWishlist] = useRecoilState(wishlistState);

  return (product) => {
    const index = wishlist.findIndex(item => item.id === product.id);

    if (index === -1) {
      return setWishlist([...wishlist, { ...product }]);
    }

    const newWishlist = wishlist.map((item, i) => {
      if (i === index) {
        return {
          ...item,
        }
      }

      return item;
    })

    setWishlist(newWishlist)
  }
}

export const useRemoveProductWishlist = () => {
  const [wishlist, setWishlist] = useRecoilState(wishlistState);

  return (product) => {
    const index = wishlist.findIndex(item => item.id === product.id);

    if (index === -1) {
      alert('Product not found in cart!')
      return;
    }
    const newWishlist = wishlist.filter(item => item.id !== product.id)
    setWishlist(newWishlist)
  }
}

export const useAddProductCart = () => {
  const [cart, setCart] = useRecoilState(cartState);

  return (product) => {
    const index = cart.findIndex(item => item.id === product.id);

    if (index === -1) {
      return setCart([...cart, { ...product, qty: 1 }]);
    }

    const newCart = cart.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          qty: item.qty + 1,
        }
      }

      return item;
    })

    setCart(newCart)
  }
}

export const useRemoveProductCart = () => {
  const [cart, setCart] = useRecoilState(cartState);

  return (product) => {
    const index = cart.findIndex(item => item.id === product.id);

    if (index === -1) {
      alert('Product not found in cart!')
      return;
    }

    const newCart = cart.filter(item => item.id !== product.id)

    setCart(newCart)
  }
}

export const useUpdateProductQty = () => {
  const [cart, setCart] = useRecoilState(cartState);

  return (product, type) => {
    const index = cart.findIndex(item => item.id === product.id);

    if (index === -1) {
      alert('Product not found in cart!')
      return;
    }




    const newCart = cart.map((item, i) => {

      if (type === "dec" && item.qty == 1)
        return item;

      if (i === index) {
        return {
          ...item,
          qty: type === "inc" ? item.qty + 1 : item.qty - 1,
        }
      }

      return item;
    })

    setCart(newCart)
  }
}
