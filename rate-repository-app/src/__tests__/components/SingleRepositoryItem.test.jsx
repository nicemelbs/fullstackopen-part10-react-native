import { MemoryRouter } from 'react-router-native';
import SingleRepositoryItem from '../../components/SingleRepositoryItem';
import { GET_REPOSITORY_BY_ID } from '../../graphql/queries';
import { MockedProvider } from '@apollo/client/testing/react';
import { assertRepositoryItem } from '../../utils/tests/helper';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react-native';
import { Routes, Route } from 'react-router-native';
import { Linking } from 'react-native';
import { format } from 'date-fns';

describe('SingleRepositoryItem', () => {
  const mockQuery = [
    {
      request: {
        query: GET_REPOSITORY_BY_ID,
        variables: {
          id: 'jaredpalmer.formik',
        },
      },
      result: {
        data: {
          repository: {
            __typename: 'Repository',
            id: 'jaredpalmer.formik',
            fullName: 'jaredpalmer/formik',
            description: 'Build forms in React, without the tears 😭 ',
            language: 'TypeScript',
            forksCount: 2794,
            stargazersCount: 34342,
            ratingAverage: 90,
            reviewCount: 5,
            ownerAvatarUrl:
              'https://avatars.githubusercontent.com/u/4060187?v=4',
            url: 'https://github.com/jaredpalmer/formik',
            reviews: {
              __typename: 'ReviewConnection',
              edges: [
                {
                  __typename: 'ReviewEdge',
                  node: {
                    __typename: 'Review',
                    id: '753f3e99-e73a-43a3-9a50-b30d7727c0eb.jaredpalmer.formik',
                    rating: 96,
                    text: 'Lorem ipsum dolor sit amet, per brute apeirian ei. Malis facilisis vel ex, ex vivendo signiferumque nam, nam ad natum electram constituto. Causae latine at sea, ex nec ullum ceteros, est ut dicant splendide. Omnis electram ullamcorper est ut.',
                    createdAt: '2025-11-22T23:55:47.665Z',
                    user: {
                      __typename: 'User',
                      username: 'leeroyjenkins',
                      id: '753f3e99-e73a-43a3-9a50-b30d7727c0eb',
                    },
                  },
                },
                {
                  __typename: 'ReviewEdge',
                  node: {
                    __typename: 'Review',
                    id: '9b9d927e-2ee9-4f93-b96b-c8f677c63a5f.jaredpalmer.formik',
                    rating: 89,
                    text: 'Lorem ipsum dolor sit amet, per brute apeirian ei. Malis facilisis vel ex, ex vivendo signiferumque nam, nam ad natum electram constituto. Causae latine at sea, ex nec ullum ceteros, est ut dicant splendide. Omnis electram ullamcorper est ut.',
                    createdAt: '2025-11-23T00:55:47.665Z',
                    user: {
                      __typename: 'User',
                      username: 'johndoe',
                      id: '9b9d927e-2ee9-4f93-b96b-c8f677c63a5f',
                    },
                  },
                },
                {
                  __typename: 'ReviewEdge',
                  node: {
                    __typename: 'Review',
                    id: 'cff8872a-8ff5-4092-ac2f-d79e65f18aa2.jaredpalmer.formik',
                    rating: 100,
                    text: 'Lorem ipsum dolor sit amet, per brute apeirian ei. Malis facilisis vel ex, ex vivendo signiferumque nam, nam ad natum electram constituto. Causae latine at sea, ex nec ullum ceteros, est ut dicant splendide. Omnis electram ullamcorper est ut.',
                    createdAt: '2025-11-23T01:55:47.665Z',
                    user: {
                      __typename: 'User',
                      username: 'elina',
                      id: 'cff8872a-8ff5-4092-ac2f-d79e65f18aa2',
                    },
                  },
                },
                {
                  __typename: 'ReviewEdge',
                  node: {
                    __typename: 'Review',
                    id: '1b10e4d8-57ee-4d00-8886-e4a049d7ff8f.jaredpalmer.formik',
                    rating: 70,
                    text: 'Lorem ipsum dolor sit amet, per brute apeirian ei. Malis facilisis vel ex, ex vivendo signiferumque nam, nam ad natum electram constituto. Causae latine at sea, ex nec ullum ceteros, est ut dicant splendide. Omnis electram ullamcorper est ut.',
                    createdAt: '2025-11-23T02:55:47.665Z',
                    user: {
                      __typename: 'User',
                      username: 'matti',
                      id: '1b10e4d8-57ee-4d00-8886-e4a049d7ff8f',
                    },
                  },
                },
                {
                  __typename: 'ReviewEdge',
                  node: {
                    __typename: 'Review',
                    id: 'bbe42984-051b-4a01-b45d-b8d29c32200c.jaredpalmer.formik',
                    rating: 95,
                    text: 'Lorem ipsum dolor sit amet, per brute apeirian ei. Malis facilisis vel ex, ex vivendo signiferumque nam, nam ad natum electram constituto. Causae latine at sea, ex nec ullum ceteros, est ut dicant splendide. Omnis electram ullamcorper est ut.',
                    createdAt: '2025-11-23T03:55:47.665Z',
                    user: {
                      __typename: 'User',
                      username: 'kalle',
                      id: 'bbe42984-051b-4a01-b45d-b8d29c32200c',
                    },
                  },
                },
              ],
            },
          },
        },
      },
    },
  ];

  beforeEach(async () => {
    render(
      <MockedProvider mocks={mockQuery} addTypename={false}>
        <MemoryRouter initialEntries={['/jaredpalmer.formik']}>
          <Routes>
            <Route path="/:id" element={<SingleRepositoryItem />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>
    );
  });

  it('renders the appropriate single repo', async () => {
    const repositoryItems = await screen.findAllByTestId('repositoryItem');
    expect(repositoryItems).toHaveLength(1);
    const repositoryItem = repositoryItems[0];

    assertRepositoryItem(repositoryItem, mockQuery[0].result.data.repository);
  });

  it('goes to the correct URL when pressing the button', async () => {
    jest.spyOn(Linking, 'openURL').mockImplementation(() => Promise.resolve());
    await waitFor(() => {
      fireEvent.press(screen.getByText('Open in GitHub'));
    });
    expect(Linking.openURL).toHaveBeenCalledWith(
      'https://github.com/jaredpalmer/formik'
    );
  });

  it('renders the reviews', async () => {
    const mockReviews = mockQuery[0].result.data.repository.reviews.edges.map(
      (e) => e.node
    );

    const usernames = mockReviews.map((r) => r.user.username);
    const ratings = mockReviews.map((r) => r.rating);
    const texts = mockReviews.map((r) => r.text);
    const date = mockReviews.map((r) => r.createdAt);

    const reviewItems = await screen.findAllByTestId('reviewItem');

    expect(reviewItems.length).toBe(mockReviews.length);
    reviewItems.forEach((item, i) => {
      expect(within(item).getByText(usernames[i])).toBeTruthy();
      expect(within(item).getByText(String(ratings[i]))).toBeTruthy();
      expect(
        within(item).getByText(format(date[i], 'dd.MM.yyyy'))
      ).toBeTruthy();

      //long rating.text may be truncated
      expect(
        within(item).getByText(texts[i].slice(0, 10), { exact: false })
      ).toBeTruthy();
    });
  });
});
