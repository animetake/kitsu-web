import React from 'react';
import {
  createClient,
  Provider,
  dedupExchange,
  cacheExchange,
  fetchExchange,
} from 'urql';
import { devtoolsExchange } from '@urql/devtools';

import authExchange from 'app/graphql/urql-exchanges/auth';
import scalarsExchange from 'app/graphql/urql-exchanges/scalars';
import { useSession } from 'app/contexts/SessionContext';
import { useLocale } from 'app/contexts/IntlContext';
import { apiHost } from 'app/constants/config';
import buildAcceptLanguage from 'app/utils/buildAcceptLanguage';

const UrqlContext: React.FC = function ({ children }): JSX.Element {
  const session = useSession();
  const { locale } = useLocale();

  const client = createClient({
    suspense: true,
    exchanges: [
      dedupExchange,
      scalarsExchange,
      cacheExchange,
      authExchange(session),
      fetchExchange,
      devtoolsExchange,
    ],
    url: `${apiHost}api/graphql`,
    fetchOptions: {
      headers: { 'Accept-Language': buildAcceptLanguage(locale) },
    },
  });

  return <Provider value={client}>{children}</Provider>;
};
export default UrqlContext;