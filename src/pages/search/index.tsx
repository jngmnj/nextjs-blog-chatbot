// import SearchPage from '@/components/SearchPage';
import dynamic from 'next/dynamic';

const SearchPage = dynamic(() => import('@/components/SearchPage'), {
  ssr: false,
});

const Search = () => {
  return <SearchPage />;
};

export default Search;
