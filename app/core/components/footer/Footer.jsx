import Link from "next/link";
import InputAdornment from "@mui/material/InputAdornment";
import { EmailOutline, Facebook, Twitter, Instagram } from "mdi-material-ui";

import { styled } from "integrations/material-ui";

import Container from "app/core/components/shared/Container";
import Divider from "app/core/components/shared/Divider";
import Grid from "app/core/components/shared/Grid";
import Paper from "app/core/components/shared/Paper";
import Typography from "app/core/components/shared/Typography";
import Button from "app/core/components/shared/Button";
import Form, { TextField }  from "app/core/components/form";

const FooterDiv = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  marginTop: theme.spacing(4),
  padding: theme.spacing(6, 0),
}))

const Signup = styled('span')(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    flexDirection: 'row'
  },
  display: "flex",
  flexDirection: 'column'
}))

const SocialContainer = styled('div')(({ theme }) => ({
  "& span": {
      marginLeft: "auto",
    },
    "& h6": {
      fontSize: "16px",
    },
    alignItems: "center",
    display: "flex",
    color: "white",
    marginTop: theme.spacing(2),
}))

const SocialList = styled('ul')(({ theme }) => ({
  "& a": {
    color: "rgba(255, 255, 255, 0.2)",
  },
  "& a:hover": {
    color: "rgba(255, 255, 255, 0.7)",
    cursor: "pointer",
  },
  "& li": {
    "& svg": {
      fontSize: "32px",
    },
    marginRight: theme.spacing(3),
  },
  display: "flex",
  listStyle: "none",
}))

const Table = styled('table')(({ theme }) => ({
  "& a:hover": {
      cursor: "pointer",
      textDecoration: "underline",
    },
    "& th": {
      textTransform: "uppercase",
      "& h6": {
        fontSize: "14px",
      },
    },
    "& tr": {
      display: "flex",
      fontWeight: 500,
      marginBottom: theme.spacing(2),
      justifyContent: "space-between",
    },
    color: "white",
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(4),
    width: "100%",
}))

const Footer = () => {
  return (
    <FooterDiv>
      <Container maxWidth="xl">
        <Grid
          container
          sx={{
            flexDirection: {
              xs: 'row',
              md: 'row-reverse',
            }
          }}
          spacing={2}
        >
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                ml: {
                  md: 'auto'
                },
                maxWidth: "500px",
                padding: 3,
              }}
            >
              <Typography sx={{ mb: 3 }} color="primary" variant="h6">
                We’re cooking up something delicious.
                <br />
                Sign up to find out more.
              </Typography>
              <Form
                onSubmit={{}}
                // mutate={{
                //   onSubmit: (variables) => {
                //     fetch("/api/sendgrid", {
                //       method: "POST",
                //       body: variables.email,
                //     });
                //   },
                //   toVariables: (values) => ({
                //     ...values,
                //   }),
                // }}
              >
                <TextField
                  name="email"
                  variant="outlined"
                  label="Email"
                  placeholder="Email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutline />
                      </InputAdornment>
                    ),
                  }}
                  xs={12}
                  md={7}
                />

                <Grid item xs={12} md={5} textAlign="right">
                  <Button
                    color="primary"
                    sx={{
                      padding: 2,
                      width: {
                        xs: '100%'
                      }
                    }}
                    variant="contained"
                    buttonType="submit"
                  >
                    Find a Chef
                  </Button>
                </Grid>
              </Form>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Table>
              <tbody>
                <tr>
                  <th>
                    <Typography variant="h6">Company</Typography>
                  </th>
                  <th>
                    <Typography variant="h6">Chefs</Typography>
                  </th>
                  <th>
                    <Typography variant="h6">Support</Typography>
                  </th>
                  <th>
                    <Typography variant="h6">Cities</Typography>
                  </th>
                </tr>
                <tr>
                  <td>
                    <Link href="/about">
                      <Typography variant="body1" component="a">
                        About
                      </Typography>
                    </Link>
                  </td>
                  <td>
                    <Link href="/become-a-chef">
                      <Typography variant="body1" component="a">
                        Join Slyderz
                      </Typography>
                    </Link>
                  </td>
                  <td>
                    <Typography variant="body1">Consumer Help</Typography>
                  </td>
                  <td>
                    <Typography variant="body1">Atlanta</Typography>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link href="/contact">
                      <Typography variant="body1" component="a">
                        Contact
                      </Typography>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Typography variant="body1">Blog</Typography>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link href="/terms-and-conditions">
                      <Typography variant="body1" component="a">
                        Terms
                      </Typography>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Typography variant="body1">Privacy</Typography>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }} />
          </Grid>
          <Grid item xs={12}>
            <SocialContainer>
              <Typography variant="h6">&#169; 2020 Slyderz LLC</Typography>
              <span>
                <SocialList>
                  <li>
                    <a href="https://www.facebook.com/slyderz" target="__blank">
                      <Facebook />
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com/SlyderzApp" target="__blank">
                      <Twitter />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/slyderz_app/"
                      target="__blank"
                    >
                      <Instagram />
                    </a>
                  </li>
                </SocialList>
              </span>
            </SocialContainer>
          </Grid>
        </Grid>
      </Container>
    </FooterDiv>
  );
};

export default Footer;
