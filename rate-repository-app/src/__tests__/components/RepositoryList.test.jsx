import { MockedProvider } from '@apollo/client/testing/react';

import {
  assertRepositoryItem,
  mockRepositoryEdges,
} from '../../utils/tests/helper';

import { render, screen } from '@testing-library/react-native';
import RepositoryList from '../../components/RepositoryList';

import { GET_REPOSITORIES } from '../../graphql/queries';
import { MemoryRouter } from 'react-router-native';

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
              edges: mockRepositoryEdges,
            },
          },
        },
      },
    ];
    render(
      <MockedProvider mocks={mocks}>
        <MemoryRouter>
          <RepositoryList />
        </MemoryRouter>
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
