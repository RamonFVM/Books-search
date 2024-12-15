'use client';

import { useState } from "react";


export function Home() {

    const [movie,setmovie]=useState<string>('')


  return (
    <div className="bg-black min-h-screen flex flex-col">
      <header className="bg-slate-800 font-sans flex justify-center items-center text-white p-6 text-4xl">
        Books Search
      </header>

      <div className="flex flex-col justify-center items-center flex-grow">

        <div className="bg-slate-800 w-2/4 h-72 rounded-2xl flex flex-col justify-center items-center p-6">
          <h2 className="text-white text-3xl mb-4">Procure seu livro aqui</h2>
          <input
            type="text"
            className="p-5 m-4 rounded-2xl w-2/3 focus:outline-none font-semibold"


            placeholder="Digite o nome do livro"
          />
          
          <button className="m-6 w-1/4 h-12 rounded-2xl   font-semibold bg-white transition-all duration-500 ease-in-out  hover:scale-110 hover:bg-teal-400 hover:text-white" type="submit">
            Pesquisar
          </button>

        </div>
      </div>
    </div>
  );
}





