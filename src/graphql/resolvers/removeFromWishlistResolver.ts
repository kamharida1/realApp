import { ApolloCache } from 'apollo-cache';

import { GetWishlist } from '../../generated/client/GetWishlist';
import { RemoveFromWishlistVariables } from '../../generated/client/RemoveFromWishlist';
import { LocalCache } from '../../types/types';
import { GET_WISHLIST } from '../client/clientQueries';

function removeFromWishlistResolver(
  _: object,
  args: RemoveFromWishlistVariables,
  { cache }: { cache: ApolloCache<LocalCache> },
) {
  let { productHandle } = args;

  let wishlistData = cache.readQuery<GetWishlist>({
    query: GET_WISHLIST,
  });

  let newWishlist = wishlistData
    ? wishlistData.wishlist.filter((item) => item.handle !== productHandle)
    : [];

  cache.writeData({
    data: {
      wishlist: newWishlist,
    },
  });

  return null;
}

export { removeFromWishlistResolver };
