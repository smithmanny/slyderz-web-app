import { BlitzPage } from "@blitzjs/next";
import { useEffect, useState } from "react";

import Layout from "app/core/layouts/Layout";
import ConsumerContainer from "app/core/components/shared/ConsumerContainer";

const BecomeAChef: BlitzPage = () => {
  const [isAirtableLoaded, setAirtableStatus] = useState(false);
  useEffect(() => {
    const src = "https://static.airtable.com/js/embed/embed_snippet_v1.js";
    const element = document.createElement("script");
    element.src = src;
    document.body.appendChild(element);

    setAirtableStatus(true);
  }, []);
  return (
    <ConsumerContainer>
      {isAirtableLoaded && (
        <div
          dangerouslySetInnerHTML={{
            __html:
              '<iframe class="airtable-embed airtable-dynamic-height" src="https://airtable.com/embed/shrYFii6uWxuV0iGI?backgroundColor=orange" frameborder="0" onmousewheel="" width="100%" height="3093" style="background: transparent; border: 1px solid #ccc;"></iframe>',
          }}
        />
      )}
    </ConsumerContainer>
  );
};

BecomeAChef.getLayout = (page) => <Layout>{page}</Layout>;

export default BecomeAChef;
