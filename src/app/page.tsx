

import Navbar from "../../componenets/nvabar";
import RecipesLoader from "../../componenets/recipesLoader";
import Search from "../../componenets/search";

export default function Home() {
  return (
    <div>
      <Navbar />
        <Search />
      <RecipesLoader />
    </div>
  );
}
