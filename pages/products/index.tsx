import React, { useEffect, useState, useRef } from "react"; // Import React and useState

import PagesLayout from "../layout";
import Image from "next/image";
import Product from "@/composables/Product";
import Filter from "@/composables/filter";
import products from "@/products.json";

export default function Products() {
  // Initialize the 'show' state to manage the display of the search interface
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [searched, setSearched] = useState<{}[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;
  let filteredProducts = useRef<{}[]>([]);
  let lastValue = useRef("");

  const calculateProductRange = () => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return { startIndex, endIndex };
  };

  useEffect(() => {

    

    // Use 'sessionStorage' and manage 'show' state to control the display of the search interface
    const noResult = document.querySelector(".noResult") as HTMLDivElement;

    noResult.style.display = "none";

    if (sessionStorage.getItem("Search") === "true") {
      handleSearchFocus();
    }
    if (sessionStorage.getItem("searchValue")) {
      (document.getElementById("inputToUse") as HTMLInputElement).value =
        sessionStorage.getItem("searchValue") as string;
      const value = (document.getElementById("inputToUse") as HTMLInputElement)
        .value;
      setInputValue((val: string) => (val = value));
    }

    filteredProducts.current = [];
  }, []);

  useEffect(() => {
    if (inputValue !== "") {
      sessionStorage.setItem("searchValue", inputValue);
    }
  }, [inputValue]);

  useEffect(() => {
    if (filteredProducts.current.length > 1) {
      const { startIndex, endIndex } = calculateProductRange();
      const productsToDisplay = filteredProducts.current.slice(
        startIndex,
        endIndex
      );
      setSearched(productsToDisplay);
    }
  }, [currentPage]);

  function showSearch() {
    setShow((prevState) => !prevState);
    const SearchDiv = document.querySelector(
      ".productSearch"
    ) as HTMLDivElement;
    SearchDiv.style.display = "none";
    document.body.style.overflow = show ? "scroll" : "hidden"; // Toggle body overflow
    sessionStorage.setItem("Search", show ? "false" : "true");
    sessionStorage.setItem("searchValue", inputValue);

    if ((sessionStorage.getItem("Search") as string) === "false") {
      sessionStorage.removeItem("Search");
      sessionStorage.removeItem("searchValue");
      sessionStorage.removeItem("searchedResult");
      (document.getElementById("inputToUse") as HTMLInputElement).value = "";
      setSearched([]);
      filteredProducts.current = [];
      const noResult = document.querySelector(".noResult") as HTMLDivElement;
      noResult.style.display = "none";
      setInputValue((s) => (s = ""));
    }
  }

  function handleSearchFocus() {
    const input = document.getElementById("inputToUse");
    const SeacrchDiv = document.querySelector(
      ".productSearch"
    ) as HTMLDivElement;
    setShow(true);
    document.body.style.overflow = "hidden";
    SeacrchDiv.style.display = "flex";
    if (input) {
      input.focus();
    }
    sessionStorage.setItem("Search", "true");
  }

  function handleChangedInput() {
    const value = (document.getElementById("inputToUse") as HTMLInputElement)
      .value;
    setInputValue((val: string) => (val = value));
    sessionStorage.setItem("searchValue", value);
  }

  function handleSearch() {
    if (inputValue.trim() !== "") {
      const option = sessionStorage.getItem("selectedOption");
      const range = JSON.parse(sessionStorage.getItem("priceRange") as string);

      filteredProducts.current = products.filter((product) => {
        const productNameLower = product.name.toLowerCase();
        return productNameLower.includes(inputValue.toLowerCase());
      });

      if (option && option !== "default") {
        if (option === "alphabetical") {
          // Sort products alphabetically by name
          filteredProducts.current = filteredProducts.current.sort(
            (a: any, b: any) => a.name.localeCompare(b.name)
          );
        } else if (option === "ascending") {
          // Sort products by price in ascending order
          filteredProducts.current = filteredProducts.current.sort(
            (a: any, b: any) => a.price - b.price
          );
        } else if (option === "descending") {
          // Sort products by price in descending order
          filteredProducts.current = filteredProducts.current.sort(
            (a: any, b: any) => b.price - a.price
          );
        }
      }

      // Filter products by price range (if range is set)
      if (range.length === 2) {
        filteredProducts.current = filteredProducts.current.filter(
          (product: any) =>
            product.price >= range[0] && product.price <= range[1]
        );
      }
      const { startIndex, endIndex } = calculateProductRange();
      const productsToDisplay = filteredProducts.current.slice(
        startIndex,
        endIndex
      );

      setSearched(productsToDisplay);
      sessionStorage.setItem(
        "searchedResult",
        JSON.stringify(filteredProducts.current)
      );

      if (filteredProducts.current.length < 1) {
        const noResult = document.querySelector(".noResult") as HTMLDivElement;
        lastValue.current = inputValue;
        noResult.style.display = "flex";
      } else {
        const noResult = document.querySelector(".noResult") as HTMLDivElement;

        noResult.style.display = "none";
      }
    } else {
      return;
    }
  }

  function showfilter() {
    const filterSec = document.querySelector(".filterSec") as HTMLDivElement;
    filterSec.style.display = "flex";
  }

  const nextPage = () => {
    if (
      currentPage < Math.ceil(filteredProducts.current.length / productsPerPage)
    ) {
      setCurrentPage((p) => (p = p + 1));
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((p) => (p = p - 1));
    }
  };

  return (
    <PagesLayout>
      <div className="products">
        <input
          type="text"
          name="search"
          placeholder="Search for product by product's name"
          className="searchBar"
          onFocus={handleSearchFocus}
        />

        <div className={`productSearch${show ? " visible" : ""}`}>
          <Image
            src="/images/icon-close-menu.svg"
            alt="icon-close-menu"
            width={25}
            height={25}
            className="icon-close-search"
            onClick={showSearch}
          />

          <div className="Search_Filter">
            <input
              type="text"
              name="search"
              placeholder="Search for product by product's name"
              className="searchBar"
              id="inputToUse"
              onInput={handleChangedInput}
            />

            <Image
              src="/images/filter.png"
              alt="filter"
              width={30}
              height={30}
              className="filter"
              onClick={showfilter}
            />
          </div>

          <button className="searchBtn" onClick={handleSearch}>
            <Image
              src="/images/search.png"
              alt="search"
              width={25}
              height={25}
              className="icon-search"
            />
          </button>

          <div className="SearchResult">
            {searched.length > 0
              ? searched.map((product: any) => (
                  <Product
                    key={product.id}
                    id={product.id}
                    imgUrl={product.imgUrl}
                    name={product.name}
                    price={product.price}
                    description={product.description}
                    rating={product.rating}
                  />
                ))
              : ""}

            {filteredProducts.current.length > 4 ? (
              <div className="PaginationControls">
                <button onClick={prevPage} disabled={currentPage === 1}>
                  Previous
                </button>
                <button
                  onClick={nextPage}
                  disabled={
                    currentPage ===
                    Math.ceil(filteredProducts.current.length / productsPerPage)
                  }
                >
                  Next
                </button>
              </div>
            ) : (
              ""
            )}

            <div className="noResult">
              <p>
                {" "}
                Product with the name containing &quot;
                <span>{lastValue.current}</span>&quot; is not found.{" "}
              </p>
              <Image
                src={"/images/no-results.png"}
                alt="no-result icon"
                width={64}
                height={64}
                className="noResultImage"
              />
            </div>
          </div>
        </div>

        <Filter clicked={handleSearch} />

        <div className="categories">
          <button>SmartWatch</button>
          <button>SmartPhones</button>
          <button>Laptops</button>
          <button>Accessories</button>
        </div>

        <section className="BestSales">
          <h2 className="section-title">Best Sales of the Week</h2>
          <div className="eachBest">
            <Product
              name="Good Product fhkfkf fkjhkfjf ffkkfj fkfjkfj f,jfkj hfkfkj fmhfhfhfh fjhfjhfj"
              description="string string string string string string string v string string string string string string  string string string string string"
              fakePrice={322}
              id="a"
              imgUrl="/images/cart.png"
              price={200}
              rating={3.5}
            />

            <Product
              name="Good Product"
              description="string"
              fakePrice={322}
              id="b"
              imgUrl="/images/cart.png"
              price={200}
              rating={3.5}
            />

            <Product
              name="Good Product"
              description="string"
              fakePrice={322}
              id="c"
              imgUrl="/images/cart.png"
              price={200}
              rating={3.5}
            />

            <Product
              name="Good Product"
              description="string"
              fakePrice={322}
              id="d"
              imgUrl="/images/cart.png"
              price={200}
              rating={3.5}
            />

            <Product
              name="Good Product"
              description="string"
              fakePrice={322}
              id="e"
              imgUrl="/images/cart.png"
              price={200}
              rating={3.5}
            />
          </div>
        </section>

        <section className="latestP">
          <h2 className="section-title">Latest Products</h2>
          <div className="eachBest">
            <Product
              name="Good Product"
              description="string"
              fakePrice={322}
              id="f"
              imgUrl="/images/cart.png"
              price={200}
              rating={3.5}
            />

            <Product
              name="Good Product"
              description="string"
              fakePrice={322}
              id="g"
              imgUrl="/images/cart.png"
              price={200}
              rating={3.5}
            />

            <Product
              name="Good Product"
              description="string"
              fakePrice={322}
              id="h"
              imgUrl="/images/cart.png"
              price={200}
              rating={3.5}
            />

            <Product
              name="Good Product"
              description="string"
              fakePrice={322}
              id="i"
              imgUrl="/images/cart.png"
              price={200}
              rating={3.5}
            />

            <Product
              name="Good Product"
              description="string"
              fakePrice={322}
              id="j"
              imgUrl="/images/cart.png"
              price={200}
              rating={3.5}
            />
          </div>
        </section>
      </div>
      <div className="overlay"></div>
    </PagesLayout>
  );
}
