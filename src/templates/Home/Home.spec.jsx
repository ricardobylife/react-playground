import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Home } from '.';
import userEvent from '@testing-library/user-event';

const handlers = [
  rest.get('*jsonplaceholder.typicode.com*', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: 'title1',
          body: 'expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto',
          url: 'img1.jpg',
        },
        {
          userId: 1,
          id: 2,
          title: 'title2',
          body: 'est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae eala',
          url: 'img2.jpg',
        },
        {
          userId: 1,
          id: 3,
          title: 'title3',
          body: 'et iusto sed quo iure voluptatem occaecati omnis eligendi  porro eius odio et labore et velit aut',
          url: 'img3.jpg',
        },
      ])
    );
  }),
];
const server = setupServer(...handlers);

describe('<Home />', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.restoreHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('should search for posts', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Não existem posts');

    expect.assertions(10);

    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/type your search/i);
    expect(screen.getByRole('heading', { name: 'title1 1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title2 2' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title3 3' })).not.toBeInTheDocument();

    userEvent.type(search, 'title1');
    expect(screen.getByRole('heading', { name: 'title1 1' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title2 2' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title3 3' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Search Value: title1' })).toBeInTheDocument();

    userEvent.clear(search);
    expect(screen.getByRole('heading', { name: 'title1 1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title2 2' })).toBeInTheDocument();

    userEvent.type(search, 'blalalasdf');
    expect(screen.getByText('Não existem posts')).toBeInTheDocument();
  });

  it('should render search, posts and load more', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Não existem posts');

    expect.assertions(3);

    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/type your search/i);
    expect(search).toBeInTheDocument();

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);

    const button = screen.getByRole('button', { name: /load more posts/i });
    expect(button).toBeInTheDocument();
  });

  it('should load more posts when button is clicked', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Não existem posts');

    //expect.assertions(3);

    await waitForElementToBeRemoved(noMorePosts);

    const button = screen.getByRole('button', { name: /load more posts/i });
    userEvent.click(button);
    expect(button).toBeDisabled();
    expect(screen.getByRole('heading', { name: 'title3 3' })).toBeInTheDocument();
  });
});
