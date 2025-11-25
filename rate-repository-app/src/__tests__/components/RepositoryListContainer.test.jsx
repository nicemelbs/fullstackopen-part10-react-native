import RepositoryListContainer from '../../components/RepositoryListContainer';
import { MockedProvider } from '@apollo/client/testing/react';
import { GET_REPOSITORIES } from '../../graphql/queries';

import {
  render,
  within,
  screen,
  waitFor,
  debug,
} from '@testing-library/react-native';
import RepositoryList from '../../components/RepositoryList';
import { shorten } from '../../utils/shorten';

describe('RepositoryListContainer', () => {
  it('renders name, description, language, forks count, stargazers count, rating average and review count correctly', async () => {
    const mocks = [
      {
        request: {
          query: GET_REPOSITORIES,
        },
        result: {
          data: {
            repositories: {
              totalCount: 8,
              pageInfo: {
                hasNextPage: true,
                endCursor:
                  'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
                startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
              },
              __typename: 'RepositoryConnection',
              edges: [
                {
                  __typename: 'RepositoryEdge',
                  node: {
                    __typename: 'Repository',
                    id: 'jaredpalmer.formik',
                    fullName: 'jaredpalmer/formik',
                    description: 'Build forms in React, without the tears',
                    language: 'TypeScript',
                    forksCount: 1619,
                    stargazersCount: 21856,
                    ratingAverage: 88,
                    reviewCount: 3,
                    ownerAvatarUrl:
                      'https://avatars2.githubusercontent.com/u/4060187?v=4',
                  },
                  cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
                },
                {
                  __typename: 'RepositoryEdge',
                  node: {
                    __typename: 'Repository',
                    id: 'async-library.react-async',
                    fullName: 'async-library/react-async',
                    description: 'Flexible promise-based React data loader',
                    language: 'JavaScript',
                    forksCount: 69,
                    stargazersCount: 1760,
                    ratingAverage: 72,
                    reviewCount: 3,
                    ownerAvatarUrl:
                      'https://avatars1.githubusercontent.com/u/54310907?v=4',
                  },
                  cursor:
                    'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
                },
              ],
            },
          },
        },
      },
    ];

    const escapeRegex = (str, label) => {
      if (!label) {
        const escaped = str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return new RegExp(escaped);
      }

      const formatted = shorten
        .format(str)
        .replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return new RegExp(`${formatted}\\s*${label}`);
    };

    const assertRepositoryItem = (received, expected) => {
      expect(received).toHaveTextContent(escapeRegex(expected.fullName));
      expect(received).toHaveTextContent(escapeRegex(expected.description));
      expect(received).toHaveTextContent(escapeRegex(expected.language));
      expect(received).toHaveTextContent(
        escapeRegex(expected.forksCount, 'Forks')
      );
      expect(received).toHaveTextContent(
        escapeRegex(expected.stargazersCount, 'Stars')
      );
      expect(received).toHaveTextContent(
        escapeRegex(expected.ratingAverage, 'Rating')
      );
      expect(received).toHaveTextContent(
        escapeRegex(expected.reviewCount, 'Reviews')
      );
    };

    render(
      <MockedProvider mocks={mocks}>
        <RepositoryList />
      </MockedProvider>
    );

    const repositoryItems = await screen.findAllByTestId('repositoryItem');
    expect(repositoryItems).toHaveLength(2);
    const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;
    assertRepositoryItem(
      firstRepositoryItem,
      mocks[0].result.data.repositories.edges[0].node
    );
    assertRepositoryItem(
      secondRepositoryItem,
      mocks[0].result.data.repositories.edges[1].node
    );
  });
});
