export interface State {
	comments: { [id: string]: Comment[] | undefined; };
	commentsLoading: boolean;
	modhash: string;
	moreCommentsLoading: string[];
	posts: Post[];
	postsLoading: boolean;
}

export interface Comment {
	archived: boolean;
	author: string;
	author_flair_text: string | null;
	body: string;
	body_html: string;
	can_gild: boolean;
	children?: string[];
	count?: number;
	created_utc: number;
	depth: number;
	distinguished: string | null;
	edited: boolean;
	gilded: number;
	id: string;
	name: string;
	parent_id: string;
	replies: "" | {
		data: {
			children: { data: Comment }[];
		}
	};
	saved: boolean;
	score: number;
	score_hidden: boolean;
	stickied: boolean;
}

export interface Post {
	author: string;
	author_flair_text: string | null;
	created_utc: number;
	distinguished: string | null;
	id: string;
	name: string;
	permalink: string;
	score: number;
	subreddit: string;
	title: string;
}
