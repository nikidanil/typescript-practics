import { posts } from './data';

interface Post {
	id: string;
	title: string;
	body: string;
}

interface NormalizedData {
	byId: {
		[id: string]: Post;
	};
	allIds: Post['id'][];
}

const normalizeData = (unnormalizedData: Post[]): NormalizedData => {
	const result: NormalizedData = {
		byId: {},
		allIds: [],
	};

	unnormalizedData.forEach((post) => {
		result.byId[post.id] = post;
		result.allIds.push(post.id);
	});

	return result;
};

console.log(normalizeData(posts));
/**
 * {
 *    byId: {
 *      62e69d5a5458aac0ed320b35: { id: '...', title: '...', body: '...' },
 *      62e69d5a5458aac0ed320b1c: { id: '...', title: '...', body: '...' },
 *      ...
 *    },
 *    allIds: ['62e69d5a5458aac0ed320b35', '62e69d5a5458aac0ed320b1c', ...]
 * }
 */
