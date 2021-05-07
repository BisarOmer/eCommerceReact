import React, { useEffect, useState } from 'react';
import { wishlistState as _wishlistState } from '../Recoil/Atoms';
import { useRecoilValue, } from 'recoil';


import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import DeleteIcon from '@material-ui/icons/Delete';

import { useRemoveProductWishlist } from '../Recoil/Hooks';



function Wishlist() {

  const wishlistProducts = useRecoilValue(_wishlistState);

  const removeProductWishlit = useRemoveProductWishlist();

  return (
    <React.Fragment>
      <Typography variant="h3" gutterBottom>
        Favourite List
      </Typography>
      {wishlistProducts.length ?
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            margin: 10,
          }}>

          {
            wishlistProducts.map((item, index) => (
              <Card style={{ maxWidth: 345, minWidth: 345, height: 450, margin: 30, alignItems: 'left' }}>
                <CardActionArea>
                  <CardMedia
                    style={{ height: 250 }}
                    image={item.image}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {item.title.slice(0, 20) + '...'}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {'$' + item.price}
                    </Typography>
                  </CardContent>
                </CardActionArea>

                <CardActions style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    endIcon={<DeleteIcon />}
                    onClick={() => removeProductWishlit(item)}
                  >
                    Remove
          </Button>
                </CardActions>

              </Card>
            )
            )}

        </div>
        :
        <div >
          <Typography variant="h6" gutterBottom>
            Empty Wishlist
          </Typography>
          <Typography variant="body1" gutterBottom>
            Start shopping and Add product wishlist
          </Typography>
        </div>
      }

    </React.Fragment>
  );
}
export default Wishlist;