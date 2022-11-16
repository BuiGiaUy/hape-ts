import { useRouter } from "next/router";
import React from "react";
import { BiSearch } from "react-icons/bi";
import s from "./SearchInput.module.css";

const SearchInput: React.FC = () => {
  const router = useRouter();
  const { k } = router.query;
  const [keyword, setKeyword] = React.useState<string>();
  const handleSearchChange = (e: any) => {
    setKeyword(e.target.value);
  };
  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      gotoSearchPage();
    }
  };
  const gotoSearchPage = () => {
    router.push("/search?keyword=" + keyword);
  };
  return (
    <div className={s.searchInputBox}>
      <div className="flex m-2">
        <div className="flex-grow">
          <input
            type="text"
            placeholder="tìm sản phẩm"
            className={s.searchInput}
            value={keyword? keyword : k}
            onKeyDown={handleKeyPress}
            onChange={(e) => handleSearchChange(e)}
          />
        </div>
        <div className="flex-none w-10 ">
          <button type="button" onClick={gotoSearchPage}>
            <BiSearch />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
