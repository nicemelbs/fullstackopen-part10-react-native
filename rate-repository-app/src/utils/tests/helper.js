import { shorten } from '../shorten';

const escapeRegex = (str, label) => {
  if (!label) {
    const escaped = str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(escaped);
  }

  const formatted = shorten.format(str).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`${formatted}\\s*${label}`);
};

export const assertRepositoryItem = (received, expected) => {
  expect(received).toHaveTextContent(escapeRegex(expected.fullName));
  expect(received).toHaveTextContent(escapeRegex(expected.description));
  expect(received).toHaveTextContent(escapeRegex(expected.language));
  expect(received).toHaveTextContent(escapeRegex(expected.forksCount, 'Forks'));
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

export const mockRepositoryEdges = [
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
      ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
      url: 'https://github.com/jaredpalmer/formik',
      reviews: {
        edges: [
          {
            node: {
              text: 'Lorem ipsum dolor sit amet, per brute apeirian ei. Malis facilisis vel ex, ex vivendo signiferumque nam, nam ad natum electram constituto. Causae latine at sea, ex nec ullum ceteros, est ut dicant splendide. Omnis electram ullamcorper est ut.',
              rating: 96,
            },
          },
          {
            node: {
              text: 'Lorem ipsum dolor sit amet, per brute apeirian ei. Malis facilisis vel ex, ex vivendo signiferumque nam, nam ad natum electram constituto. Causae latine at sea, ex nec ullum ceteros, est ut dicant splendide. Omnis electram ullamcorper est ut.',
              rating: 89,
            },
          },
          {
            node: {
              text: 'Lorem ipsum dolor sit amet, per brute apeirian ei. Malis facilisis vel ex, ex vivendo signiferumque nam, nam ad natum electram constituto. Causae latine at sea, ex nec ullum ceteros, est ut dicant splendide. Omnis electram ullamcorper est ut.',
              rating: 100,
            },
          },
          {
            node: {
              text: 'Lorem ipsum dolor sit amet, per brute apeirian ei. Malis facilisis vel ex, ex vivendo signiferumque nam, nam ad natum electram constituto. Causae latine at sea, ex nec ullum ceteros, est ut dicant splendide. Omnis electram ullamcorper est ut.',
              rating: 70,
            },
          },
          {
            node: {
              text: 'Lorem ipsum dolor sit amet, per brute apeirian ei. Malis facilisis vel ex, ex vivendo signiferumque nam, nam ad natum electram constituto. Causae latine at sea, ex nec ullum ceteros, est ut dicant splendide. Omnis electram ullamcorper est ut.',
              rating: 95,
            },
          },
        ],
      },
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
      ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/54310907?v=4',
      url: 'https://github.com/async-library/react-async',

      reviews: {
        edges: [
          {
            node: {
              text: 'Lorem ipsum dolor sit amet, per brute apeirian ei. Malis facilisis vel ex, ex vivendo signiferumque nam, nam ad natum electram constituto. Causae latine at sea, ex nec ullum ceteros, est ut dicant splendide. Omnis electram ullamcorper est ut.',
              rating: 75,
            },
          },
          {
            node: {
              text: 'Lorem ipsum dolor sit amet, per brute apeirian ei. Malis facilisis vel ex, ex vivendo signiferumque nam, nam ad natum electram constituto. Causae latine at sea, ex nec ullum ceteros, est ut dicant splendide. Omnis electram ullamcorper est ut.',
              rating: 55,
            },
          },
          {
            node: {
              text: 'Lorem ipsum dolor sit amet, per brute apeirian ei. Malis facilisis vel ex, ex vivendo signiferumque nam, nam ad natum electram constituto. Causae latine at sea, ex nec ullum ceteros, est ut dicant splendide. Omnis electram ullamcorper est ut.',
              rating: 85,
            },
          },
        ],
      },
    },
    cursor: 'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
  },
];
