import { createElement } from 'react';
import { RouteObject, redirect } from 'react-router-dom';
import { articleQueries } from '~entities/article';
import { profileQueries } from '~entities/profile';
import { sessionQueries } from '~entities/session';
import { invalidDataError } from '~shared/lib/fetch';
import { pathKeys, routerContracts } from '~shared/lib/react-router';
import { zodContract } from '~shared/lib/zod';
import {
  articleFilterStore,
  onAuthorArticles,
  onAuthorFavoritedArticles,
} from './profile-page.model';
import { ProfilePage } from './profile-page.ui';

export const profilePageRoute: RouteObject = {
  path: 'profile',
  children: [
    {
      index: true,
      loader: async () => redirect(pathKeys.page404()),
    },
    {
      path: ':username',
      element: createElement(ProfilePage),
      loader: async (args) => {
        const contract = zodContract(routerContracts.UsernamePageParamsSchema);

        if (!contract.isData(args.params)) {
          throw invalidDataError({
            validationErrors: contract.getErrorMessages(args.params),
            response: {},
          });
        }

        onAuthorArticles(args.params.username);

        Promise.all([
          sessionQueries.userService.prefetchQuery(),
          profileQueries.profileService.prefetchQuery(args.params.username),
          articleQueries.infinityArticlesService.prefetchQuery(
            articleFilterStore,
          ),
        ]);

        return args;
      },
    },
    {
      path: ':username/favorites',
      element: createElement(ProfilePage),
      loader: async (args) => {
        const contract = zodContract(routerContracts.UsernamePageParamsSchema);

        if (!contract.isData(args.params)) {
          throw invalidDataError({
            validationErrors: contract.getErrorMessages(args.params),
            response: {},
          });
        }

        onAuthorFavoritedArticles(args.params.username);

        Promise.all([
          sessionQueries.userService.prefetchQuery(),
          profileQueries.profileService.prefetchQuery(args.params.username),
          articleQueries.infinityArticlesService.prefetchQuery(
            articleFilterStore,
          ),
        ]);

        return args;
      },
    },
  ],
};
