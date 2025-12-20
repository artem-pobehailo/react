import css from "./App.module.css";

import { useState } from "react";

import "./App.css";
import Product from "./Product";
import Mailbox from "./Mailbox";
import Books from "./Book";
import Alert from "./Alert";
import Button from "./Button";
import Forms from "./Form/Form";
import OrderForm from "./OrderForm/OrderForm";
import axios from "axios";
import Swapi from "./Swapi/Swapi";
import Modal from "./Modal/Modal";
import LocalStorafe from "./LocalStorage/LocalStorage";
import fetchPerson, {
  fetchArticles,
  fetchCharacter,
} from "../services/service";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import SearchForm from "./SearchForm/SearchForm";
import ReactPaginate from "react-paginate";
import ArticleList from "./ArticleList";

interface Article {
  objectID: string;
  title: string;
  url: string;
}
interface ArtticleHttpResponse {
  hits: Article[];
}

export default function App() {
  const [count, setCount] = useState(1);

  const [articles, setArticles] = useState<Article[]>([]);

  const techName = "React";
  const imgUrl =
    "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=640";

  const handleClick = () => {
    alert("click");
  };

  const handleCount = () => {
    setCount(count + 1);
  };
  const handleOrder = async (value: string) => {
    const res = await axios.get<ArtticleHttpResponse>(
      `https://hn.algolia.com/api/v1/search?query=${value}`
    );
    setArticles(res.data.hits);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["person", count],
    queryFn: () => fetchPerson(count),
  });

  const [characterId, setCharacterId] = useState("");

  const {
    data: characterData,
    error: characterError,
    isLoading: isCharacterLoading,
    isError: isCharacterError,
  } = useQuery({
    queryKey: ["character", characterId],
    queryFn: () => fetchCharacter(characterId),
    enabled: characterId !== "",
  });

  const handleSearch = (formData: FormData) => {
    const id = formData.get("id") as string;
    setCharacterId(id);
  };

  const [topic, setTopic] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  // Щоб між запитами не було "блимань" екрану, додаємо
  //  властивість placeholderData, яка дозволяє на
  //  час завантаження нових даних показувати попередні
  //  або тимчасові дані. Також використовуємо
  // keepPreviousData (імпорт з React Query)
  //  для збереження попереднього запиту,
  // поки не прийдуть нові дані:

  const {
    data: dataHandleSearchForm,
    isLoading: isLoadingHandleSearchForm,
    isError: isErrorHandleSearchForm,
    isSuccess: isSuccessHandleSearchForm,
  } = useQuery({
    queryKey: ["articles", topic, currentPage],
    queryFn: () => fetchArticles(topic, currentPage),
    enabled: topic !== "",
    placeholderData: keepPreviousData,
  });
  const totalPages = dataHandleSearchForm?.nbPages ?? 0;

  const handleSearchForm = async (newTopic: string) => {
    setTopic(newTopic);
    setCurrentPage(1);
  };
  return (
    <>
      {techName}
      <button onClick={handleCount}>count is {count}</button>

      <img src={imgUrl} alt="Man, field and a mountain" width="640" />
      <div>
        <h1>Products</h1>
        <Product
          name="dfsfsddf"
          imgUrl="https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?w=640"
          price={10.99}
        />
        <Product
          name="fadfgsdgsd"
          imgUrl="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?w=640"
          price={14.29}
        />
      </div>

      <div>
        <Mailbox username="fadfgsdgsd" messages="" />
      </div>

      <div>
        <Books />
      </div>

      <>
        <Alert />
        <Alert type="error" />
        <Alert type="success" />
      </>

      <>
        <Button onClick={handleClick} variant="primary" text="Login" />
        <Button variant="secondary" text="Follow" />
        <Button
          onClick={() => {
            alert("click");
          }}
          text="dddd"
        />
      </>
      <>
        <Forms />
      </>

      <>
        <OrderForm onSubmit={handleOrder} />
        {articles.length > 0 && (
          <ul>
            {articles.map(({ objectID, url, title }) => (
              <li key={objectID}>
                <a href={url} target="_blank">
                  {title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </>
      <>
        <Swapi />
      </>

      <div>
        <h1>Main content of the page</h1>
        <button onClick={openModal}>Open modal</button>
        {isModalOpen && (
          <Modal onClose={closeModal}>
            <h2>Custom Modal Content</h2>
            <p>This is a reusable modal with dynamic content.</p>
          </Modal>
        )}
      </div>

      <LocalStorafe />

      <>
        <button onClick={handleCount}>Get next character</button>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error: {error?.message}</p>}
        {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      </>

      <>
        <form action={handleSearch}>
          <input type="text" name="id" placeholder="Enter character ID" />
          <button type="submit">Search</button>
        </form>
        {isCharacterLoading && <p>Loading data, please wait...</p>}
        {isCharacterError && (
          <p>Whoops, something went wrong! {characterError?.message}</p>
        )}
        {characterData && <pre>{JSON.stringify(characterData, null, 2)}</pre>}
      </>

      <>
        <SearchForm onSubmit={handleSearchForm} />
        {isSuccessHandleSearchForm && totalPages > 1 && (
          <ReactPaginate
            pageCount={totalPages}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            onPageChange={({ selected }) => setCurrentPage(selected + 1)}
            forcePage={currentPage - 1}
            containerClassName={css.pagination}
            activeClassName={css.active}
            nextLabel="→"
            previousLabel="←"
          />
        )}
        {isLoadingHandleSearchForm && <p>Loading data, please wait...</p>}
        {isErrorHandleSearchForm && (
          <p>Whoops, something went wrong! Please try again!</p>
        )}
        {dataHandleSearchForm && dataHandleSearchForm.hits.length > 0 && (
          <ArticleList items={dataHandleSearchForm.hits} />
        )}
      </>
    </>
  );
}
