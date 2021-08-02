// DYNAMIC PAGE
// this will be in our-domain.com/example/important
// our-domain.com/example/cualquier_cosa
import { useRouter } from 'next/router'; // to get values in the url for example

const DetailPage = () => {
  const router = useRouter();
  console.log(router.query.exampleId); //cualquier_cosa in the example url

  const exampleId = router.query.exampleId;
  // We could send a request to the backend API to fetch the example item with exampleId

  return <h1>The {exampleId} Page</h1>;
};

export default DetailPage;
