import { Link, Routes, useSession } from "blitz"

import { styled } from "integrations/material-ui";

import Button from 'app/core/components/shared/Button'
import Typography from 'app/core/components/shared/Typography'
import Form from "app/core/components/form";
import CartItems from '../cartItems'

const Root = styled('div')({
  padding: 2
});

const Content = styled('div')({
  width: "100%"
});

const CartSummary = (props) => {
  const session = useSession();
  const cartItems = session?.cart?.pendingCartItems;
  const total = session?.cart?.total || 0;
  const { buttonText } = props;

  return (
    <Root>
      <Form
      >
        {buttonText && (
          <Typography variant="h5">Your Reservation</Typography>
        )}

        {cartItems?.length > 0 && (
          <Content>
            <CartItems selectedCartItems={cartItems} />
            <Typography variant="h5" sx={{ my: 4 }}>Total: ${total}</Typography>
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
          </Content>
        )}
      </Form>
    </Root>
  );
};

export default CartSummary;
