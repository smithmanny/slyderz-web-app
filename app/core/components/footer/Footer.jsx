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
import Box from "app/core/components/shared/Box";
import Stack from "app/core/components/shared/Stack";
import Form, { TextField }  from "app/core/components/form";

const FooterDiv = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  marginTop: theme.spacing(4),
  padding: theme.spacing(6, 0),
}))

const FooterLinks = (props) => {
  const aboutLinks = [
    {
      name: "About",
      route: "/about"
    },
    {
      name: "Contact",
      route: "/about"
    },
    {
      name: "Blog",
      route: "/about"
    },
    {
      name: "Terms",
      route: "/terms"
    },
    {
      name: "Privacy Policy",
      route: "/privacy-policy"
    }
  ]
  const chefLinks = [
    {
      name: 'Join Slyderz',
      route: "/host"
    }
  ]
  const supportLinks = [
    {
      name: 'Consumer Help',
      route: "/become-a-chef"
    }
  ]
  const citiesLinks = [
    {
      name: 'Atlanta',
      route: '/'
    }
  ]

  let links
  switch(props.section) {
    case 'company':
      links = aboutLinks
      break;
    case 'chefs':
      links = chefLinks
      break;
    case 'support':
      links = supportLinks
      break;
    case 'cities':
      links = citiesLinks
      break;
    default:
      links = [{ name: '', route: ''}]
  }

  return (
    <Stack spacing={2}>
      {links.map((link, index) => (
        <Box key={`${link.name}-${index}`}>
          <Link href={link.route}>
            <Typography variant="body1">
              {link.name}
            </Typography>
          </Link>
        </Box>
      ))}
    </Stack>
  )
}

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
                  >
                    Subscribe
                  </Button>
                </Grid>
              </Form>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} textAlign='center'>
            <Grid container item xs={12}>
              <Grid item xs={12} md={3}>
                <Typography variant="h6" sx={{ color: '#FFF' }}>Company</Typography>
                <FooterLinks section="company" />
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="h6" sx={{ color: '#FFF' }}>Chefs</Typography>
                <FooterLinks section="chefs" />
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="h6" sx={{ color: '#FFF' }}>Support</Typography>
                <FooterLinks section="support" />
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="h6" sx={{ color: '#FFF' }}>Cities</Typography>
                <FooterLinks section="cities" />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }} />
          </Grid>
          <Grid item xs={12}>
            <Grid container item xs={12} spacing={2} textAlign={{ xs: 'center', md: 'left' }}>
              <Grid item xs={12} md>
                <Typography variant="h6" sx={{ color: '#FFF', fontWeight: 'bold' }}>&#169; 2023 Slyderz LLC</Typography>
              </Grid>

              <Grid item xs={12} md>
                <Stack direction="row" spacing={2} justifyContent={{ xs: "center", md: 'flex-end' }}>
                  <Box>
                    <Link href="https://www.facebook.com/slyderz">
                      <Facebook />
                    </Link>
                  </Box>
                  <Box>
                    <Link href="https://twitter.com/SlyderzApp">
                      <Twitter />
                    </Link>
                  </Box>
                  <Box>
                    <Link href="https://www.instagram.com/slyderz_app/">
                      <Instagram />
                    </Link>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </FooterDiv>
  );
};

export default Footer;