import React from "react";
import { BLOCKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Typography from "app/core/components/shared/Typography";

const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <Typography
        className={paragraphClass(node)}
        style={{ paddingBottom: 15 }}
      >
        {children}
      </Typography>
    ),
  },
};

function paragraphClass(node) {
  const className = "odd";
  //alternate logic for 'odd' | 'even'
  return className;
}

type ContentfulProps = {
  document: any;
};
function ContentfulView(props: ContentfulProps) {
  const { document } = props;
  return documentToReactComponents(document, options);
}

export default ContentfulView;
