import Image from 'next/image'
import PropTypes from 'prop-types'

import Box from "app/core/components/shared/Box"
import Stack from "app/core/components/shared/Stack"
import Grid from "app/core/components/shared/Grid"
import Typography from "app/core/components/shared/Typography"

interface AboutSectionProps {
  description: string
  direction: string
  title: string
  type: string
}

const AboutSection = (props: AboutSectionProps) => {
  const { description, direction, title, type } = props;

  const mainSection = () => (
    <Grid item xs={12} md={6}>
      <Box>
        <Typography variant='h4' sx={{ mb: 2, fontWeight: 'bold' }}>{title}</Typography>
        <Typography>
          {description}
        </Typography>
      </Box>
    </Grid>
  )
  const secondarySection = () => (
    <Grid item xs={12} md={6}>
      {type === 'our-story' ? (
        <Stack spacing={4} sx={{ margin: 'auto' }}>
          <Box>
            <Typography fontWeight="bold">01. Enjoy gourmet meals in the comfort of your own home</Typography>
            <Box sx={{ ml: 4 }}>
              <Typography>Say goodbye to crowded restaurants and enjoy a personalized dining experience that&apos;s tailored to your preferences and needs.</Typography>
            </Box>
          </Box>
          <Box>
            <Typography fontWeight="bold">02. Discover new chefs and cuisines</Typography>
            <Box sx={{ ml: 4 }}>
              <Typography>Slyderz offers a variety of local chefs with diverse culinary backgrounds and specialties.</Typography>
            </Box>
          </Box>
          <Box>
            <Typography fontWeight="bold">03. Convenient and hassle-free booking</Typography>
            <Box sx={{ ml: 4 }}>
              <Typography>With our convenient booking and payment system, you can relax and enjoy your meal without any hassle. Whether you&apos;re planning a dinner party or a romantic evening, Slyderz takes care of everything so you can sit back and savor the moment.</Typography>
            </Box>
          </Box>
        </Stack>
      ) : (
        <Box
          sx={{
            position: 'relative',
            width: { sm: '100%', md: '75%' },
            height: 400,
            backgroundColor: '#f3f7f5',
            borderRadius: '10pt',
            margin: direction === 'row' ? 'auto' : null
          }}>
          {/* <Image
            src='/our-vision-min.jpeg'
            alt="About Us"
            layout='fill'
            objectFit='inherit'
            // objectPosition='50% 50%'
            sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw"
          /> */}
        </Box>
      )}
    </Grid>
  )

  const content = direction === 'row' ? (
    <>
      {mainSection()}
      {secondarySection()}
    </>
  ) : (
    <>
      {secondarySection()}
      {mainSection()}
    </>
  )

  return (
    <Grid container item xs={12} spacing={2} sx={{ mb: { xs: 4, md: 8 } }}>
      {content}
    </Grid>
  )
}

AboutSection.defaultProps = {
  description: '',
  direction: 'row',
  title: '',
  type: ''
}

AboutSection.propTypes = {
  description: PropTypes.string,
  direction: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string
}

export default AboutSection