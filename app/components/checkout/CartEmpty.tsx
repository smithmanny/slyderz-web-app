import ConsumerContainer from "app/components/shared/ConsumerContainer";
import Typography from "app/components/shared/Typography";
import Box from "app/components/shared/Box";
import Button from "app/components/shared/Button";

const CartEmpty = () => (
  <ConsumerContainer>
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        Cart is empty
      </Typography>
      <Typography gutterBottom>Browse nearby Chefs</Typography>
      <Button label="browse chefs">Browse Chefs</Button>
    </Box>
  </ConsumerContainer>
);

export default CartEmpty;
