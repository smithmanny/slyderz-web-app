import {
	NodeRenderer,
	documentToReactComponents,
} from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";

import { cn } from "app/lib/utils";

export type BlogPost = {
	id: string;
	title: string;
	document: any;
	createdAt: string;
	slug: string;
};

const options = {
	renderNode: {
		[BLOCKS.PARAGRAPH]: (node: any, children: any) => (
			<div className={cn(paragraphClass(node), "py-2")}>{children}</div>
		),
	},
};

function paragraphClass(node: any) {
	const className = "odd";
	//alternate logic for 'odd' | 'even'
	return className;
}

interface ContentfulProps {
	document: any;
}
export function ContentfulView(props: ContentfulProps) {
	const { document } = props;
	return <article>{documentToReactComponents(document, options)}</article>;
}
