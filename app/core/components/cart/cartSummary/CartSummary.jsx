import { Link, Routes, useSession } from "blitz"

import cartSummaryContainerStyles from "./styles";

import Button from 'app/core/components/shared/Button'
import Typography from 'app/core/components/shared/Typography'
import Form from "app/core/components/form";
import CartItems from '../cartItems'

const CartSummary = (props) => {
  const classes = cartSummaryContainerStyles();
  const session = useSession();
  const cartItems = session?.cart?.pendingCartItems;
  const total = session?.cart?.total || 0;
  const { buttonText } = props;

  return (
    <div className={classes.root}>
      <Form
      >
        {buttonText && (
          <Typography variant="h5">Your Reservation</Typography>
        )}

        {cartItems?.length > 0 && (
          <div className={classes.content}>
            <CartItems selectedCartItems={cartItems} />
            <Typography variant="h5" className={classes.total}>Total: ${total}</Typography>
            {buttonText && (
              <Link href={Routes.Checkout({ cid: 1 })}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  {buttonText}
                </Button>
              </Link>
            )}
          </div>
        )}
      </Form>
    </div>
  );
};

export default CartSummary;
