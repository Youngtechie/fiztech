import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import PagesLayout from "../layout";
import Image from "next/image";
import Filter from "@/composables/filter";
import Product from "@/composables/Product";
import products from "@/products.json";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

interface CategoryProps {
  query: {
    category: string;
  };
}

export default function Category({
  query,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
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

  const loadIntialProducts = () => {
    const option = sessionStorage.getItem("selectedOption");
    const range = JSON.parse(sessionStorage.getItem("priceRange") as string);

    filteredProducts.current = products.filter((product) => {
      return product.category.toUpperCase() === query.category.toUpperCase();
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
        (product: any) => product.price >= range[0] && product.price <= range[1]
      );
    }
    const { startIndex, endIndex } = calculateProductRange();
    const productsToDisplay = filteredProducts.current.slice(
      startIndex,
      endIndex
    );

    setSearched(productsToDisplay);
  };

  useEffect(() => {
    const noResult = document.querySelector(".noResult") as HTMLDivElement;
    noResult.style.display = "none";

    loadIntialProducts()

    const handleRouteChange = () => {
      setSearched([]);
      if(document.getElementById("inputToUse")){
        (document.getElementById("inputToUse") as HTMLInputElement).value = "";
      }
      sessionStorage.removeItem("categorySValue");
      sessionStorage.removeItem("searchedResult");
      router.reload()
    };

    // Add the event listener
    router.events.on("routeChangeComplete", handleRouteChange);

    // Clean up the event listener on component unmount
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  useEffect(() => {
    if (inputValue !== "") {
      sessionStorage.setItem("categorySValue", inputValue);
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

  function handleChangedInput() {
    const value = (document.getElementById("inputToUse") as HTMLInputElement)
      .value;
    setInputValue((val: string) => (val = value));
    sessionStorage.setItem("categorySValue", value);
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

  function handleSearch() {
    if (inputValue !== "" || searched.length > 0) {
      const option = sessionStorage.getItem("selectedOption");
      const range = JSON.parse(sessionStorage.getItem("priceRange") as string);

      let categoryProducts = products.filter((product) => {
        return (
          product.category.toUpperCase() ===
          router.query.category?.toString().toUpperCase()
        );
      });

      filteredProducts.current = categoryProducts.filter((product: any) => {
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

  return (
    <PagesLayout>
      <section className="maincategory">
        <h1>{query.category?.toUpperCase()}</h1>
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

        <Filter clicked={handleSearch} />

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
      </section>
      <div className="overlay"></div>
    </PagesLayout>
  );
}

export const getServerSideProps: GetServerSideProps<CategoryProps> = async (
  context
) => {
  const { query } = context;
  const category = query.category; // Access the category query parameter

  // Check if category is an array or undefined
  const categoryValue = Array.isArray(category) ? category[0] : category || "";

  return {
    props: {
      query: { category: categoryValue },
    },
  };
};
