import React, { useEffect, useState } from 'react'

import ConsumerContainer from '../src/components/shared/consumerContainer'

const BecomeAChef = () => {
  const [isAirtableLoaded, setAirtableStatus] = useState(false);
  useEffect(() => {
    const src = 'https://static.airtable.com/js/embed/embed_snippet_v1.js';
    const element = document.createElement('script');
    element.src = src;
    document.body.appendChild(element);

    setAirtableStatus(true);
  });
  return (
    <ConsumerContainer>
      {isAirtableLoaded && (
        <div
          dangerouslySetInnerHTML={{
            __html:
              '<iframe class="airtable-embed airtable-dynamic-height" src="https://airtable.com/embed/shrYFii6uWxuV0iGI?backgroundColor=orange" frameborder="0" onmousewheel="" width="100%" height="3093" style="background: transparent; border: 1px solid #ccc;"></iframe>'
          }}
        />
      )}
    </ConsumerContainer>
  )
}
export default BecomeAChef