import Link from "next/link";
import { Facebook, Twitter, Instagram } from "mdi-material-ui";

import Container from "app/components/shared/Container";
import Divider from "app/components/shared/Divider";
import Grid from "app/components/shared/Grid";
import Typography from "app/components/shared/Typography";
import Box from "app/components/shared/Box";
import Stack from "app/components/shared/Stack";

const FooterLinks = (props) => {
  const aboutLinks = [
    {
      name: "About",
      route: "/about"
    },
    {
      name: "Contact",
      route: "/contact"
    },
    {
      name: "Blog",
      route: "/blog"
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
      route: "/"
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
    <Box
      sx={{
        backgroundColor: "primary.dark",
        marginTop: 4,
        py: 6,
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          sx={{
            flexDirection: "row",
            justifyContent: "center"
          }}
          spacing={2}
        >
          <Grid item xs={12} textAlign='center'>
            <Grid container item xs={12}>
              <Grid item xs={12} md={3}>
                <Typography variant="h6" sx={{ color: '#FFF', fontWeight: "bold" }}>Company</Typography>
                <FooterLinks section="company" />
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="h6" sx={{ color: '#FFF', fontWeight: "bold" }}>Chefs</Typography>
                <FooterLinks section="chefs" />
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="h6" sx={{ color: '#FFF', fontWeight: "bold" }}>Support</Typography>
                <FooterLinks section="support" />
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="h6" sx={{ color: '#FFF', fontWeight: "bold" }}>Cities</Typography>
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
    </Box>
  );
};

export default Footer;