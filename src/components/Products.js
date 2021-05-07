import React, { useState, useEffect } from 'react';

//metrial
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Box from '@material-ui/core/Box';

//icon
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

//
import { useAddProductWishlist,useAddProductCart} from '../Recoil/Hooks';


function Products() {

  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);


  const addProductWishlist = useAddProductWishlist();

  const addProductCart = useAddProductCart();

  


  const allProductEndpoint = 'https://fakestoreapi.com/products';

  useEffect(() => {
    getProducts(allProductEndpoint);
  }, [])

  const getProducts = (endpoint) => {
    fetch(endpoint,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        setProducts(responseJson);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });

  }

  const handleChange = async (event) => {

    await setCategory(event.target.value);
    if (event.target.value !== 'all')
      getProducts('https://fakestoreapi.com/products/category/' + event.target.value);
    else
      getProducts(allProductEndpoint);
  };

  return (
    <React.Fragment>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <FormControl variant="outlined" style={{ minWidth: 450 }}>
          <InputLabel htmlFor="outlined-age-native-simple">Category</InputLabel>
          <Select
            native
            value={category}
            onChange={handleChange}
            label="Category"
            inputProps={{
              name: 'category',
              id: 'outlined-age-native-simple',
            }}
          >
            <option value='all'>All</option>
            <option value='electronics'>Electronics</option>
            <option value='jewelery'>Jewelery</option>
            <option value='men clothing'>Men clothing</option>
            <option value='women clothing'>Women clothing</option>
          </Select>
        </FormControl>
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          margin: 10,
        }}>
        {(loading ? Array.from(new Array(3)) : products).map((item, index) => (
          <div>
            {
              item ? (
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
                      variant="contained"
                      color="primary"
                      endIcon={<AddShoppingCartIcon />}
                      onClick={() => addProductCart(item)}
                    >
                      Add to cart
                    </Button>

                    <Button
                      variant="outlined"
                      color="primary"
                      endIcon={<FavoriteBorderIcon />}
                      onClick={() => addProductWishlist(item)}
                    >
                      wishlist
                    </Button>

                  </CardActions>
                </Card>
              ) : (
                <Box style={{ margin: 20 }}>
                  <Skeleton variant="rect" width={345} height={250} />
                  <Box pt={0.5}>
                    <Skeleton />
                    <Skeleton width="60%" />
                  </Box>
                </Box>
              )}
          </div>
        ))}
      </div>

    </React.Fragment>
  );
}



export default Products;