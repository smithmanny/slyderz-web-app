import Image from 'next/image'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box';

import Grid from "app/core/components/shared/Grid"
import Typography from "app/core/components/shared/Typography"

interface AboutSectionProps {
  description: string
  direction: string
  title: string
}

const AboutSection = (props: AboutSectionProps) => {
  const { description, direction, title } = props;

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
  title: ''
}

AboutSection.propTypes = {
  description: PropTypes.string,
  direction: PropTypes.string,
  title: PropTypes.string
}

export default AboutSection
