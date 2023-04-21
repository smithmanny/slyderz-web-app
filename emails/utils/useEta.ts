import * as ETA from 'eta'

ETA.configure({
  tags: ['{{', '}}'],
  views: ['emails/transactional/views', 'emails/shared'],
  root: '/emails'
});

export default ETA;