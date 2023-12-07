'use client';

import ClientTable from "@/_core/components/tables/client/client-table";

export default function Clientes(): JSX.Element {
  const newLocal = "bg-white h-screen w-full";
	return (
    <div className={newLocal}>
    <p className="text-black"><ClientTable /></p>
  </div>
	);
}