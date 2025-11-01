const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const getData = async <T>(url: string): Promise<T> => {
	try {
		const res: Response = await fetch(url);
		if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);

		const data: T = await res.json();

		return data;
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
		}

		throw error;
	}
};

interface Post {
	userId: number;
	id: number;
	title: string;
	body: string;
}

getData<Post[]>(POSTS_URL)
	.then((posts) => {
		posts.forEach((post) => {
			console.log(`ID: ${post.id}, Title: ${post.title}`);
		});
	})
	.catch((error) => {
		console.error('Ошибка при загрузке постов:', error);
	});
