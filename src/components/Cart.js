import React, { useState, useEffect } from 'react';
import { useRecoilValue, } from 'recoil';
import { cartState as _cartState } from '../Recoil/Atoms';
import { useRemoveProductCart, useUpdateProductQty } from '../Recoil/Hooks';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';

import DeleteIcon from '@material-ui/icons/Delete';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


function Cart() {
  const cartProducts = useRecoilValue(_cartState);
  const removeProductCart = useRemoveProductCart();
  const updateProductQty = useUpdateProductQty();

  const [total, setTotal] = useState();
  const [sumQty, setSumQty] = useState();


  const sumFun = async () => {

    const sum = await cartProducts.map(item => item.qty * item.price);
    setTotal(sum.reduce((a, b) => a + b, 0))

    const sumQty = await cartProducts.map(item => item.qty);
    setSumQty(sumQty.reduce((a, b) => a + b, 0))
  }

  useEffect(() => {
    sumFun();
  }, [])

  return (
    <React.Fragment>

      <Typography variant="h3" gutterBottom>
        Cart
      </Typography>

      {cartProducts.length ?
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            margin: 10,
          }}>

          {
            cartProducts.map((item) => (
              <Card style={{ margin: 30, display: "flex", alignItems: 'flex-start', minWidth: 600, maxWidth: 900 }}>

                <CardActionArea>
                  <CardMedia
                    style={{ height: 300, maxWidth: 400, minWidth: 400, padding: 10 }}
                    image={item.image}
                  />
                </CardActionArea>

                <CardContent >
                  <Typography gutterBottom variant="h5" component="h2" align="left">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" gutterBottom align="left">
                    {item.description}
                  </Typography>
                  <Typography variant="h6" gutterBottom align="left" >
                    {'$' + item.price * item.qty}
                  </Typography>

                  <Typography variant="h6" gutterBottom align="left" >
                    Quantity
                  </Typography>
                  <div style={{ display: "flex", justifyContent: 'space-around', Width: 200 }}>
                    <IconButton aria-label="ExpandLessIcon">
                      <ExpandLessIcon onClick={async () => { await updateProductQty(item, "inc"); sumFun(); }} />
                    </IconButton>
                    <Typography variant="h6" gutterBottom  >
                      {item.qty}
                    </Typography>
                    <IconButton aria-label="ExpandMoreIcon">
                      <ExpandMoreIcon onClick={async () => { await updateProductQty(item, "dec"); sumFun(); }} />
                    </IconButton>
                  </div>

                </CardContent>

                <IconButton aria-label="delete" color="secondary">
                  <DeleteIcon onClick={() => { removeProductCart(item); sumFun(); }} />
                </IconButton>

              </Card>
            )
            )}
        </div>
        :
        <div >
          <Typography variant="h6" gutterBottom>
            Empty Cart
      </Typography>
          <Typography variant="body1" gutterBottom>
            Start shopping and Add product to cart
      </Typography>
        </div>
      }
      <Divider light />
      <Card style={{margin:10 ,padding:10}}>
        <div style={{ Width: 600}}>
          <Typography variant="h6" gutterBottom align='left'>
            Tax :{' $' + ((total * 6) / 100).toFixed(2)}
          </Typography>
          <Typography variant="h6" gutterBottom align='left'>
            Shipping : {' $' + sumQty * 10}
          </Typography>
          <Typography variant="h6" gutterBottom align='left'>
            Sub Total : {' $' + total}
          </Typography>
          <Typography variant="h6" gutterBottom align='left'>
            Total : {' $' + (total + (cartProducts.length * 10) + (total * 6) / 100).toFixed(2)}
          </Typography>
          <Button variant="contained" color="primary">
            Checkout
      </Button>
        </div>
      </Card>

    </React.Fragment>
  );

}
export default Cart;