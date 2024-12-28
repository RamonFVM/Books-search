'use client';
import { GOOGLE_API_URL } from "@/url";
import axios from "axios";
import { useState } from "react";

export function Home() {
  const [book, setbook] = useState<string>('');
  const [bookdate, setbookdate] = useState<any>({ items: [] });

  const HandleinputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setbook(e.target.value.toLowerCase());
  };

  const fetchBookDate = async () => {
    if (book) {
      try {
        const response = await axios.get(`${GOOGLE_API_URL}/books/v1/volumes?q=${book}`);
        setbookdate(response.data || { items: [] });
      } catch (error) {
        console.error('Erro ao buscar o livro', error);
      }
    }
  };

  return (
    <div className="bg-[#0c0c0c] min-h-screen flex flex-col">
      <header className="bg-slate-800 font-sans flex justify-center items-center text-white p-6 text-4xl">
        Books Search
      </header>

      <div className="flex flex-col justify-center items-center flex-grow p-4">
        <div className="bg-slate-800 w-full md:w-2/4 h-72 rounded-2xl flex flex-col justify-center items-center p-6 mb-6">
          <h2 className="text-white text-3xl mb-4">Procure seu livro aqui</h2>
          <input
            type="text"
            className="p-5 m-4 rounded-2xl w-2/3 focus:outline-none font-semibold border "
            placeholder="Digite o nome do livro"
            value={book}
            onChange={HandleinputChange}
          />
          <button
            className={`m-6 w-1/4 h-12 rounded-2xl font-semibold bg-white ${!book ? 'opacity-50 cursor-not-allowed' : 'transition-all duration-500 ease-in-out hover:scale-110 hover:bg-purple-500 hover:text-white'}`}
            type="submit"
            onClick={fetchBookDate}
            disabled={!book}
          >
            Pesquisar
          </button>
        </div>

        {bookdate.items && bookdate.items.length > 0 && (
          <div className="flex justify-center items-center bg-[#484d50] w-full rounded-2xl md:w-2/4 ">
            <div className="flex flex-col items-center p-4">
              {bookdate.items.map((bookItem: any, index: number) => (
                <div key={index} className="bg-slate-700 text-white p-4 mb-4 w-full rounded-xl hover: border-2 hover:border-purple-600 transition-all duration-500 ease-in-out hover:scale-110">

                  {bookItem.volumeInfo.imageLinks && bookItem.volumeInfo.imageLinks.thumbnail ? (
                    <img
                      src={bookItem.volumeInfo.imageLinks.thumbnail}
                      alt={bookItem.volumeInfo.title}
                      className="w-32 h-48 mb-4"
                    />
                  ) : (
                    <div className="w-32 h-48 mb-4 bg-gray-300 flex items-center justify-center text-center">
                      Sem imagem
                    </div>
                  )}

                  <h3 className="text-3xl">{bookItem.volumeInfo.title}</h3>
                  <p className="text-lg text-blue-500">Autor: {bookItem.volumeInfo.authors}</p>
                  <p className="text-lg">Sinopse: {bookItem.volumeInfo.description}</p>
                  <p className="text-sm">Publicado em: {bookItem.volumeInfo.publishedDate}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}